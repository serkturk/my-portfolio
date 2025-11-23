import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function Taskbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
      
      {/* TASKBAR CONTAINER 
          - Longer: max-w-7xl, w-[96%]
          - Relative: Required for the absolute centering of the middle icons
      */}
      <div className="relative flex items-center justify-between h-[72px] px-4 rounded-2xl 
                      bg-[#141414]/90 backdrop-blur-xl border border-white/10 
                      shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[96%] max-w-7xl">
        
        {/* LEFT: START + BIGGER SEARCH */}
        <div className="flex items-center gap-4 flex-1">
          {/* Start Button */}
          <div className="h-11 w-11 hover:bg-white/10 rounded-lg flex items-center justify-center transition active:scale-95 cursor-pointer group">
             <img src="/assets/images/windows-logo.png" alt="Start" className="h-7 w-7 opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-glow" />
          </div>
          
          {/* Bigger Search Bar */}
          <div className="hidden sm:flex items-center gap-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors px-4 h-10 rounded-full border border-white/5 text-sm text-white/70 w-64 cursor-text shadow-inner">
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="pt-0.5">Search...</span>
          </div>
        </div>

        {/* CENTER: APP DOCK (ABSOLUTE CENTERED) 
            - absolute left-1/2 -translate-x-1/2 forces it to be EXACTLY in the middle of the screen
            - This aligns it perfectly with your desktop grid
        */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4">
           {[
             { title: 'Valorant', src: '/assets/images/icons/valorant.png' },
             { title: 'osu!', src: '/assets/images/icons/osu.png' },
             { title: 'Spotify', src: '/assets/images/icons/spotify.png' },
             { title: 'YouTube', src: '/assets/images/icons/youtube.png' },
             { title: 'Gmail', src: '/assets/images/icons/gmail.png' },
             { title: 'Instagram', src: '/assets/images/icons/instagram.png' },
           ].map((app, i) => (
             <button 
               key={i}
               className="group relative p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 hover:-translate-y-1 active:scale-95" 
               title={app.title}
             >
                <img src={app.src} alt={app.title} className="w-10 h-10 object-contain drop-shadow-lg transition-transform group-hover:scale-110" />
                {/* Running Dot */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100" />
             </button>
           ))}
        </div>

        {/* RIGHT: CLOCK & TRAY */}
        <div className="flex items-center justify-end gap-4 pl-4 flex-1">
           {/* Wifi/Sound Icons */}
           <div className="hidden sm:flex gap-3 opacity-60">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
           </div>
           
           <div className="text-right hover:bg-white/5 px-2 py-1 rounded transition">
              <span className="block text-sm font-bold text-white/90 leading-none">{format(time, 'h:mm aa')}</span>
              <span className="block text-[11px] text-white/60 font-medium mt-0.5">{format(time, 'MM/dd/yyyy')}</span>
           </div>
        </div>

      </div>
    </div>
  );
}