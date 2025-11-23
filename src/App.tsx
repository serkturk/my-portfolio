import { OSProvider, useOS } from './context/OSContext';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';

function OSLayout() {
  const { isLoggedIn } = useOS();

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-black">
      {/* 1. The Wallpaper: Same as boot, but blurred for depth */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: "url('/assets/images/pc.jpg')",
          // If logged in, blur it slightly to focus on content
          filter: isLoggedIn ? 'blur(12px) brightness(0.6)' : 'blur(0px) brightness(1)' 
        }}
      />
      
      {/* 2. Boot Screen */}
      <BootScreen />

      {/* 3. Desktop Interface */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
          isLoggedIn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Desktop />
        <Taskbar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <OSProvider>
      <OSLayout />
    </OSProvider>
  );
}