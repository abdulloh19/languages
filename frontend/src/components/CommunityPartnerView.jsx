import React, { useState, useEffect } from 'react';
import { Users, Bell, Flame, Award, CheckCircle2, XCircle, Sparkles, UserPlus, ShieldCheck } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function CommunityPartnerView() {
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nudgeSent, setNudgeSent] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    fetch('/api/partner/me?userId=1')
      .then(res => {
        if (res.status === 200) return res.json();
        return null;
      })
      .then(data => {
        setPartner(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSendNudge = () => {
    speechService.playTapSound();
    fetch('/api/partner/nudge?userId=1', { method: 'POST' })
      .then(r => r.json())
      .then(data => {
        setNudgeSent(true);
        setToastMsg(data.message || "Sherigingizga eslatma yuborildi!");
        setTimeout(() => setToastMsg(null), 3500);
      })
      .catch(() => {});
  };

  const handleMatchPartner = () => {
    speechService.playTapSound();
    setLoading(true);
    fetch('/api/partner/match?userId=1', { method: 'POST' })
      .then(r => r.json())
      .then(data => {
        setPartner(data);
        setLoading(false);
        speechService.playSuccessSound?.();
        setToastMsg("Yangi o'quv sherigi muvaffaqiyatli biriktirildi! 🎉");
        setTimeout(() => setToastMsg(null), 3500);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-top duration-300">
          <ShieldCheck className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Intro Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-900/40 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Study Partner (O'quv Sherigi)
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
            Yolg'iz o'rgangandan ko'ra, sherik bilan o'rganish motivatsiyani 3 barobar oshiradi!
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-2 text-slate-500">
          <div className="w-7 h-7 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs">Sherik ma'lumotlari yuklanmoqda...</span>
        </div>
      ) : partner ? (
        /* Active Partner Card */
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                {partner.partnerName?.charAt(0) || 'S'}
              </div>
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  {partner.partnerName}
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                    {partner.partnerLevel || 'Starter'}
                  </span>
                </h3>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Hozir faol
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-black text-xs">
              <Flame className="w-4 h-4 fill-orange-400 text-orange-500 animate-bounce" />
              <span>{partner.streakDays} kun</span>
            </div>
          </div>

          {/* Today's Checklist Status of Partner */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-300">Sherigingizning bugungi rejasi</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {partner.isChecklistDoneToday
                  ? "Barcha kunlik vazifalarni a'lo darajada bajardi!"
                  : "Bugungi barcha vazifalarni hali yakunlamadi"}
              </div>
            </div>
            <div className="text-right">
              {partner.isChecklistDoneToday ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Bajarildi
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  Jarayonda
                </span>
              )}
            </div>
          </div>

          {/* Nudge / Poke Button */}
          <button
            onClick={handleSendNudge}
            disabled={nudgeSent}
            className={`w-full py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition shadow-lg ${
              nudgeSent
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-400 hover:to-purple-500 shadow-indigo-500/20'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>{nudgeSent ? "Eslatma yuborildi (Kutish rejimi)" : "Sherikni turtib qo'yish (Poke / Nudge)"}</span>
          </button>
        </div>
      ) : (
        /* No Partner State */
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <UserPlus className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">Sizda hali o'quv sherigi yo'q</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
              Tizim sizning darajangizdagi boshqa faol til o'rganuvchi bilan sizni biriktiradi.
            </p>
          </div>
          <button
            onClick={handleMatchPartner}
            className="px-6 py-3 rounded-xl font-black text-xs bg-indigo-500 text-white hover:bg-indigo-400 transition shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>O'quv sherigi topish</span>
          </button>
        </div>
      )}

      {/* Rules & Motivation */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-400 flex flex-col gap-2">
        <div className="font-bold text-slate-300 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          Sheriklik qoidalari:
        </div>
        <p>1. Har kuni kamida 1 marta ilovaga kiring va o'z streak zanjiringizni saqlang.</p>
        <p>2. Sherigingiz bugungi mashqlarni unutib qo'ysa, unga "Turtib qo'yish" orqali eslatma yuboring.</p>
        <p>3. Haftalik ikkalangiz birgalikda 100% bajarsangiz, qo'shimcha +100 bonus XP olasiz!</p>
      </div>
    </div>
  );
}
