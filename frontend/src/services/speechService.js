/**
 * Audio & Voice Pronunciation Service
 * Uses Web Speech API (window.speechSynthesis) for authentic, zero-latency, natural human pronunciation.
 * Seamlessly falls back to backend Google HD TTS MP3 streaming if speech synthesis is unavailable.
 */

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
    this.currentAudio = null;
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  getBestVoice(langCode) {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }
    if (langCode.startsWith('en')) {
      return this.voices.find(v => v.lang.startsWith('en-US') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David')))
        || this.voices.find(v => v.lang.startsWith('en'));
    }
    if (langCode.startsWith('ru')) {
      return this.voices.find(v => v.lang.startsWith('ru') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Milena') || v.name.includes('Pavel')))
        || this.voices.find(v => v.lang.startsWith('ru'));
    }
    return null;
  }

  /**
   * Pronounce text with natural human voice.
   * @param {string} text - Word or phrase to speak
   * @param {string} lang - 'EN' | 'RU' | 'UZ'
   * @param {function} onEnd - Callback when speech ends
   */
  speak(text, lang = 'EN', onEnd = null) {
    if (!text) return;
    const cleanText = text.replace(/[#[\]{}()\"']/g, '').trim();

    // 1. Try native Web Speech API (Natural human voice)
    if (this.synth && (lang.toUpperCase() === 'EN' || lang.toUpperCase() === 'RU')) {
      try {
        this.synth.cancel(); // Stop any pending utterances
        const langCode = lang.toUpperCase() === 'RU' ? 'ru-RU' : 'en-US';
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = langCode;
        utterance.rate = 0.92; // Clear learning pace
        utterance.pitch = 1.0;

        const bestVoice = this.getBestVoice(langCode);
        if (bestVoice) {
          utterance.voice = bestVoice;
        }

        if (onEnd) {
          utterance.onend = onEnd;
          utterance.onerror = () => {
            if (onEnd) onEnd();
          };
        }

        this.synth.speak(utterance);
        return;
      } catch (e) {
        console.warn('SpeechSynthesis error, falling back to server TTS:', e);
      }
    }

    // 2. Fallback to Server Google HD TTS MP3 streaming
    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }
      const audioUrl = `/api/tts/synthesize?text=${encodeURIComponent(cleanText)}&lang=${lang.toUpperCase()}`;
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;
      if (onEnd) {
        audio.onended = () => {
          this.currentAudio = null;
          onEnd();
        };
        audio.onerror = () => {
          this.currentAudio = null;
          onEnd();
        };
      }
      audio.play().catch(err => {
        console.warn('Audio play error:', err);
        if (onEnd) onEnd();
      });
    } catch (err) {
      console.warn('Audio streaming failed:', err);
      if (onEnd) onEnd();
    }
  }

  /**
   * Pleasant harmonic tap feedback (not harsh oscillator beeps)
   */
  playTapSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playSuccessSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0.04, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.25);
      });
    } catch (e) {}
  }
}

export const speechService = new SpeechService();
