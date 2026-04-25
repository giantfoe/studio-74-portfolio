'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '9bc56beb-a54e-40cd-b65e-e77dcb90cfea',
          subject: 'New Newsletter Subscriber',
          from_name: 'Studio 74 Newsletter',
          email: email
        })
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="h-[80vh] md:h-screen w-full md:w-screen shrink-0 flex flex-col justify-between px-6 md:px-24 py-12 md:py-24 bg-black text-white relative overflow-hidden border-l border-white/20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-luminosity grayscale pointer-events-none" />
      
      {/* Top Meta Info */}
      <div className="flex justify-between items-start w-full relative z-10">
        <div className="font-label text-[10px] md:text-[12px] tracking-[0.1em] uppercase opacity-50">
          [ End of Exhibition ]
        </div>
        <div className="text-right flex flex-col gap-2 font-label text-[10px] md:text-[12px] tracking-[0.1em] uppercase opacity-50">
          <span>FREETOWN|GLOBAL</span>
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Massive Typographic Centerpiece */}
      <div className="w-full relative z-10 flex flex-col items-center justify-center my-auto px-4 md:px-0 mt-20 md:mt-0">
        <h2 className="font-display text-[22vw] md:text-[15vw] leading-[0.85] tracking-[-0.03em] font-bold text-center uppercase whitespace-normal md:whitespace-nowrap mb-6 mix-blend-difference opacity-90 skew-elem origin-bottom">
          Stay Tuned
        </h2>
        <p className="font-body text-[1rem] md:text-[1.5rem] tracking-wide text-center uppercase max-w-2xl opacity-60 mix-blend-difference mb-10 px-4">
          The relentless pursuit of cinematic emotion. Await the next film.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center w-full max-w-lg mb-16 relative z-10 px-6 sm:px-0 gap-4 sm:gap-0">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Subscribe to our Curated Letter" 
            className="w-full sm:w-[350px] bg-transparent border-b border-white/30 text-white px-4 py-4 font-label uppercase tracking-[0.1em] text-[10px] md:text-[12px] focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-white/40 text-center sm:text-left disabled:opacity-50"
            disabled={status !== 'idle'}
            required
          />
          <button 
            type="submit"
            disabled={status !== 'idle'}
            className="w-full sm:w-auto font-label tracking-[0.1em] uppercase text-[12px] bg-white text-black hover:bg-[var(--color-primary)] hover:text-white px-8 py-4 transition-colors duration-500 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined.' : 'Join'}
          </button>
        </form>
        
        <a 
          href="mailto:slstudio74sl@gmail.com"
          className="group relative px-12 py-6 bg-white text-black hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-500 overflow-hidden flex items-center justify-center cursor-pointer"
        >
          <span className="font-label text-[12px] tracking-[0.2em] uppercase relative z-10 font-bold block transition-transform duration-500 group-hover:-translate-y-[60px] whitespace-nowrap">
            Start A Project
          </span>
          <span className="font-label text-[12px] tracking-[0.2em] uppercase absolute inset-0 flex items-center justify-center z-10 font-bold translate-y-[60px] transition-transform duration-500 group-hover:translate-y-0 whitespace-nowrap">
            Click to Inquire
          </span>
        </a>
      </div>
    </section>
  );
}
