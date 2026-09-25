/**
 * Catholic Sacred Christmas Soundscape & Procedural Audio Synthesizer
 * Uses Web Audio API to produce warm, cathedral-like celesta bells,
 * gentle chime harmonics, and peaceful chords of "Silent Night".
 */

class SacredSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.masterGain = null;
    this.currentNoteIndex = 0;
    this.melodyTimer = null;
    
    // Silent Night melody notes (frequencies in Hz)
    // 3/4 time signature: Sol, La, Sol, Mi...
    this.silentNight = [
      { f: 392.00, d: 1.4 }, // G4
      { f: 440.00, d: 0.5 }, // A4
      { f: 392.00, d: 1.0 }, // G4
      { f: 329.63, d: 2.2 }, // E4

      { f: 392.00, d: 1.4 }, // G4
      { f: 440.00, d: 0.5 }, // A4
      { f: 392.00, d: 1.0 }, // G4
      { f: 329.63, d: 2.2 }, // E4

      { f: 587.33, d: 1.8 }, // D5
      { f: 587.33, d: 1.0 }, // D5
      { f: 493.88, d: 2.2 }, // B4

      { f: 523.25, d: 1.8 }, // C5
      { f: 523.25, d: 1.0 }, // C5
      { f: 392.00, d: 2.2 }, // G4

      { f: 440.00, d: 1.4 }, // A4
      { f: 440.00, d: 0.5 }, // A4
      { f: 523.25, d: 1.0 }, // C5
      { f: 493.88, d: 0.8 }, // B4
      { f: 440.00, d: 0.6 }, // A4
      { f: 392.00, d: 1.5 }, // G4
      { f: 440.00, d: 0.5 }, // A4
      { f: 392.00, d: 1.0 }, // G4
      { f: 329.63, d: 2.2 }, // E4

      { f: 587.33, d: 1.5 }, // D5
      { f: 587.33, d: 0.8 }, // D5
      { f: 698.46, d: 1.0 }, // F5
      { f: 587.33, d: 0.8 }, // D5
      { f: 493.88, d: 2.0 }, // B4
      { f: 523.25, d: 2.8 }, // C5
      { f: 659.25, d: 2.8 }, // E5
      { f: 523.25, d: 1.5 }, // C5
      { f: 392.00, d: 1.0 }, // G4
      { f: 329.63, d: 2.5 }, // E4
      { f: 392.00, d: 1.0 }, // G4
      { f: 349.23, d: 1.0 }, // F4
      { f: 293.66, d: 1.5 }, // D4
      { f: 261.63, d: 3.5 }, // C4 (Sleep in heavenly peace)
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMusic() {
    this.init();
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    if (!this.ctx) this.init();
    this.isPlaying = true;
    this.currentNoteIndex = 0;
    this.scheduleNextNote();
    this.updateUI();
  }

  stop() {
    this.isPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    this.updateUI();
  }

  // Play a soft sacred bell tone
  playBellTone(freq, duration = 2.0, volume = 0.2) {
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    
    // Fundamental oscillator (sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);

    // Overtone oscillator (celesta shimmer)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, t); // Bell harmonic

    const gain1 = this.ctx.createGain();
    gain1.gain.setValueAtTime(0, t);
    gain1.gain.linearRampToValueAtTime(volume, t + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0, t);
    gain2.gain.linearRampToValueAtTime(volume * 0.35, t + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + duration * 0.5);

    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, t);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + duration);
    osc2.stop(t + duration);
  }

  scheduleNextNote() {
    if (!this.isPlaying) return;

    const note = this.silentNight[this.currentNoteIndex];
    this.playBellTone(note.f, note.d * 1.5, 0.15);

    // Occasionally add a soft drone in the bass on root notes
    if (this.currentNoteIndex % 4 === 0) {
      this.playBellTone(note.f / 2, 3.5, 0.08);
    }

    const durationMs = note.d * 750; // Gentle tempo ~50 bpm

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.silentNight.length;
    this.melodyTimer = setTimeout(() => {
      this.scheduleNextNote();
    }, durationMs);
  }

  // Interactive UI Sound Effects
  playChime(type = 'candle') {
    this.init();
    if (this.isMuted) return;
    const t = this.ctx.currentTime;

    const chords = {
      candle: [523.25, 659.25, 783.99, 1046.50], // C major arpeggio
      step: [440.0, 554.37, 659.25, 880.0],      // A major celestial
      prayer: [392.0, 493.88, 587.33, 783.99],   // G major divine
      blessing: [349.23, 440.0, 523.25, 698.46, 880.0] // F major adoration
    };

    const notes = chords[type] || chords.candle;
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playBellTone(freq, 2.5, 0.18);
      }, idx * 90);
    });
  }

  playGrandGloria() {
    this.init();
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C
      [349.23, 440.00, 523.25, 698.46], // F
      [392.00, 493.88, 587.33, 783.99], // G
      [523.25, 659.25, 783.99, 1046.50] // High C
    ];

    chords.forEach((chord, step) => {
      setTimeout(() => {
        chord.forEach(f => this.playBellTone(f, 3.5, 0.2));
      }, step * 600);
    });
  }

  updateUI() {
    const btn = document.getElementById('music-toggle-btn');
    const label = document.getElementById('music-toggle-label');
    const waves = document.getElementById('music-waves');
    
    if (btn) {
      if (this.isPlaying) {
        btn.classList.add('bg-yellow-400', 'text-amber-950', 'border-yellow-200');
        if (label) label.textContent = 'NHẠC ĐANG PHÁT';
        if (waves) waves.classList.remove('hidden');
      } else {
        btn.classList.remove('bg-yellow-400', 'text-amber-950', 'border-yellow-200');
        if (label) label.textContent = 'BẬT NHẠC THÁNH CA';
        if (waves) waves.classList.add('hidden');
      }
    }
  }
}

window.sacredAudio = new SacredSoundscape();
