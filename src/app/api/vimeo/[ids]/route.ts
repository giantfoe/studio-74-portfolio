import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { ids: string } }
) {
  const idsParam = (await params).ids;
  if (!idsParam) {
    return NextResponse.json({ videos: [], count: 0 });
  }

  const ids = idsParam.split(',').map(id => id.trim()).filter(Boolean);
  
  try {
    const videos: { videoId: string; title: string; thumbnail: string; published: string }[] = [];

    // Fetch oEmbed data for each Vimeo ID in parallel
    const fetches = ids.map(async (videoId) => {
      try {
        const response = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
          },
          cache: 'no-store'
        });
        
        if (response.ok) {
          const data = await response.json();
          // Vimeo oEmbed fields: title, thumbnail_url, upload_date
          return {
            videoId,
            title: data.title || 'Untitled',
            thumbnail: data.thumbnail_url || `https://vumbnail.com/${videoId}.jpg`,
            published: data.upload_date || ''
          };
        }
      } catch (err) {
        console.error(`Failed to fetch Vimeo metadata for ${videoId}:`, err);
      }
      return null;
    });

    const results = await Promise.all(fetches);
    
    for (const res of results) {
      if (res) videos.push(res);
    }

    return NextResponse.json({ videos, count: videos.length });
  } catch (error) {
    console.error('Vimeo fetch error:', error);
    return NextResponse.json({ videos: [], error: String(error) }, { status: 500 });
  }
}
