import React, { useState, useEffect } from 'react';
import { X, Send, Brain, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NudgeModal({ user, onClose, onNudgeSent }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/dashboard/nudge-preview/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setPreview(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load nudge preview', err);
        setLoading(false);
      });
  }, [user]);

  const handleSendNudge = async () => {
    setSending(true);
    try {
      const res = await fetch(`/api/dashboard/nudge/${user.id}`, { method: 'POST' });
      if (res.ok) {
        setSentSuccess(true);
        if (onNudgeSent) onNudgeSent(user.id);
        setTimeout(() => {
          onClose();
        }, 1800);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  if (!user) return null;

  const triggerLabel = {
    LOSS_AVERSION: 'Loss Aversion (Fogg / Cialdini)',
    CURIOSITY_GAP: 'Curiosity Gap (Psychological Open Loop)',
    COMMITMENT: 'Commitment & Consistency',
    SOCIAL_PROOF: 'Social Proof & Norms'
  }[preview?.triggerType] || 'Behavioral Re-engagement Trigger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl glass-panel border border-sky-500/30 p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Daily Psychological Re-engagement Push</h3>
            <p className="text-xs text-slate-400">
              Dispatched daily at 09:00 local time or manually triggered by administrator.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium">Assembling psychological nudge parameters...</span>
          </div>
        ) : sentSuccess ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Psychological Push Successfully Sent!</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Delivered re-engagement payload to <strong>@{user.username}</strong> with exact resume word <strong>"{preview?.resumeWord}"</strong>.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Target Learner Meta */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Target Learner:</span>{' '}
                <strong className="text-white">{user.firstName} (@{user.username})</strong>
              </div>
              <div>
                <span className="text-slate-400">Days Inactive:</span>{' '}
                <strong className="text-rose-400">{user.daysInactive} days</strong>
              </div>
              <div>
                <span className="text-slate-400">Resume Word:</span>{' '}
                <strong className="text-sky-400">{preview?.resumeWord}</strong>
              </div>
            </div>

            {/* Psychological Trigger Badge */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Trigger Applied:</span>
              <span className="px-2.5 py-0.5 rounded-full font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {triggerLabel}
              </span>
            </div>

            {/* Russian Template Preview */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span>🇷🇺 Russian Re-engagement Copy</span>
              </label>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                {preview?.messageRu}
              </div>
            </div>

            {/* English Template Preview */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span>🇬🇧 English Re-engagement Copy</span>
              </label>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                {preview?.messageEn}
              </div>
            </div>

            {/* Call to Action Button Preview */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] text-slate-500">
                Action Button: <span className="text-slate-300 font-mono">[ 🌅 Come Back / Вернуться ]</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={sending}
                  onClick={handleSendNudge}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 shadow-lg shadow-rose-600/20 transition flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {sending ? 'Dispatching...' : 'Dispatch Nudge Now'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
