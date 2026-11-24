export default function Footer() {
  return (
    <footer className="shrink-0 border-t border-white/10 bg-slate-950/90 px-6 py-2.5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 text-center text-[11px] text-slate-400 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} CourtReserve. All rights reserved.</p>
        <p>Find your time. Book your court. Play your game.</p>
      </div>
    </footer>
  );
}
