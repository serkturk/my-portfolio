import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AppId, useOS } from '../context/OSContext';

interface WindowProps {
  id: AppId;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Window({ id, title, children, maxWidth = 'max-w-2xl' }: WindowProps) {
  const { activeApp, closeApp } = useOS();
  const isOpen = activeApp === id;

  return (
    <AnimatePresence>
      {isOpen && (
        // Backdrop (Clicking this closes the window)
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" 
          onClick={closeApp}
        >
          {/* Window Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()} // Prevent close on inside click
            className={`w-full ${maxWidth} bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]`}
          >
            {/* Title Bar */}
            <div className="bg-[#151A21] border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0">
              <span className="font-semibold text-sm tracking-wide text-gray-200">{title}</span>
              <button 
                onClick={closeApp} 
                className="text-gray-400 hover:text-white transition p-1 hover:bg-white/10 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Scrollable Content Area */}
            <div className="p-6 overflow-y-auto custom-scrollbar text-gray-200">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}