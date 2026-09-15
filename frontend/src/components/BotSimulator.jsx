import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Volume2, RotateCcw, Sparkles, UserCheck, MessageSquare, Play, X } from 'lucide-react';

import { speechService } from '../services/speechService';

export default function BotSimulator({ activeUser, allUsers, onUserChange, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentButtons, setCurrentButtons] = useState([]);
  const chatBottomRef = useRef(null);
  const audioPlayerRef = useRef(null);

  // Initialize bot conversation
  useEffect(() => {
    if (!activeUser) return;
    setMessages([]);
    sendAction('/menu');
  }, [activeUser?.id]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendAction = async (actionText) => {
    if (!activeUser) return;
    setLoading(true);

    // Add user message to transcript (unless it's an internal init)
    if (actionText !== '/menu' || messages.length > 0) {
      setMessages(prev => [...prev, { sender: 'user', text: actionText }]);
    }

    try {
      const res = await fetch(
        `/api/bot/simulate?telegramId=${activeUser.telegramId || 100001}&action=${encodeURIComponent(actionText)}`,
        { method: 'POST' }
      );
      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          html: data.replyText,
          audioUrl: data.audioUrl,
          stage: data.currentStage
        }
      ]);
      setCurrentButtons(data.inlineButtons || []);

      // Auto-play audio if card has audioUrl and action was next word or audio
      if (data.audioUrl && (actionText.includes('Audio') || actionText.includes('Слушать') || actionText === 'NEXT_WORD')) {
        playAudio(data.audioUrl);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error contacting bot service.' }]);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (url) => {
    if (!url) return;
    try {
      // If URL has text and lang params, try speechService first for crystal clear quality
      const parsedUrl = new URL(url, window.location.origin);
      const text = parsedUrl.searchParams.get('text');
      const lang = parsedUrl.searchParams.get('lang');
      if (text) {
        speechService.speak(text, lang || 'EN');
        return;
      }
    } catch (e) {}

    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = url;
      audioPlayerRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
    }
  };

  const handleCustomSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;
    const msg = inputVal.trim();
    setInputVal('');
    sendAction(msg);
  };

  return (
    <div className="rounded-2xl glass-panel border border-sky-500/30 shadow-2xl overflow-hidden flex flex-col h-[750px] relative">
      {/* Hidden Audio Player for Pronunciation */}
      <audio ref={audioPlayerRef} preload="auto" />

      {/* Simulator Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm">Telegram Bot Interactive Simulator</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-xs text-slate-400">
              Live testing 12 Super Menu sections, 20-word flow & audio
            </div>
          </div>
        </div>

        {/* User Picker Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Simulating as:</label>
          <select
            value={activeUser?.id || ''}
            onChange={(e) => {
              const u = allUsers.find(x => x.id === parseInt(e.target.value));
              if (u && onUserChange) onUserChange(u);
            }}
            className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
          >
            {allUsers.map(u => (
              <option key={u.id} value={u.id}>
                {u.firstName} (@{u.username}) - {u.status}
              </option>
            ))}
          </select>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Transcript */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
              }`}
            >
              {msg.sender === 'bot' ? (
                <div>
                  <div
                    dangerouslySetInnerHTML={{ __html: msg.html || msg.text }}
                    className="space-y-2 whitespace-pre-wrap"
                  />
                  {msg.audioUrl && (
                    <button
                      onClick={() => playAudio(msg.audioUrl)}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 flex items-center gap-1.5 text-xs font-semibold transition"
                    >
                      <Volume2 className="w-4 h-4" /> Listen Audio Pronunciation
                    </button>
                  )}
                </div>
              ) : (
                <div>{msg.text}</div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-bl-none p-3 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-slate-500 ml-1">Bot is typing...</span>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Interactive Telegram Inline Buttons Pad */}
      {currentButtons.length > 0 && (
        <div className="p-3 bg-slate-900/80 border-t border-slate-800 space-y-2 max-h-48 overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1">
            Tap Inline Telegram Buttons:
          </div>
          <div className="space-y-1.5">
            {currentButtons.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-2">
                {row.map((btnLabel, btnIdx) => (
                  <button
                    key={btnIdx}
                    disabled={loading}
                    onClick={() => sendAction(btnLabel)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-sky-600/30 hover:border-sky-500 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition shadow-sm truncate disabled:opacity-50"
                  >
                    {btnLabel}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Text Input Bar */}
      <form onSubmit={handleCustomSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Send command (e.g. /menu, /resume, /learn, 🎯 Continue)..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
        />
        <button
          type="submit"
          disabled={loading || !inputVal.trim()}
          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" /> Send
        </button>
      </form>
    </div>
  );
}
