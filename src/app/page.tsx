'use client';

import { useState } from 'react';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ExamInterface } from '@/components/ExamInterface';
import { getWordPoolSize } from '@/data/wordPool';
import { audioManager } from '@/utils/audioManager';

type AppState = 'home' | 'countdown' | 'exam' | 'completed';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('home');

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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">WAT - Word Association Test</h1>
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