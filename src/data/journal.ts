export interface JournalArticle {
  slug: string;
  volume: string;
  title: string;
  excerpt: string;
  date: string; // ISO date string
  author: string;
  readTime: string;
  sections: ArticleSection[];
}

export interface ArticleSection {
  type: 'paragraph' | 'heading' | 'quote' | 'list';
  content: string;
  items?: string[]; // for list type
}

export const SITE_URL = 'https://studio74.film';

export const journalArticles: JournalArticle[] = [
  {
    slug: 'the-truth-about-a-simple-shoot',
    volume: 'Issue 001',
    title: 'The Truth About a \u201cSimple Shoot\u201d',
    excerpt:
      "There\u2019s a moment on almost every shoot where you realize things are not going exactly as planned. And in that moment, the real work begins.",
    date: '2026-04-28',
    author: 'Caleb',
    readTime: '4 min read',
    sections: [
      {
        type: 'paragraph',
        content:
          "There\u2019s a moment on almost every shoot where you realize things are not going exactly as planned.",
      },
      {
        type: 'paragraph',
        content: "It\u2019s not obvious. Most people wouldn\u2019t notice it.",
      },
      {
        type: 'paragraph',
        content: 'But internally, everything is shifting.',
      },
      {
        type: 'paragraph',
        content:
          "The light changes faster than expected.\nThe environment becomes harder to control.\nThe person on camera needs more guidance than anticipated.",
      },
      {
        type: 'paragraph',
        content: 'And in that moment, the real work really begins.',
      },
      {
        type: 'heading',
        content: 'From the Outside',
      },
      {
        type: 'paragraph',
        content:
          'From the outside, video production looks straightforward. A camera. Lighting. Clean visuals.',
      },
      {
        type: 'paragraph',
        content:
          "But what people don\u2019t often see is that the real work is not just in shooting. It\u2019s in thinking clearly under pressure.",
      },
      {
        type: 'paragraph',
        content:
          'Recently, I worked on a project that seemed simple on paper. A few interviews. Supporting visuals. A clear structure.',
      },
      {
        type: 'paragraph',
        content:
          'But once we arrived on location, it required a different approach. We had to adjust positioning, rethink how the shoot would flow, and guide the conversation in a way that still felt natural and honest.',
      },
      {
        type: 'paragraph',
        content:
          'No extra time. No perfect conditions. Just decisions that had to be made in the moment.',
      },
      {
        type: 'quote',
        content:
          "Good production is not about having complete control. It\u2019s about being able to adapt.",
      },
      {
        type: 'paragraph',
        content:
          'Anyone can produce good work when everything is set. But real experience shows when things are not.',
      },
      {
        type: 'heading',
        content: 'What is Often Overlooked',
      },
      {
        type: 'paragraph',
        content: 'Even a \u201csimple shoot\u201d requires:',
      },
      {
        type: 'list',
        content: '',
        items: [
          'Careful preparation',
          'An understanding of people on camera',
          'Control of light, even in natural settings',
          'Clean and consistent audio',
          'Direction that brings out authenticity',
        ],
      },
      {
        type: 'paragraph',
        content:
          "Without these, a video may look fine\u2014but it will not feel right. And if it doesn\u2019t feel right, it won\u2019t connect.",
      },
      {
        type: 'heading',
        content: 'A Better Way to Think About It',
      },
      {
        type: 'paragraph',
        content: 'Most people ask: \u201cCan this be done?\u201d',
      },
      {
        type: 'paragraph',
        content:
          'A better question is: \u201cWhat should this make people feel?\u201d',
      },
      {
        type: 'paragraph',
        content:
          "Because people remember how something made them feel long after they\u2019ve forgotten the details.",
      },
      {
        type: 'heading',
        content: 'Growth',
      },
      {
        type: 'paragraph',
        content: 'With each project, a few things become clearer:',
      },
      {
        type: 'paragraph',
        content:
          'Preparation is important.\nBut flexibility is essential.',
      },
      {
        type: 'paragraph',
        content:
          'Equipment matters.\nBut awareness matters more.',
      },
      {
        type: 'paragraph',
        content:
          'And above all\u2014the truth always comes through on camera.',
      },
      {
        type: 'paragraph',
        content:
          "If you\u2019re working on something and you want it handled with intention, not just execution, I\u2019m always open to a conversation.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}

export function getArticleUrl(slug: string): string {
  return `${SITE_URL}/journal/${slug}`;
}
