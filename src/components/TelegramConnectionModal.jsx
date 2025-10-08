import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Zap, Shield, Clock, ExternalLink, CheckCircle, Loader } from 'lucide-react';

const TelegramConnectionModal = ({ isOpen, onClose, user }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [connectionStep, setConnectionStep] = useState('initial'); // initial, connecting, connected
  const [telegramData, setTelegramData] = useState({
    token: '',
    botUsername: 'qarzdaftarchabot',
    telegramUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate connection token from backend
  const generateConnectionToken = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Tizimga kiring');
        return;
      }

      const response = await fetch('/api/telegram/generate-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Check if response is ok and content type is JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Backend server ishlamayapti. Iltimos, serverni ishga tushiring.');
      }

      const data = await response.json();
      
      if (data.success) {
        setTelegramData({
          token: data.token,
          botUsername: data.botUsername,
          telegramUrl: data.telegramUrl
        });
      } else {
        setError(data.message || 'Token yaratishda xatolik');
      }
    } catch (error) {
      console.error('Error generating token:', error);
      if (error.message.includes('Backend server ishlamayapti')) {
        setError('Backend server ishlamayapti. npm run dev:full buyrug\'ini ishga tushiring.');
      } else {
        setError('Server bilan bog\'lanishda xatolik');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Modal ochilganda token yaratish
  useEffect(() => {
    if (isOpen && connectionStep === 'initial') {
      generateConnectionToken();
    }
  }, [isOpen, connectionStep]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleConnectClick = () => {
    if (!telegramData.telegramUrl) {
      setError('Telegram URL yaratilmagan. Qayta urinib ko\'ring.');
      return;
    }

    setConnectionStep('connecting');
    // Open Telegram bot in new window
    window.open(telegramData.telegramUrl, '_blank');
    
    // Check connection status periodically
    const checkConnection = setInterval(async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/telegram/status', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          console.log('Backend not responding, skipping connection check');
          return;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.log('Backend returned non-JSON response, skipping connection check');
          return;
        }

        const data = await response.json();
        
        if (data.success && data.connected) {
          setConnectionStep('connected');
          clearInterval(checkConnection);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }, 2000);

    // Stop checking after 2 minutes
    setTimeout(() => {
      clearInterval(checkConnection);
      if (connectionStep === 'connecting') {
        setError('Bog\'lanish vaqti tugadi. Qayta urinib ko\'ring.');
        setConnectionStep('initial');
      }
    }, 120000);
  };

  const handleSkip = () => {
    // Set flag to not show modal for 24 hours
    const skipTime = Date.now().toString();
    localStorage.setItem('telegramModalSkipped', skipTime);
    console.log('Telegram modal skipped until:', new Date(parseInt(skipTime) + 24 * 60 * 60 * 1000));
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
      isClosing ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-t-2xl p-6 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <MessageCircle size={24} />
              </div>
              <h2 className="text-xl font-bold">Telegram Bot bilan bog'laning</h2>
            </div>
            <p className="text-blue-100 text-sm">
              Qarz eslatmalarini Telegram orqali oling
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {connectionStep === 'initial' && (
            <>
              {/* Loading state */}
              {isLoading && (
                <div className="text-center py-4 mb-4">
                  <Loader className="animate-spin mx-auto mb-2 text-blue-500" size={24} />
                  <p className="text-sm text-gray-600">Token yaratilmoqda...</p>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-800 text-sm">{error}</p>
                  <button
                    onClick={generateConnectionToken}
                    className="text-red-600 hover:text-red-800 text-sm font-medium mt-1"
                  >
                    Qayta urinish
                  </button>
                </div>
              )}

              {/* Benefits */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg mt-0.5">
                    <Zap size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Tezkor eslatmalar</h3>
                    <p className="text-gray-600 text-xs">Ertaga muddati tugaydigan qarzlar haqida darhol xabar oling</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg mt-0.5">
                    <Shield size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Xavfsiz ulanish</h3>
                    <p className="text-gray-600 text-xs">Ma'lumotlaringiz shifrlangan holda uzatiladi</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg mt-0.5">
                    <Clock size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">24/7 mavjud</h3>
                    <p className="text-gray-600 text-xs">Istalgan vaqtda qarz ma'lumotlarini oling</p>
                  </div>
                </div>
              </div>

              {/* Connection steps */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-900 text-sm mb-3">Qanday ishlaydi:</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span>"Telegram Bot"ga o'tish tugmasini bosing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span>Botga /start buyrug'ini yuboring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span>Bog'lanish tasdiqlanadi</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleConnectClick}
                  disabled={isLoading || !telegramData.telegramUrl || error}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <MessageCircle size={18} />
                  Telegram Botga o'tish
                  <ExternalLink size={16} />
                </button>

                <button
                  onClick={handleSkip}
                  className="w-full text-gray-500 py-2 px-4 rounded-xl font-medium hover:text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                >
                  Keyinroq bog'layman
                </button>
              </div>
            </>
          )}

          {connectionStep === 'connecting' && (
            <div className="text-center py-8">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-blue-600 animate-pulse" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bog'lanish kutilmoqda...</h3>
              <p className="text-gray-600 text-sm mb-4">
                Telegram botga /start buyrug'ini yuboring
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-xs">
                  💡 Agar bot ochilmagan bo'lsa, @{telegramData.botUsername} ni qidirib toping
                </p>
              </div>
            </div>
          )}

          {connectionStep === 'connected' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Muvaffaqiyatli bog'landi!</h3>
              <p className="text-gray-600 text-sm mb-6">
                Endi siz Telegram orqali qarz eslatmalarini olishingiz mumkin
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 text-sm mb-2">Mavjud buyruqlar:</h4>
                <div className="text-xs text-green-800 space-y-1">
                  <div>/tomorrow - Ertaga muddati tugaydigan qarzlar</div>
                  <div>/today - Bugungi qarzlar</div>
                  <div>/week - Bir haftalik qarzlar</div>
                  <div>/stats - Umumiy statistika</div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                Yopish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TelegramConnectionModal;