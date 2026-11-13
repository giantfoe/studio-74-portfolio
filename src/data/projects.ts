type Project = {
  id: number;
  slug: string;
  title: string;
  heading: string;
  category: string;
  format: 'asymmetrical-large' | 'stacked' | 'asymmetrical-small';
  thumbnail: string;
  description: string;
  detail: string;
  playlistId?: string;
  featured?: {
    title: string;
    publisher: string;
    description: string;
    url: string;
    embedUrl?: string;
  };
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'documentaries',
    title: 'Documentaries',
    heading: 'Documentary filmmaking in Sierra Leone',
    category: 'Nonfiction',
    format: 'asymmetrical-large',
    thumbnail: 'https://i.ytimg.com/vi/dyHZ3Cter8Y/maxresdefault.jpg',
    description: 'Explore documentary work from Freetown and across Sierra Leone on public services, city life, and the country’s music scene.',
    detail: 'This selection brings together films published by UNOPS, DW News, and Al Jazeera English.',
    playlistId: 'PLpC8RXjP3Pddq9uX3owfxKqjxGVWrzk0V',
    featured: {
      title: 'Sierra Leone: How Freetown’s mayor has transformed her city',
      publisher: 'DW News',
      description: 'DW News profiles Freetown’s mayor and her work in Sierra Leone’s capital.',
      url: 'https://www.youtube.com/watch?v=dyHZ3Cter8Y',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dyHZ3Cter8Y',
    },
  },
  {
    id: 2,
    slug: 'music-videos',
    title: 'Music Videos',
    heading: 'Music video production in Sierra Leone',
    category: 'Music',
    format: 'stacked',
    thumbnail: 'https://i.ytimg.com/vi/RsIH-Ps2uKk/maxresdefault.jpg',
    description: 'Explore Studio 74’s music video selection, from Nyxx Randall’s “High” to work by Ray Boy Blu and Judah Zubairu.',
    detail: 'Get in touch with Studio 74 in Freetown to discuss the visual direction and production of your next release.',
    playlistId: 'PLpC8RXjP3Pdc27WxnZlCxueWei9H_uGn3',
    featured: {
      title: 'High',
      publisher: 'Nyxx Randall',
      description: 'Watch the official music video for “High” on the artist’s YouTube channel.',
      url: 'https://www.youtube.com/watch?v=RsIH-Ps2uKk',
      embedUrl: 'https://www.youtube-nocookie.com/embed/RsIH-Ps2uKk',
    },
  },
  {
    id: 3,
    slug: 'podcasts',
    title: 'Podcasts',
    heading: 'Podcast production in Freetown',
    category: 'Series',
    format: 'asymmetrical-small',
    thumbnail: 'https://i.ytimg.com/vi/U4FnEk0TrAM/maxresdefault.jpg',
    description: 'Watch Years Apart, a video podcast from Sierra Leone that brings guests from different generations together for a conversation.',
    detail: 'The first episode features Boii and Solos Beat discussing Sierra Leonean music from two generations of artists.',
    featured: {
      title: 'Years Apart, episode 1: Music',
      publisher: 'Channel232',
      description: 'Boii and Solos Beat share their perspectives on music in Sierra Leone.',
      url: 'https://www.youtube.com/watch?v=U4FnEk0TrAM',
      embedUrl: 'https://www.youtube-nocookie.com/embed/U4FnEk0TrAM',
    },
  },
  {
    id: 4,
    slug: 'live-recordings',
    title: 'Live Recordings',
    heading: 'Live performance filming in Sierra Leone',
    category: 'Multicam',
    format: 'asymmetrical-large',
    thumbnail: 'https://i.ytimg.com/vi/zHJW8ymonno/maxresdefault.jpg',
    description: 'Watch live music recordings by Sierra Leonean artists and ask Studio 74 about multi-camera filming for an upcoming performance.',
    detail: 'The collection includes “911,” “I Can See,” and “God Nɔ De Lie” from Judah Zubairu’s live performances.',
    playlistId: 'PLpC8RXjP3Pdf8AM5e0OpNwTLA256py6S1',
    featured: {
      title: '911',
      publisher: 'Judah Zubairu',
      description: 'Watch Judah Zubairu perform “911,” published on his official channel.',
      url: 'https://www.youtube.com/watch?v=zHJW8ymonno',
      embedUrl: 'https://www.youtube-nocookie.com/embed/zHJW8ymonno',
    },
  },
  {
    id: 5,
    slug: 'tv-commercials',
    title: 'TV Commercials',
    heading: 'TV commercial production in Freetown',
    category: 'Broadcast',
    format: 'stacked',
    thumbnail: 'https://vumbnail.com/1139312850.jpg',
    description: 'Studio 74 produces TV commercials and brand films in Freetown, Sierra Leone, for brands and agencies.',
    detail: 'Share your campaign brief, intended channels, and launch date to discuss the shoot and the edits you need. Contact the studio to request relevant work samples.',
  },
  {
    id: 6,
    slug: 'films',
    title: 'Films',
    heading: 'Film production in Sierra Leone',
    category: 'Film',
    format: 'asymmetrical-small',
    thumbnail: 'https://i.vimeocdn.com/video/1729776368-ec047faef71ec0455cef4dbab680b768ef360e3451625ebf6ff1d88ae3e34d09-d_1280x720?region=us',
    description: 'Explore film work from Sierra Leone, including “Peace Will Not Fall from the Sky,” about the work of Joseph Kaifala.',
    detail: 'The film follows Joseph Kaifala and the Center for Memory and Reparations as they confront the roots of conflict and work toward lasting peace.',
    featured: {
      title: 'Peace Will Not Fall from the Sky',
      publisher: 'McKay',
      description: 'View the film on McKay’s Vimeo page.',
      url: 'https://vimeo.com/868560138',
    },
  },
  {
    id: 7,
    slug: 'wedding-films',
    title: 'Weddings',
    heading: 'Wedding videography in Sierra Leone',
    category: 'Event Cinema',
    format: 'asymmetrical-large',
    thumbnail: '/images/weddings/lafidi.jpg',
    description: 'Studio 74 films traditional and white weddings in Freetown and across Sierra Leone, with highlight films and longer ceremony edits.',
    detail: 'Share your date, location, and ceremony plans with the studio to discuss coverage and request access to the wedding packages.',
  },
];

export const projectSlugs = projects.map(({ slug }) => slug);
