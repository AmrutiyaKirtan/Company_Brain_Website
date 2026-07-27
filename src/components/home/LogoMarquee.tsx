'use client';

import { connectors } from '@/data/connectors';
import ConnectorIcon from '@/components/ConnectorIcon';

export default function LogoMarquee() {
  const marqueeItems = [...connectors, ...connectors];

  return (
    <div className="marquee-container overflow-hidden w-full relative group">
      {/* Edge fades */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none"></div>
      
      <div className="marquee-track flex w-max items-center gap-16 py-8 group-hover:[animation-play-state:paused]">
        {marqueeItems.map((connector, idx) => (
          <div 
            key={`${connector.slug}-${idx}`} 
            className="flex flex-col items-center gap-4 group/item cursor-pointer"
            data-cursor-label="CONNECT"
          >
            <div className="w-16 h-16 flex items-center justify-center text-muted-on-light group-hover/item:text-ink transition-colors duration-180">
              <ConnectorIcon slug={connector.slug} className="w-10 h-10" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-on-light group-hover/item:text-ink transition-colors duration-180">
              {connector.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
