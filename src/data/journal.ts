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
  {
    slug: 'the-client-doesnt-inherit-your-problems',
    volume: 'Issue 003',
    title: "The Client Doesn't Inherit Your Problems.",
    excerpt:
      "One of the biggest lessons we've learned is that good production isn't just about creativity. It's about risk management.",
    date: '2026-06-05',
    author: 'Caleb',
    readTime: '2 min read',
    sections: [
      {
        type: 'paragraph',
        content:
          "There is a saying in production:\n\n\"The show must go on.\"\n\nSimple. Brutal. True.",
      },
      {
        type: 'paragraph',
        content:
          "A few weeks ago, we were working on a production that involved multiple vendors, moving parts, and a custom set design. Part of that set required materials we had sourced from Nigeria.",
      },
      {
        type: 'paragraph',
        content:
          "Everything was planned.\n\nEverything was ordered.\n\nEverything was expected to arrive before production.",
      },
      {
        type: 'paragraph',
        content: "It didn't.",
      },
      {
        type: 'paragraph',
        content:
          "The shipment was delayed. By the time it arrived, production had already been completed. To make matters worse, some of the items arrived damaged and unusable.",
      },
      {
        type: 'paragraph',
        content:
          "On paper, we had every reason to explain why things didn't go according to plan.\n\nBut there was one problem with that.",
      },
      {
        type: 'paragraph',
        content:
          "The client didn't hire us to explain problems.\n\nThey hired us to deliver.",
      },
      {
        type: 'paragraph',
        content: "So we did.",
      },
      {
        type: 'paragraph',
        content:
          "The production was completed. The deliverables were handed over. The project moved forward.",
      },
      {
        type: 'paragraph',
        content:
          "Behind the scenes, however, the story was different.\n\nWe absorbed losses of nearly LE 20,000. Some vendors failed to meet expectations. Certain plans had to be abandoned and replaced in real time. Decisions had to be made quickly, often with incomplete information.",
      },
      {
        type: 'paragraph',
        content:
          "None of that changed the outcome the client was expecting.\n\nAnd that's the point.",
      },
      {
        type: 'paragraph',
        content:
          "One of the biggest lessons we've learned is that good production isn't just about creativity. It's about risk management.",
      },
      {
        type: 'paragraph',
        content:
          "Every production carries uncertainty.\n\nEquipment can fail.\n\nShipments can be delayed.\n\nWeather can change.\n\nVendors can disappoint.\n\nPeople can make mistakes.",
      },
      {
        type: 'paragraph',
        content:
          "The question isn't whether things will go wrong.\n\nThe question is:\n\n\"What happens when they do?\"",
      },
      {
        type: 'paragraph',
        content:
          "The strongest productions are not the ones where everything goes according to plan. They are the ones where the team has considered the risks, prepared for the possibilities, and found a way to deliver regardless.",
      },
      {
        type: 'paragraph',
        content:
          "Because while the client should understand the challenges of production, they should never have to carry the burden of them.",
      },
      {
        type: 'paragraph',
        content:
          "Those challenges belong to us.\n\nThat's the responsibility that comes with the work.",
      },
      {
        type: 'paragraph',
        content:
          "At the end of the day, the audience only sees the final frame.\n\nThe client only sees the final delivery.\n\nAnd in our industry, that's exactly how it should be.",
      },
      {
        type: 'paragraph',
        content: "No excuses.\n\nJust delivery.",
      },
      {
        type: 'quote',
        content:
          "Professionalism isn't measured by how things go when everything works. It's measured by what happens when everything doesn't.",
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
