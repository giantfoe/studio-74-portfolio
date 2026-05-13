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

export const SITE_URL = 'https://studio74.one';

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
  {
    slug: 'half-full-half-empty-same-glass-different-production',
    volume: 'Issue 002',
    title: 'Half Full. Half Empty. Same Glass. Different Production.',
    excerpt:
      "In filmmaking, people often judge the final frame without understanding what it took to create it. Because in production, output is rarely accidental.",
    date: '2026-05-13',
    author: 'Caleb',
    readTime: '3 min read',
    sections: [
      {
        type: 'paragraph',
        content:
          "In filmmaking, people often judge the final frame without understanding what it took to create it.",
      },
      {
        type: 'paragraph',
        content:
          "A client sends a reference.\nA beautiful commercial.\nClean lighting. Smooth movement. Perfect color. Strong performances.",
      },
      {
        type: 'paragraph',
        content: 'Then comes the question:',
      },
      {
        type: 'quote',
        content: '\u201cCan we do this?\u201d',
      },
      {
        type: 'paragraph',
        content: 'The answer is almost always:',
      },
      {
        type: 'quote',
        content: '\u201cYes. But under what conditions?\u201d',
      },
      {
        type: 'paragraph',
        content:
          "Because in production, output is rarely accidental.\nEvery result is connected to the conditions that produced it.",
      },
      {
        type: 'heading',
        content: 'The Equation Behind Every Frame',
      },
      {
        type: 'paragraph',
        content:
          'The quality of a film is not just a function of creativity. It is also a function of:',
      },
      {
        type: 'list',
        content: '',
        items: [
          'Time',
          'Budget',
          'Crew',
          'Equipment',
          'Planning',
          'Communication',
          'Energy',
          'Environment',
        ],
      },
      {
        type: 'paragraph',
        content:
          "Two productions can aim for the same result and still arrive at completely different outcomes\u2014because the factors behind them were never the same.",
      },
      {
        type: 'paragraph',
        content: "That\u2019s the part most people don\u2019t see.",
      },
      {
        type: 'heading',
        content: 'References Are Not Guarantees',
      },
      {
        type: 'paragraph',
        content: 'In film, references are often treated like guarantees:',
      },
      {
        type: 'quote',
        content: '\u201cWe want something like this.\u201d',
      },
      {
        type: 'paragraph',
        content:
          'But references are not just visual targets.\nThey are evidence of process.',
      },
      {
        type: 'paragraph',
        content: 'Behind every polished frame is structure:',
      },
      {
        type: 'list',
        content: '',
        items: [
          'Multiple lighting setups',
          'Experienced crew',
          'Production design',
          'Time for revisions',
          'Reliable power',
          'Controlled environments',
          'Pre-production planning',
        ],
      },
      {
        type: 'paragraph',
        content: 'The final image is only the visible part of the work.',
      },
      {
        type: 'heading',
        content: 'The Glass',
      },
      {
        type: 'paragraph',
        content:
          "So when expectations are high but the conditions are reduced, tension is created. The glass becomes \u201chalf empty\u201d\u2014not because the vision was impossible, but because the process required to achieve it was incomplete.",
      },
      {
        type: 'paragraph',
        content: 'And sometimes, the opposite happens.',
      },
      {
        type: 'paragraph',
        content:
          "A limited production with the right planning, the right people, and the right understanding can still create something meaningful. The glass becomes \u201chalf full.\u201d",
      },
      {
        type: 'paragraph',
        content: 'Same industry. Same cameras. Different conditions.',
      },
      {
        type: 'heading',
        content: 'The Truth in Every Frame',
      },
      {
        type: 'paragraph',
        content:
          'In filmmaking, the outcome is rarely disconnected from the process.',
      },
      {
        type: 'paragraph',
        content: 'Every frame carries the truth of how it was made.',
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
