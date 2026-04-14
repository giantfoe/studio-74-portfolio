'use client';
import { useState, useEffect } from 'react';

const packages = [
  { 
    id: 1, 
    title: 'The Essential', 
    price: '$4,500',
    image: 'https://images.unsplash.com/photo-1551963319-13ff32a5acd1?auto=format&fit=crop&q=80&w=1200',
    features: [
      '8 Hours of Continuous Coverage', 
      'Single Lead Cinematographer', 
      '3-5 Minute Cinematic Highlight Film',
      'Professional Audio & Speech Capture',
      'Studio Color Grading & Sound Design',
      'Curated Online Delivery Gallery'
    ]
  },
  { 
    id: 2, 
    title: 'The Signature', 
    price: '$6,500',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
    features: [
      '10 Hours of Continuous Coverage', 
      'Dual Camera Setup (2 Cinematographers)', 
      '7-10 Minute Feature Film Masterpiece', 
      'Full Multi-Cam Ceremony Edit',
      'Dedicated Speeches & Toasts Edit',
      'Drone Topography & Aerial Coverage',
      'High-Impact Teaser Trailer (48hr Delivery)'
    ]
  },
  { 
    id: 3, 
    title: 'The Imperial', 
    price: '$9,500',
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Full Weekend Coverage (Rehearsal & Wedding Day)', 
      'Complete Studio Production Team (3+ Cameras)', 
      '15-20 Minute Multi-Chapter Documentary', 
      'Live Same-Day Edit (Screened at Reception)',
      'Total Raw Unedited Footage Hard Drive',
      'Extensive Drone & Aerial Cinematography',
      'Priority Archival Turnaround'
    ]
  },
];

export function WeddingPackages({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'studio74') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      setTimeout(() => onUnlock(), 100);
    }
  }, [isUnlocked, onUnlock]);

  if (!isUnlocked) {
    return (
      <section className="h-[80vh] md:h-screen shrink-0 w-full md:w-screen flex flex-col justify-center items-center px-6 md:px-24 bg-[var(--color-surface)] border-l border-[var(--outline-variant)] relative overflow-hidden">
        {/* Abstract floral background teaser */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img src="https://images.unsplash.com/photo-1465495976222-438e8f8cb20c?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-20" />
          <div className="absolute inset-0 backdrop-blur-3xl bg-[var(--color-surface)]/70" />
        </div>

        <div className="max-w-xl text-center glass-panel p-8 md:p-24 relative z-10 overflow-hidden mix-blend-exclusion text-white border-none bg-black/10 w-full mx-4 md:mx-0">
          <div className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-white/50 mb-6 block">
            [ Premium Services ]
          </div>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] text-[2.5rem] md:text-[4.5rem] leading-[0.9] text-white mb-12">
            Wedding <br /> Private Access
          </h2>
          <form onSubmit={handleUnlock} className="flex flex-col gap-6 relative z-10 w-full cursor-explore">
            <input 
              type="password"
              placeholder="ENTER SECURE KEY"
              className={`w-full bg-transparent border-b-2 ${error ? 'border-red-500 text-red-500' : 'border-white/20 text-white'} py-4 text-center font-label tracking-[0.1em] md:tracking-[0.2em] uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="submit"
              className="mt-8 px-8 py-4 bg-white text-black font-label uppercase tracking-[0.1em] md:tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500"
            >
              UNLOCK SECRETS
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="h-[60vh] md:h-screen shrink-0 flex flex-col justify-center px-6 md:px-24 py-24 md:py-0 bg-[var(--color-surface)] border-l border-[var(--outline-variant)] w-full md:w-[60vw]">
        <div className="max-w-2xl">
          <span className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-on-surface)] opacity-50 mb-6 block">
            [ Vault Unlocked ]
          </span>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] text-[3rem] md:text-[7rem] leading-[0.9] text-[var(--color-on-surface)]">
            Bridal <br /> <span className="font-serif italic capitalize tracking-normal font-normal text-[0.9em]">Collections</span>
          </h2>
        </div>
      </section>

      {packages.map((pkg, i) => (
        <section key={pkg.id} className="h-auto md:h-screen shrink-0 flex items-center px-6 md:px-0 md:pr-32 py-12 md:py-0 w-full md:w-max">
           <div className={`relative w-full md:w-[45vw] h-[70vh] md:h-[80vh] border border-[var(--outline-variant)] bg-black p-6 md:p-12 flex flex-col justify-between group cursor-explore mt-0 ${i % 2 === 0 ? 'md:mt-[10vh]' : 'md:mt-[-10vh]'}`}>
             
             {/* Object/Abstract Imagery layer */}
             <img 
               src={pkg.image} 
               className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] md:group-hover:scale-105 group-hover:opacity-80 pointer-events-none"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />

             <div className="flex justify-between items-start z-10 relative">
               <span className="font-label text-[10px] md:text-[12px] tracking-[0.1em] uppercase border border-white/30 text-white px-4 md:px-6 py-2 backdrop-blur-sm">
                  Vol // 0{i + 1}
               </span>
               <div className="text-right text-white">
                 <div className="font-display font-bold text-[2rem] md:text-[5rem] leading-[0.8] tracking-[-0.02em]">{pkg.price}</div>
                 <div className="font-label uppercase text-[10px] tracking-[0.1em] opacity-50 mt-1 md:mt-2">Starting Investment</div>
               </div>
             </div>

             <div className="z-10 relative text-white translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
               <h3 className="font-display font-bold uppercase text-[2.5rem] md:text-[5rem] leading-[0.9] whitespace-normal md:whitespace-nowrap mb-6 mix-blend-overlay">
                 {pkg.title}
               </h3>
               
               <ul className="flex flex-col gap-3 font-label text-[10px] md:text-[12px] tracking-[0.05em] uppercase border-t border-white/20 pt-6">
                 {pkg.features.map((feat, idx) => (
                   <li key={idx} className="flex gap-4 items-center opacity-90">
                     <span className="text-[var(--color-primary)] font-bold text-[14px] leading-none">+</span> {feat}
                   </li>
                 ))}
               </ul>
             </div>
           </div>
        </section>
      ))}
    </>
  );
}
