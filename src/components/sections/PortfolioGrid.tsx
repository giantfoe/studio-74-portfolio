'use client';

import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: "Al-ostoura", category: "Cinematic Commercial", format: "asymmetrical-large", thumbnail: "https://i.vimeocdn.com/video/2085922505-b8ec4238e823b83daf943e7e569e19dd7bf771d7e7aad1b5497ae4946c672440-d_1280x720", link: "https://vimeo.com/1139312850" },
  { id: 2, title: "Bomba", category: "Visual Storytelling", format: "stacked", thumbnail: "https://i.vimeocdn.com/video/2085921943-faaede3fbc0a6a05c6ed687fa9adceee83c2a66138edd5e94524ad46950aea6e-d_1280x720", link: "https://vimeo.com/1139312846" },
  { id: 3, title: "Vodka Mix", category: "Art Direction", format: "asymmetrical-small", thumbnail: "https://i.vimeocdn.com/video/2082185102-d02e5d96a6d2d231d0359fd921eb2e9ab38c50817f530b4686d6f24b7ad6a083-d_1280x720", link: "https://vimeo.com/1136483332" },
  { id: 4, title: "Hosana", category: "Music Video", format: "large-centered", thumbnail: "https://i.vimeocdn.com/video/2017562806-4b25b8744825e44dc75b0ecb382a9bea224677a28b68103750fd236e14021831-d_1280x720", link: "https://vimeo.com/1085897549" }
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
        let heightClass = "h-[45vh] md:h-[65vh]";
        let marginClass = "mt-0 md:mt-[5vh]";
        let titleSize = "text-[2rem] md:text-[4rem]";
        
        if (project.format === 'asymmetrical-large') {
          heightClass = "h-[50vh] md:h-[80vh]";
          marginClass = "mt-0 md:mt-[-5vh]";
          titleSize = "text-[2.5rem] md:text-[5rem]";
        } else if (project.format === 'stacked') {
          heightClass = "h-[40vh] md:h-[60vh]";
          marginClass = "mt-0 md:mt-[20vh]";
        } else if (project.format === 'asymmetrical-small') {
          heightClass = "h-[35vh] md:h-[50vh]";
          marginClass = "mb-0 md:mb-[15vh]";
        }

        return (
          <section key={project.id} className="h-auto md:h-screen shrink-0 flex items-center px-6 md:px-0 md:pr-32 py-12 md:py-0 w-full md:w-auto">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`block relative ${marginClass} ${heightClass} w-full md:w-auto md:aspect-video bg-[var(--color-surface)] overflow-hidden group cursor-explore`}>
              {/* Image Layer */}
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale opacity-[0.85] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.05] transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] select-none pointer-events-none" 
              />
              
              {/* Editorial Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-1000 z-10" />

              {/* Typography Layer */}
              <div className="absolute bottom-[8%] left-[6%] md:left-[8%] z-20 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-3">
                   <span className="font-label text-[12px] tracking-[0.1em] text-[var(--color-primary)] font-bold">0{idx + 1}</span>
                   <span className="w-8 md:w-12 h-[1px] bg-white/40 group-hover:bg-[var(--color-primary)] transition-colors duration-700" />
                   <span className="font-label text-[10px] md:text-[12px] tracking-[0.1em] uppercase text-white/80">
                     {project.category}
                   </span>
                </div>
                <h3 className={`${titleSize} font-display font-bold leading-[0.9] tracking-[-0.02em] uppercase text-white group-hover:text-[var(--color-primary)] transition-colors duration-700`}>
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
