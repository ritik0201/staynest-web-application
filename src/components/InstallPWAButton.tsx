'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function InstallPWAButton() {
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPromptInstall(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (!promptInstall) {
      toast.info("Installation is not available. The app may already be installed or your browser does not support automatic installation.");
      return;
    }
    promptInstall.prompt();
  };

  return (
    <button
      className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      <Download className="w-5 h-5 mr-2" />
      <span className="font-medium">Install App</span>
    </button>
  );
}