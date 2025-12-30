import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Monitor } from 'lucide-react';

export function PWAInstallPrompt() {
  // PWA install prompt disabled - return null
  return null;
}

// PWA Update Available Component
export function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker);
              setShowUpdatePrompt(true);
            }
          });
        });
      });
    }
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdatePrompt(false);
    }
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-blue-500 rounded-xl p-4 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Download size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Yangilanish mavjud</h3>
            <p className="text-xs opacity-90">Yangi versiya tayyor</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowUpdatePrompt(false)}
            className="flex-1 bg-white/20 hover:bg-white/30 py-2 px-3 rounded-lg text-xs font-medium transition-colors"
          >
            Keyinroq
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 bg-white text-blue-500 hover:bg-gray-100 py-2 px-3 rounded-lg text-xs font-medium transition-colors"
          >
            Yangilash
          </button>
        </div>
      </div>
    </div>
  );
}