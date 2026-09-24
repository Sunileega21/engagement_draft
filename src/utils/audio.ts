/**
 * Royalty-free procedural ambient music generator using Web Audio API
 * Produces serene, meditative Indian classical raga notes (Bansuri / Santoor tone)
 * Never fails to load, zero external network dependency, ultra lightweight.
 */

class WeddingAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private masterGain: GainNode | null = null;

  // Indian classical peaceful pentatonic scale (Raga Bhupali / Mohanam)
  // C4, D4, E4, G4, A4, C5, D5, E5, G5
  private notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];
  private melodyIndex = 0;
  private melodyPattern = [0, 2, 3, 4, 3, 2, 4, 5, 4, 3, 2, 1, 0, 3, 4, 5, 7, 5, 4, 3, 2, 0];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  private playTone(freq: number, duration: number, isDrone: boolean = false) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Warm bamboo flute / tanpura harmonic combination
      osc.type = isDrone ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for soft organic warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isDrone ? 400 : 1200, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      if (isDrone) {
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      } else {
        // Soft pluck & lingering resonance
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      }

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Audio note play error', e);
    }
  }

  public play() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Start ambient continuous root drone (Tanpura Sa-Pa tone)
    const playTanpuraDrone = () => {
      if (!this.isPlaying) return;
      this.playTone(130.81, 7.5, true); // Low C (Sa)
      this.playTone(196.00, 7.5, true); // Low G (Pa)
    };
    playTanpuraDrone();
    const droneInterval = setInterval(() => {
      if (!this.isPlaying) {
        clearInterval(droneInterval);
        return;
      }
      playTanpuraDrone();
    }, 6000);

    // Play serene melody sequence
    const stepMelody = () => {
      if (!this.isPlaying) return;
      const noteIdx = this.melodyPattern[this.melodyIndex % this.melodyPattern.length];
      const freq = this.notes[noteIdx];
      this.playTone(freq, 2.2);

      this.melodyIndex++;
      const nextDelay = 750 + Math.random() * 600;
      this.timerId = setTimeout(stepMelody, nextDelay);
    };

    stepMelody();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioManager();
