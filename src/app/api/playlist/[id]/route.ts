import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const playlistId = (await params).id;

  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;

    // Use curl which handles HTTP/2 properly
    let xml: string;
    try {
      xml = execSync(
        `curl -sL -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" "${feedUrl}"`,
        { encoding: 'utf-8', timeout: 15000 }
      );
    } catch (curlError) {
      console.error('curl failed:', curlError);
      return NextResponse.json({ videos: [], error: 'curl failed' }, { status: 502 });
    }

    // Validate we got XML
    if (!xml || !xml.includes('<feed')) {
      console.error('Invalid response, first 200 chars:', xml?.substring(0, 200));
      return NextResponse.json({ videos: [], error: 'Invalid feed response' }, { status: 502 });
    }

    const videos: { videoId: string; title: string; thumbnail: string; published: string }[] = [];

    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let entryMatch;

    while ((entryMatch = entryRegex.exec(xml)) !== null) {
      const entry = entryMatch[1];

      const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const mediaTitleMatch = entry.match(/<media:title>([^<]+)<\/media:title>/);
      const titleMatch = mediaTitleMatch || entry.match(/<title>([^<]+)<\/title>/);
      const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
      const thumbMatch = entry.match(/<media:thumbnail\s+url="([^"]+)"/);

      if (videoIdMatch) {
        const vid = videoIdMatch[1];
        videos.push({
          videoId: vid,
          title: titleMatch ? decodeHTMLEntities(titleMatch[1]) : 'Untitled',
          thumbnail: thumbMatch ? thumbMatch[1] : `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
          published: publishedMatch ? publishedMatch[1] : '',
        });
      }
    }

    return NextResponse.json({ videos, count: videos.length });
  } catch (error) {
    console.error('Playlist fetch error:', error);
    return NextResponse.json({ videos: [], error: String(error) }, { status: 500 });
  }
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
