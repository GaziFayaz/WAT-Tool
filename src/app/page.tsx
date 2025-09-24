'use client';

import { useState } from 'react';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ExamInterface } from '@/components/ExamInterface';
import { getWordPoolSize } from '@/data/wordPool';
import { audioManager } from '@/utils/audioManager';

type AppState = 'home' | 'countdown' | 'exam' | 'completed';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('home');
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);

  const handleStartExam = async () => {
    // Initialize audio context on user interaction
    await audioManager.initializeOnUserInteraction();
    setAppState('countdown');
  };

  const handleCountdownComplete = () => {
    setAppState('exam');
  };

  const handleExamComplete = () => {
    setAppState('completed');
  };

  const handleExamCancel = () => {
    setAppState('home');
  };

  const handleReturnHome = () => {
    setAppState('home');
  };

  if (appState === 'countdown') {
    return (
      <CountdownTimer
        seconds={10}
        onComplete={handleCountdownComplete}
        message="Get Ready"
      />
    );
  }

  if (appState === 'exam') {
    return <ExamInterface onComplete={handleExamComplete} onCancel={handleExamCancel} />;
  }

  if (appState === 'completed') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Test Completed!</h2>
            <p className="text-lg text-gray-600 mb-6">You have successfully completed the Word Association Test.</p>
          </div>
          <button
            onClick={handleReturnHome}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">WAT - Word Association Test</h1>
          
          {/* Social Media Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSocialDropdown(!showSocialDropdown)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Social media links"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            {showSocialDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <a
                    href="https://github.com/GaziFayaz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gazi-fayaz-ahmed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://www.facebook.com/fayaz.orchi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            )}
            
            {/* Overlay to close dropdown when clicking outside */}
            {showSocialDropdown && (
              <div 
                className="fixed inset-0 z-0" 
                onClick={() => setShowSocialDropdown(false)}
              />
            )}
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Word Association Test</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A psychological assessment tool designed to explore your subconscious thoughts and associations.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            How the Test Works
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Preparation</h4>
                  <p className="text-gray-600">After clicking start, you will have a 10-second countdown to get ready.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Word Presentation</h4>
                  <p className="text-gray-600">80 words will be presented one by one, each displayed for 10 seconds with a chime sound.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Page Breaks</h4>
                  <p className="text-gray-600">Recommended 20 words per page. After the 20th and 60th words, there will be a 5-second break with instructions to turn the page.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Your Response</h4>
                  <p className="text-gray-600">For each word shown, write a complete sentence that uses that word. Write the first sentence that comes to mind - don&apos;t overthink it.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">5</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Completion</h4>
                  <p className="text-gray-600">After all 80 words, you&apos;ll hear a completion chime and can return to the home screen.</p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Have pen and paper ready before starting the test. Respond quickly with your first instinct.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">80</div>
            <div className="text-gray-600">Total Words</div>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{getWordPoolSize()}</div>
            <div className="text-gray-600">Word Pool Size</div>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">~14</div>
            <div className="text-gray-600">Minutes Duration</div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleStartExam}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            Start Exam
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Make sure you have pen and paper ready
          </p>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2024 Word Association Test Tool. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}