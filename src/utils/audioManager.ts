/**
 * Audio utilities for the WAT application
 * Handles all audio functionality including chimes and completion sounds
 */

export class AudioManager {
  private audioContext: AudioContext | null = null;

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext(): void {
    try {
      // Only initialize on client-side
      if (typeof window !== 'undefined') {
        this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
    } catch (error) {
      console.warn('AudioContext not available:', error);
    }
  }

  private async resumeAudioContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Plays a simple chime sound for word transitions
   */
  public async playWordChime(): Promise<void> {
    try {
      if (!this.audioContext) return;
      
      await this.resumeAudioContext();
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Pleasant bell-like tone
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      // Smooth attack and decay
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      
      oscillator.start(now);
      oscillator.stop(now + 0.4);
    } catch (error) {
      console.warn('Error playing word chime:', error);
    }
  }

  /**
   * Plays a completion sound sequence when the test is finished
   */
  public async playCompletionChime(): Promise<void> {
    try {
      if (!this.audioContext) return;
      
      await this.resumeAudioContext();
      
      // Play a pleasant ascending chord progression
      const notes = [
        { freq: 523.25, start: 0, duration: 0.5 },    // C5
        { freq: 659.25, start: 0.2, duration: 0.5 },  // E5
        { freq: 783.99, start: 0.4, duration: 0.7 }   // G5
      ];
      
      notes.forEach((note) => {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext!.destination);
        
        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';
        
        const startTime = this.audioContext!.currentTime + note.start;
        const endTime = startTime + note.duration;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, endTime - 0.1);
        
        oscillator.start(startTime);
        oscillator.stop(endTime);
      });
    } catch (error) {
      console.warn('Error playing completion chime:', error);
    }
  }

  /**
   * Plays a simple notification sound for page breaks
   */
  public async playPageBreakChime(): Promise<void> {
    try {
      if (!this.audioContext) return;
      
      await this.resumeAudioContext();
      
      // Two-tone notification
      const notes = [600, 800];
      
      notes.forEach((frequency, index) => {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext!.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        const startTime = this.audioContext!.currentTime + (index * 0.15);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.2);
      });
    } catch (error) {
      console.warn('Error playing page break chime:', error);
    }
  }

  /**
   * Initialize audio context on user interaction (required by browsers)
   */
  public async initializeOnUserInteraction(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}

// Singleton instance
export const audioManager = new AudioManager();