export function ViewportGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] p-6 md:p-12 font-label uppercase tracking-[0.1em] text-[10px] md:text-[12px] mix-blend-difference text-white hidden md:block">
      {/* Top Left - Replaced by Global Logo */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 pointer-events-auto">
        {/* Intentionally left blank for logo injection in page.tsx */}
      </div>
      
      {/* Top Right */}
      <div className="absolute top-8 right-6 md:top-12 md:right-12 pointer-events-auto cursor-explore hover:opacity-50 transition-opacity">
        [ MENU ]
      </div>
      
      {/* Bottom Left */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 flex flex-col gap-1 pointer-events-auto">
        <span>FREETOWN|GLOBAL</span>
        <span className="opacity-50">STUDIO74</span>
      </div>
      
      {/* Bottom Right */}
      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 pointer-events-auto flex flex-col gap-1 text-right">
        <span>(C) 2026</span>
        <span className="opacity-50">ALL RIGHTS RESERVED</span>
      </div>
    </div>
  );
}
