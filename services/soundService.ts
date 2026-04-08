
class SoundService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // We delay context creation until user interaction to satisfy browser policies
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.ctx;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ctx) {
      this.ctx.suspend();
    } else if (!muted && this.ctx) {
      this.ctx.resume();
    }
  }

  public getMuteStatus() {
    return this.isMuted;
  }

  public async init() {
    if (!this.ctx) {
      this.getContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  // UI Interaction Click (High Blip)
  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }

  // Wheel Tick (Woody/Percussive)
  public playTick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Triangle wave gives a hollower, wood-block sound
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }

  // Success Chime (Major Chord)
  public playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99]; // C Major (C5, E5, G5)
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.value = freq;

      const now = ctx.currentTime;
      const stagger = i * 0.05; // Slight arpeggio effect

      gain.gain.setValueAtTime(0, now + stagger);
      gain.gain.linearRampToValueAtTime(0.1, now + stagger + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + stagger + 1.5);

      osc.start(now + stagger);
      osc.stop(now + stagger + 1.5);
    });
  }
}

export const soundService = new SoundService();
