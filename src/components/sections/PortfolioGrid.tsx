'use client';

import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: "Films", category: "Short & Feature", format: "asymmetrical-large", thumbnail: "https://i.vimeocdn.com/video/2082185102-d02e5d96a6d2d231d0359fd921eb2e9ab38c50817f530b4686d6f24b7ad6a083-d_1280x720", link: "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID_HERE" },
  { id: 2, title: "Documentaries", category: "Featured Collection", format: "stacked", thumbnail: "https://i.vimeocdn.com/video/2085922505-b8ec4238e823b83daf943e7e569e19dd7bf771d7e7aad1b5497ae4946c672440-d_1280x720", link: "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID_HERE" },
  { id: 3, title: "Weddings", category: "Event Cinema", format: "asymmetrical-small", thumbnail: "https://i.vimeocdn.com/video/2085921943-faaede3fbc0a6a05c6ed687fa9adceee83c2a66138edd5e94524ad46950aea6e-d_1280x720", link: "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID_HERE" },
  { id: 4, title: "Visual Technical Consultancy", category: "Advisory", format: "asymmetrical-large", thumbnail: "https://i.vimeocdn.com/video/2082185102-d02e5d96a6d2d231d0359fd921eb2e9ab38c50817f530b4686d6f24b7ad6a083-d_1280x720", link: "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID_HERE" },
  { id: 5, title: "Events", category: "Live Coverage", format: "stacked", thumbnail: "https://i.vimeocdn.com/video/2017562806-4b25b8744825e44dc75b0ecb382a9bea224677a28b68103750fd236e14021831-d_1280x720", link: "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID_HERE" },
  { id: 6, title: "Live Recordings", category: "Multicam", format: "asymmetrical-small", thumbnail: "https://i.vimeocdn.com/video/2085922505-b8ec4238e823b83daf943e7e569e19dd7bf771d7e7aad1b5497ae4946c672440-d_1280x720", link: "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID_HERE" },
  { id: 7, title: "Podcasts", category: "Serial Content", format: "asymmetrical-large", thumbnail: "https://i.vimeocdn.com/video/2085921943-faaede3fbc0a6a05c6ed687fa9adceee83c2a66138edd5e94524ad46950aea6e-d_1280x720", link: "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID_HERE" }
];

export function PortfolioGrid() {
  return (
    <>
      <section className="h-auto md:h-screen shrink-0 flex flex-col justify-center px-6 md:px-24 py-24 md:py-0 w-full md:w-[60vw]">
        <div className="max-w-2xl">
          <span className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-primary)] mb-6 block">
            [ Selected Work ]
          </span>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] text-[4rem] md:text-[6rem] leading-[0.9] text-[var(--color-on-surface)]">
            Curated <br /> <span className="font-serif italic capitalize tracking-normal font-normal text-[1em]">Experiences</span>
          </h2>
          <div className="mt-8 font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-on-surface)] opacity-50">
            2023 — Present
          </div>
        </div>
      </section>

      {/* The portfolio items flowing horizontally on MD, vertically on SM */}
      {projects.map((project, idx) => {
        let heightClass = "md:h-[65vh]";
        let marginClass = "mt-12 md:mt-[5vh]";
        let titleSize = "text-[2rem] md:text-[4rem]";
        
        if (project.format === 'asymmetrical-large') {
          heightClass = "md:h-[80vh]";
          marginClass = "mt-12 md:mt-[-5vh]";
          titleSize = "text-[2.5rem] md:text-[5rem]";
        } else if (project.format === 'stacked') {
          heightClass = "md:h-[60vh]";
          marginClass = "mt-12 md:mt-[20vh]";
        } else if (project.format === 'asymmetrical-small') {
          heightClass = "md:h-[50vh]";
          marginClass = "mt-12 md:mb-[15vh]";
        }

        return (
          <section key={project.id} className="h-auto md:h-screen shrink-0 flex flex-col md:flex-row items-center px-6 md:px-0 md:pr-40 py-8 md:py-0 w-full md:w-auto overflow-hidden md:overflow-visible">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`block relative ${marginClass} w-full md:w-auto h-[60vh] md:aspect-video ${heightClass} group cursor-explore`}>
              
              {/* Image Layer Container */}
              <div className="absolute inset-0 w-full h-full bg-[var(--color-surface)] overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="portfolio-img absolute -inset-[5%] w-[110%] h-[110%] object-cover grayscale opacity-[0.8] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 select-none pointer-events-none" 
                />
                
                {/* Subtle Gradient Mask for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000 z-10" />
              </div>

              {/* Typography Layer - Cleanly Inset on Mobile, Grid-Breaking on MD */}
              <div className="absolute bottom-[6%] left-[6%] right-[6%] md:right-auto md:-bottom-[10%] md:-left-[15%] z-20 flex flex-col justify-end pointer-events-none">
                <div className="flex items-center gap-4 mb-3">
                   <span className="font-label text-[10px] md:text-[12px] tracking-[0.1em] text-[var(--color-primary)] font-bold transition-opacity duration-500 group-hover:opacity-80">0{idx + 1}</span>
                   <span className="w-8 md:w-16 h-[1px] bg-white md:bg-[var(--color-on-surface)] transition-colors duration-700" />
                   <span className="font-label text-[10px] md:text-[12px] tracking-[0.1em] uppercase text-[var(--color-primary)] font-bold">
                     {project.category}
                   </span>
                </div>
                <h3 className={`${project.title.length > 20 ? 'text-[1.5rem] md:text-[2.5rem]' : titleSize} font-display font-bold leading-[0.85] tracking-[-0.03em] uppercase text-white md:text-[var(--color-on-surface)] transition-colors duration-700`}>
                  {project.title}
                </h3>
              </div>
            </a>
          </section>
        );
      })}
    </>
  );
}
