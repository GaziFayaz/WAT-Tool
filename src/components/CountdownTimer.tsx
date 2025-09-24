'use client';

import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  seconds: number;
  onComplete: () => void;
  message?: string;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  seconds,
  onComplete,
  message = "Get Ready",
  className = ""
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${className}`}>
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {message}
        </h2>
        <div className="relative">
          <div className="text-8xl font-mono font-bold text-indigo-600 mb-4">
            {timeLeft}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-32 h-32 border-4 border-indigo-200 rounded-full"
              style={{
                background: `conic-gradient(#4f46e5 ${((seconds - timeLeft) / seconds) * 360}deg, transparent 0deg)`
              }}
            />
          </div>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          Test will begin in {timeLeft} second{timeLeft !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};