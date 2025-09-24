# WAT - Word Association Test

A modern web-based implementation of the Word Association Test (WAT) built with Next.js, TypeScript, and Tailwind CSS.

## Overview

The Word Association Test is a psychological assessment tool designed to explore subconscious thoughts and associations. This implementation provides a professional, timed interface for conducting the test.

## Features

- **Professional Interface**: Clean, modern design with responsive layout
- **Comprehensive Word Pool**: 200+ carefully selected words across various categories
- **Precise Timing**: 10-second countdown, 10 seconds per word, with visual timer indicators
- **Audio Cues**: Chime sounds for word transitions and test completion
- **Page Break Management**: Automatic breaks after the 20th and 60th words
- **Progress Tracking**: Visual progress indicators and word counters
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How It Works

1. **Preparation**: 10-second countdown to get ready
2. **Word Presentation**: 80 words displayed one at a time for 10 seconds each
3. **Page Breaks**: 5-second intervals after the 20th and 60th words
4. **Audio Feedback**: Chime sounds for transitions and completion
5. **Completion**: Return to home screen when finished

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd wat-tool
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Web Audio API**: Cross-browser audio support

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Main application page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── CountdownTimer.tsx   # Preparation countdown
│   └── ExamInterface.tsx    # Main test interface
├── data/               # Data and configuration
│   └── wordPool.ts     # Word pool and selection logic
└── utils/              # Utility functions
    └── audioManager.ts # Audio handling utilities
```

## Usage Instructions

### For Test Administrators

1. Ensure you have pen and paper ready before starting
2. Click "Start Exam" to begin the 10-second preparation countdown
3. When the test begins, listen for the chime and read each word aloud if desired
4. Monitor the progress indicators to track test completion
5. The test will automatically conclude after all 80 words

### For Test Takers

1. Have pen and paper ready
2. For each word presented, write the first word that comes to mind
3. Don't overthink - respond with your immediate association
4. Continue until you hear the completion chime sequence

## Customization

### Modifying the Word Pool

Edit `src/data/wordPool.ts` to:
- Add or remove words from the WORD_POOL array
- Change the number of words selected (currently 80)
- Modify word categories or themes

### Adjusting Timing

In `src/components/ExamInterface.tsx`:
- Word display duration: Modify the initial `setTimeLeft(10)` value
- Page break duration: Modify `setPageBreakTimeLeft(5)` value
- Preparation countdown: Modify `seconds={10}` in the CountdownTimer

### Customizing Audio

Edit `src/utils/audioManager.ts` to:
- Change chime frequencies and tones
- Modify audio durations and volumes
- Add new sound types or patterns

## Browser Compatibility

- Modern browsers with Web Audio API support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Contributing

1. Follow TypeScript best practices
2. Maintain responsive design principles
3. Test audio functionality across browsers
4. Ensure accessibility compliance

## License

This project is for educational and research purposes. Please ensure compliance with relevant psychological testing guidelines and ethics when using for professional assessment.

## Support

For technical issues or questions about implementation, please refer to the Next.js documentation or create an issue in the project repository.
