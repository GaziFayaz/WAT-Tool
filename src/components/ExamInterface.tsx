"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getRandomWords } from "@/data/wordPool";
import { audioManager } from "@/utils/audioManager";

interface ExamInterfaceProps {
	onComplete: () => void;
	onCancel: () => void;
}

export const ExamInterface: React.FC<ExamInterfaceProps> = ({ onComplete, onCancel }) => {
	const [words] = useState<string[]>(() => getRandomWords());
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [timeLeft, setTimeLeft] = useState(10);
	const [isPageBreak, setIsPageBreak] = useState(false);
	const [pageBreakTimeLeft, setPageBreakTimeLeft] = useState(5);
	const [isPaused, setIsPaused] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);

	// Play chime sound function using the audio manager
	const playChime = useCallback(async () => {
		await audioManager.playWordChime();
	}, []);

	// Play completion chime (different tone)
	const playCompletionChime = useCallback(async () => {
		await audioManager.playCompletionChime();
	}, []);

	// Play page break chime
	const playPageBreakChime = useCallback(async () => {
		await audioManager.playPageBreakChime();
	}, []);

	// Handle pause/resume
	const handlePauseResume = useCallback(() => {
		setIsPaused(!isPaused);
	}, [isPaused]);

	// Handle cancel confirmation
	const handleCancelClick = useCallback(() => {
		setShowCancelModal(true);
	}, []);

	const handleConfirmCancel = useCallback(() => {
		onCancel();
	}, [onCancel]);

	const handleDismissModal = useCallback(() => {
		setShowCancelModal(false);
	}, []);

	// Handle page breaks after 20th and 60th words
	const checkForPageBreak = useCallback((index: number) => {
		return index === 20 || index === 60;
	}, []);

	// Main timer effect for word display
	useEffect(() => {
		if (isPageBreak || isPaused) return;

		if (timeLeft <= 0) {
			const nextIndex = currentWordIndex + 1;

			if (nextIndex >= words.length) {
				// Exam completed - but only if not paused
				if (!isPaused) {
					playCompletionChime();
					setTimeout(() => onComplete(), 1000);
				}
				return;
			}

			if (checkForPageBreak(nextIndex)) {
				// Start page break - but only if not paused
				if (!isPaused) {
					setIsPageBreak(true);
					setPageBreakTimeLeft(5);
					setCurrentWordIndex(nextIndex);
					playPageBreakChime();
				}
			} else {
				// Move to next word - but only if not paused
				if (!isPaused) {
					playChime();
					setCurrentWordIndex(nextIndex);
					setTimeLeft(10);
				}
			}
			return;
		}

		const timer = setTimeout(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [
		timeLeft,
		currentWordIndex,
		words.length,
		isPageBreak,
		isPaused,
		onComplete,
		playChime,
		playCompletionChime,
		checkForPageBreak,
		playPageBreakChime,
	]);

	// Page break timer effect
	useEffect(() => {
		if (!isPageBreak || isPaused) return;

		if (pageBreakTimeLeft <= 0) {
			// End page break and continue with next word - but only if not paused
			if (!isPaused) {
				setIsPageBreak(false);
				setTimeLeft(10);
				playChime();
			}
			return;
		}

		const timer = setTimeout(() => {
			setPageBreakTimeLeft(pageBreakTimeLeft - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [pageBreakTimeLeft, isPageBreak, isPaused, playChime]);

	// Play initial chime when component mounts
	useEffect(() => {
		playChime();
	}, [playChime]);

	if (isPageBreak) {
		return (
			<>
				<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
					<div className="text-center p-8 bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md">
						<div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg
								className="w-8 h-8 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								/>
							</svg>
						</div>
						<h2 className="text-2xl font-bold text-gray-800 mb-4">
							Turn to Next Page
						</h2>
						<p className="text-gray-600 mb-6">
							Please turn to the next page in your answer sheet.
						</p>
						<div className="text-6xl font-mono font-bold text-yellow-600 mb-2">
							{pageBreakTimeLeft}
						</div>
						<p className="text-sm text-gray-500">
							{isPaused ? 'Paused' : `Continuing in ${pageBreakTimeLeft} seconds...`}
						</p>
						
						{/* Control buttons */}
						<div className="flex justify-center space-x-4 mt-6">
							<button
								onClick={handlePauseResume}
								className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
							>
								{isPaused ? 'Resume' : 'Pause'}
							</button>
							<button
								onClick={handleCancelClick}
								className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
				
				{/* Cancel Confirmation Modal */}
				{showCancelModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
							<h3 className="text-xl font-bold text-gray-800 mb-4">Cancel Exam?</h3>
							<p className="text-gray-600 mb-6">
								Are you sure you want to cancel the exam? All progress will be lost.
							</p>
							<div className="flex justify-end space-x-4">
								<button
									onClick={handleDismissModal}
									className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors"
								>
									Continue Exam
								</button>
								<button
									onClick={handleConfirmCancel}
									className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
								>
									Yes, Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</>
		);
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-center">
				{/* Control buttons at the top */}
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
					<button
						onClick={handlePauseResume}
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
					>
						{isPaused ? (
							<>
								<svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
								</svg>
								Resume
							</>
						) : (
							<>
								<svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
								</svg>
								Pause
							</>
						)}
					</button>
					<button
						onClick={handleCancelClick}
						className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
					>
						<svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
						Cancel
					</button>
				</div>

				{/* Progress indicator */}
				<div className="mb-6 mt-20">
					<div className="flex flex-col justify-between text-sm text-gray-600 mb-2 min-w-40">
						<span>
							Word {currentWordIndex + 1} of {words.length}
						</span>
						<span>
							{Math.round(((currentWordIndex + 1) / words.length) * 100)}%
							Complete
						</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div
							className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
							style={{
								width: `${((currentWordIndex + 1) / words.length) * 100}%`,
							}}
						/>
					</div>
				</div>

				{/* Timer display */}
				<div className="mb-8">
					<div className="text-6xl font-mono font-bold text-gray-400 mb-2">
						{timeLeft}
					</div>
				</div>

				{/* Current word display */}
				<div className="mb-8">
					<h1 className="text-6xl font-bold text-gray-800 mb-4">
						{words[currentWordIndex]?.toUpperCase() || ""}
					</h1>
				</div>
			</div>

			{/* Cancel Confirmation Modal */}
			{showCancelModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
						<div className="text-center mb-6">
							<svg className="w-16 h-16 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
							<h3 className="text-xl font-bold text-gray-800 mb-2">Cancel Exam?</h3>
							<p className="text-gray-600">
								Are you sure you want to cancel the exam? All progress will be lost and you&apos;ll return to the home screen.
							</p>
						</div>
						<div className="flex justify-center space-x-4">
							<button
								onClick={handleDismissModal}
								className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors"
							>
								Continue Exam
							</button>
							<button
								onClick={handleConfirmCancel}
								className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
							>
								Yes, Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
