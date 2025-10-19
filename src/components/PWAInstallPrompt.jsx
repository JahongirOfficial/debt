import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Monitor } from 'lucide-react';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as PWA
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                            window.navigator.standalone === true;
    setIsStandalone(isStandaloneMode);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Check if user has dismissed the prompt before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      const dismissedTime = dismissed ? parseInt(dismissed) : 0;
      const oneDayInMs = 24 * 60 * 60 * 1000;
      
      if (!dismissed || (Date.now() - dismissedTime) > oneDayInMs) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show iOS install prompt if not standalone and not dismissed
    if (iOS && !isStandaloneMode) {
      const dismissed = localStorage.getItem('pwa-install-dismissed-ios');
      const dismissedTime = dismissed ? parseInt(dismissed) : 0;
      const oneDayInMs = 24 * 60 * 60 * 1000;
      
      if (!dismissed || (Date.now() - dismissedTime) > oneDayInMs) {
        setTimeout(() => setShowInstallPrompt(true), 3000);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installed');
      } else {
        console.log('PWA installation dismissed');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    const storageKey = isIOS ? 'pwa-install-dismissed-ios' : 'pwa-install-dismissed';
    localStorage.setItem(storageKey, Date.now().toString());
    setShowInstallPrompt(false);
  };

  // Don't show if already running as PWA
  if (isStandalone || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 shadow-2xl text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-xl">
              {isIOS ? <Smartphone size={20} /> : <Download size={20} />}
            </div>
            <div>
              <h3 className="font-bold text-sm">Ilovani o'rnating</h3>
              <p className="text-xs opacity-90">Tezroq kirish uchun</p>
            </div>
          </div>

          {isIOS ? (
            <div className="text-xs space-y-2 mb-4">
              <p>Safari brauzerida:</p>
              <div className="flex items-center gap-2">
                <span>1.</span>
                <div className="flex items-center gap-1">
                  <span>Pastdagi</span>
                  <div className="inline-flex items-center justify-center w-4 h-4 bg-white/20 rounded">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span>tugmasini bosing</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>2.</span>
                <span>"Bosh ekranga qo'shish" ni tanlang</span>
              </div>
            </div>
          ) : (
            <p className="text-xs mb-4 opacity-90">
              Qarzdaftarni telefoningizga o'rnating va tezroq foydalaning
            </p>
          )}

          {!isIOS && (
            <button
              onClick={handleInstallClick}
              className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Download size={16} />
              O'rnatish
            </button>
          )}
        </div>
      </div>
    </div>
  );
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