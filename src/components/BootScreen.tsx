import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useOS } from '../context/OSContext';

export default function BootScreen() {
  const { isLoggedIn, login } = useOS();
  const [step, setStep] = useState<'zoom' | 'login'>('zoom');
  const [dotsCount, setDotsCount] = useState(0); // Count dots instead of string
  const [showPasswordPlaceholder, setShowPasswordPlaceholder] = useState(true);

  // 1. Handle Zoom
  useEffect(() => {
    const timer = setTimeout(() => setStep('login'), 6000);
    return () => clearTimeout(timer);
  }, []);

  // 2. Handle Password Animation
  useEffect(() => {
    if (step === 'login') {
      const startTypingTimer = setTimeout(() => {
        setShowPasswordPlaceholder(false);

        // Add a dot every 200ms
        const interval = setInterval(() => {
          setDotsCount(prev => {
            if (prev >= 6) { // Stop at 6 dots
              clearInterval(interval);
              setTimeout(() => login(), 600); // Login after pause
              return prev;
            }
            return prev + 1;
          });
        }, 200);
        
      }, 1000);

      return () => clearTimeout(startTypingTimer);
    }
  }, [step, login]);

  if (isLoggedIn) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden font-sans text-white">
      <AnimatePresence mode='wait'>
        
        {/* === ZOOM LAYER === */}
        {step === 'zoom' && (
          <motion.div
            key="zoom-layer"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 4.5, ease: [0.22, 0.61, 0.36, 1], delay: 1.5 }}
            className="absolute inset-0 origin-[2%_46%] pointer-events-none" 
          >
            <img src="/assets/images/pc.jpg" alt="Setup" className="w-full h-full object-cover" />
          </motion.div>
        )}

        {/* === LOGIN LAYER === */}
        {step === 'login' && (
          <motion.div
            key="login-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/windows-login.jpg')" }}>
              <div className="absolute inset-0 bg-black/20" /> 
            </div>

            <div className="relative z-10 flex flex-col items-center transform -translate-y-12 w-full max-w-sm">
              <img src="/assets/images/profile.jpg" alt="Profile" className="w-48 h-48 rounded-full border-[4px] border-white/40 shadow-2xl mb-8 object-cover aspect-square" />
              <h2 className="text-3xl font-medium mb-8 text-shadow-md">Serkan Aymaz</h2>

              {/* Password Box */}
              <div className="w-full h-[46px] bg-[#00000040] border-2 border-[#ffffff80] rounded-[4px] flex items-center px-4 relative transition hover:bg-black/50 hover:border-white cursor-pointer mb-6">
                
                {/* Placeholder Text */}
                {showPasswordPlaceholder && (
                  <span className="text-white/90 text-lg font-light absolute right-4 left-4 text-center">
                    Password
                  </span>
                )}

                {/* The Dots (Flex container for perfect centering) */}
                {!showPasswordPlaceholder && (
                  <div className="flex items-center justify-center gap-2 w-full h-full">
                    {/* Render exact number of divs based on count */}
                    {Array.from({ length: dotsCount }).map((_, i) => (
                      <div key={i} className="w-2.5 h-2.5 bg-white rounded-full shadow-sm animate-in fade-in duration-100" />
                    ))}
                  </div>
                )}

                {/* Arrow Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#ffffff40] hover:bg-[#ffffff60] p-1.5 rounded-sm transition">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              
              <div className="text-sm text-white/80 font-medium tracking-wide hover:underline cursor-pointer">
                Sign-in options
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}