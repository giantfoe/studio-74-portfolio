export function Hero() {
  return (
    <section id="top" className="min-h-svh w-full md:w-screen shrink-0 flex flex-col justify-center px-6 pt-20 pb-12 md:px-24 relative overflow-hidden bg-[var(--color-surface)]">
      <div aria-hidden="true" className="studio-hero-grid absolute inset-0 pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
        <span className="font-display font-bold text-[60vw] md:text-[28vw] leading-none">74</span>
      </div>

      <div className="studio-hero-content relative z-10 w-full max-w-7xl mx-auto flex flex-col">
        <h1 className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.8]">
          <span className="block text-[13vw] md:text-[10vw] lg:text-[9rem] py-2">Studio</span>
          <span className="block text-[13vw] md:text-[10vw] lg:text-[9rem] text-[var(--color-primary)] ml-[5%] md:ml-[10%] py-2"> Seventy</span>
          <span className="block text-[13vw] md:text-[10vw] lg:text-[9rem] text-[var(--color-primary)] ml-[10%] md:ml-[20%] py-2"> Four</span>
        </h1>
        <div className="mt-8 md:mt-12 md:ml-auto w-full md:w-[50%] lg:w-[42%] bg-[var(--color-primary-container)] p-6 md:p-9">
          <p className="font-display font-bold text-xl md:text-2xl leading-tight">
            Video production in Freetown, Sierra Leone
          </p>
          <p className="mt-3 leading-relaxed">
            Studio 74 produces TV commercials, documentaries, wedding films, music videos, and live recordings.
          </p>
        </div>
      </div>
    </section>
  );
}
