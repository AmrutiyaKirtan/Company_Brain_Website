export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-10 py-16 border-t border-line-on-dark">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-white mb-1">
            Company Brain
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-on-dark">
            Local-first knowledge engine for AI agents.
          </p>
        </div>
        <p className="font-body text-[13px] text-muted-on-dark leading-relaxed">
          companybrain@gmail.com
        </p>
      </div>
    </footer>
  );
}
