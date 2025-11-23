import { useState } from 'react';
import { useOS, AppId } from '../context/OSContext';
import Window from './Window';

interface DesktopIcon {
  id: string;
  title: string;
  icon: string;
  color: string;
  type: 'app' | 'link';
  url?: string;
}

const DESKTOP_ICONS: DesktopIcon[] = [
  { id: 'about', title: 'About Me', icon: '/assets/images/icons/avatar.png', color: '#2196F3', type: 'app' },
  { id: 'experience', title: 'Experience', icon: '/assets/images/icons/exp.png', color: '#FF9800', type: 'app' },
  { id: 'projects', title: 'Projects', icon: '/assets/images/icons/projects.png', color: '#3F51B5', type: 'app' },
  { id: 'terminal', title: 'Terminal', icon: '/assets/images/icons/valorant.png', color: '#333333', type: 'app' },
  { id: 'resume', title: 'Resume.pdf', icon: '/assets/images/icons/notes.png', color: '#F44336', type: 'app' },
  { id: 'contacts', title: 'Contact', icon: '/assets/images/icons/contacts.png', color: '#4CAF50', type: 'app' },
  { id: 'photos', title: 'Life & Friends', icon: '/assets/images/icons/photos.png', color: '#E91E63', type: 'app' },
  { id: 'github', title: 'GitHub', icon: '/assets/images/icons/git.png', color: '#24292E', type: 'link', url: 'https://github.com/serkturk' },
  { id: 'linkedin', title: 'LinkedIn', icon: '/assets/images/icons/linkedin.png', color: '#0A66C2', type: 'link', url: 'https://www.linkedin.com/in/serkan-aymaz/' },
  { id: 'notes', title: 'Guestbook', icon: '/assets/images/icons/notes.png', color: '#FFEB3B', type: 'app' },
];

export default function Desktop() {
  const { openApp } = useOS();
  const [noteContent, setNoteContent] = useState(() => {
    const saved = localStorage.getItem('serkan-notes');
    return saved || '';
  });

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setNoteContent(newVal);
    localStorage.setItem('serkan-notes', newVal);
  };

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      
      {/* DESKTOP ICONS */}
      <div className="absolute top-10 left-0 right-0 flex justify-center pointer-events-auto">
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl px-4">
          {DESKTOP_ICONS.map((item) => {
            const isLink = item.type === 'link';
            const Wrapper = isLink ? 'a' : 'button';
            const props = isLink 
              ? { href: item.url, target: "_blank", rel: "noreferrer" } 
              : { onClick: () => openApp(item.id as AppId) };

            return (
              <Wrapper
                key={item.id}
                {...props}
                className="group flex flex-col items-center gap-3 w-28 text-center cursor-pointer focus:outline-none transition-transform duration-200 active:scale-95"
              >
                <div 
                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center 
                             bg-[#1c1c1c]/80 backdrop-blur-md border border-white/10 shadow-xl
                             group-hover:bg-[#2a2a2a] group-hover:border-white/30 group-hover:shadow-2xl
                             transition-all duration-300"
                >
                  <img 
                    src={item.icon} 
                    alt={item.title} 
                    className="w-10 h-10 object-contain drop-shadow-md brightness-110 group-hover:scale-110 transition-transform" 
                  />
                </div>
                <span className="text-white/90 font-medium text-sm tracking-wide text-shadow-md bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-black/40 transition-colors">
                  {item.title}
                </span>
              </Wrapper>
            );
          })}
        </div>
      </div>

      {/* WINDOWS */}
      <div className="pointer-events-auto">
        
        {/* ABOUT ME WINDOW - Updated Cornell '28 */}
        <Window id="about" title="About Me">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <img src="/assets/images/profile.jpg" className="w-32 h-32 rounded-xl object-cover border-2 border-white/10" />
              <div>
                <h2 className="text-2xl font-bold text-white">Hi, I'm Serkan.</h2>
                <p className="text-blue-400 text-lg">Developer & Problem Solver</p>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  I build things for the web. Currently studying CS at Cornell. 
                  I'm obsessed with clean UI, fast code, and competitive gaming.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-lg">
                 <h3 className="text-sm font-bold text-gray-300 mb-2">Stats</h3>
                 <ul className="text-sm text-gray-400 space-y-1">
                   <li>🎓 Cornell '28</li> {/* UPDATED HERE */}
                   <li>📍 Ithaca, NY</li>
                   <li>💻 Full Stack</li>
                 </ul>
               </div>
               <div className="bg-white/5 p-4 rounded-lg">
                 <h3 className="text-sm font-bold text-gray-300 mb-2">Interests</h3>
                 <ul className="text-sm text-gray-400 space-y-1">
                   <li>🎮 Valorant (Immo)</li>
                   <li>🎹 Rhythm Games</li>
                   <li>🏋️ Gym</li>
                 </ul>
               </div>
            </div>
          </div>
        </Window>

        {/* Keep other windows (Terminal, Resume, Contacts, etc.) exactly as they were... */}
        <Window id="terminal" title="Terminal - zsh" maxWidth="max-w-3xl">
          <div className="bg-[#0d1117] p-4 font-mono text-sm h-[400px] text-green-400 overflow-y-auto">
            <p><span className="text-blue-400">serkan@pc</span> <span className="text-white">~ %</span> cat skills.txt</p>
            <p className="text-gray-300 mb-4">Languages: TypeScript, Python, Java<br/>Frameworks: React, Tailwind</p>
            <p><span className="text-blue-400">serkan@pc</span> <span className="text-white">~ %</span> <span className="animate-pulse">_</span></p>
          </div>
        </Window>

        <Window id="resume" title="Resume.pdf" maxWidth="max-w-4xl">
           <div className="h-[60vh] flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
             <p className="text-gray-400">PDF Viewer Integration Coming Soon...</p>
           </div>
        </Window>

        <Window id="contacts" title="Contacts">
           <div className="text-center py-10 text-gray-400">Contacts Content...</div>
        </Window>
        <Window id="experience" title="Experience" maxWidth="max-w-4xl">
           <div className="text-center py-10 text-gray-400">Experience Content...</div>
        </Window>
        <Window id="projects" title="Projects" maxWidth="max-w-4xl">
           <div className="text-center py-10 text-gray-400">Projects Content...</div>
        </Window>
        <Window id="photos" title="Photos" maxWidth="max-w-5xl">
           <div className="text-center py-10 text-gray-400">Gallery Content...</div>
        </Window>
        <Window id="notes" title="Guestbook">
          <div className="flex flex-col h-full min-h-[400px]">
            <div className="bg-[#fff9c4] text-gray-800 p-4 rounded-t-lg border-b border-yellow-200">
              <h3 className="font-bold text-lg">Guestbook</h3>
              <p className="text-xs opacity-70">Leave a note! (Saved locally)</p>
            </div>
            <textarea 
              value={noteContent}
              onChange={handleNoteChange}
              className="flex-1 w-full p-6 bg-[#fffde7] text-gray-800 font-mono text-base resize-none focus:outline-none leading-relaxed"
            />
          </div>
        </Window>

      </div>
    </div>
  );
}