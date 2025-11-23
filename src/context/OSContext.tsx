import React, { createContext, useContext, useState } from 'react';

export type AppId = 'contacts' | 'experience' | 'projects' | 'photos' | 'notes' | 'about' | 'terminal' | 'resume' | null;

interface OSContextType {
  activeApp: AppId;
  isLoggedIn: boolean;
  openApp: (app: AppId) => void;
  closeApp: () => void;
  login: () => void;
}

const OSContext = createContext<OSContextType>({} as OSContextType);

export const OSProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeApp, setActiveApp] = useState<AppId>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const openApp = (app: AppId) => setActiveApp(app);
  const closeApp = () => setActiveApp(null);
  const login = () => setLoggedIn(true);

  return (
    <OSContext.Provider value={{ activeApp, isLoggedIn, openApp, closeApp, login }}>
      {children}
    </OSContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOS = () => useContext(OSContext);