"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Recycle,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import {
  ALLOWED_EMAIL_DOMAIN,
  AGU_EMAIL_REGEX,
  APP_NAME,
  CAMPUS_BADGE,
  SDG_GOALS,
} from "@/lib/constants";
import { useApp } from "@/context/AppContext";

export function AuthScreen() {
  const { loginWithAguEmail, registerWithAguEmail, loginAsDemoUser } = useApp();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const trimmedEmail = email.trim();
  const isValidAguEmail = AGU_EMAIL_REGEX.test(trimmedEmail);

  const handleAutoAppendDomain = () => {
    if (!trimmedEmail) {
      setEmail("ogrenci.adi@agu.edu.tr");
      return;
    }
    const base = trimmedEmail.split("@")[0];
    setEmail(`${base}@agu.edu.tr`);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!AGU_EMAIL_REGEX.test(trimmedEmail)) {
      setError(
        `Lütfen geçerli bir ${ALLOWED_EMAIL_DOMAIN} e-posta adresi girin (Örn: ad.soyad@agu.edu.tr).`
      );
      return;
    }

    if (password.length < 6) {
      setError("Şifreniz en az 6 karakter olmalıdır.");
      return;
    }

    if (mode === "login") {
      const res = loginWithAguEmail(trimmedEmail, password);
      if (!res.ok && res.error) setError(res.error);
    } else {
      const res = registerWithAguEmail(trimmedEmail, password);
      if (!res.ok && res.error) setError(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:grid lg:grid-cols-12">
      {/* LEFT SIDE: VISUAL & VALUE PROPOSITION ABOUT CAMPUS SUSTAINABILITY */}
      <div className="lg:col-span-7 bg-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative background gradient circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/25">
              <Recycle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">
                  {APP_NAME}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {CAMPUS_BADGE}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Abdullah Gül Üniversitesi Kampüs İçi Paylaşım Platformu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sadece @agu.edu.tr Öğrencilerine Özel
            </span>
          </div>
        </div>

        {/* Center Hero Value Proposition */}
        <div className="relative z-10 my-10 lg:my-0 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6">
            <Leaf className="w-3.5 h-3.5" />
            <span>Sürdürülebilir Kampüs Ekonomisi • Kargosuz Elden Teslim</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white mb-6">
            Dönemlik eşyalarını çöpe değil,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              kampüs arkadaşına
            </span>{" "}
            devret.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            <strong>{APP_NAME}</strong>; laboratuvar önlüğünden bilimsel hesap
            makinesine, Calculus kitaplarından Arduino proje setlerine kadar
            tüm akademik ihtiyaçlarını Sümer Kampüsü içinde güvenle alıp
            satabileceğin, ücretsiz paylaşabileceğin veya ödünç bulabileceğin
            kapalı devre öğrenci pazaryeridir.
          </p>

          {/* SDG Alignment Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {SDG_GOALS.map((sdg) => (
              <div
                key={sdg.code}
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-sm hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${sdg.color}`}
                  >
                    {sdg.code}
                  </span>
                  <h3 className="font-semibold text-sm text-white">
                    {sdg.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sdg.description}
                </p>
              </div>
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Vitrin & Bağış</div>
                <div className="text-xs text-slate-400">
                  Sat veya Ücretsiz Paylaş
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">İhtiyaç Panosu</div>
                <div className="text-xs text-slate-400">
                  Acil Lab & Ders Malzemesi Bul
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Sümer Kampüsü</div>
                <div className="text-xs text-slate-400">
                  Kütüphane & Çelik Kafe Teslim
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Stats */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pt-6 border-t border-slate-800/80">
          <span>© 2026 {APP_NAME} • Abdullah Gül Üniversitesi Öğrenci Girişimi</span>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-medium">
              ⚡ Sıfır Kargo Maliyeti
            </span>
            <span>•</span>
            <span>🌱 %100 Kampüs İçi Döngüsel Ekonomi</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: AUTH FORM WITH TAB SWITCHER */}
      <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>AGÜ Öğrenci Doğrulama Sistemi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {mode === "login"
                ? `${APP_NAME}'e Giriş Yap`
                : "Yeni Kampüs Hesabı Oluştur"}
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">
              {mode === "login"
                ? "Kurumsal @agu.edu.tr öğrenci e-postanla vitrine ve ihtiyaç panosuna eriş."
                : "E-posta onay linki beklemeden @agu.edu.tr adresinle saniyeler içinde kayıt ol."}
            </p>
          </div>

          {/* Tab Switcher: Giriş Yap / Kayıt Ol */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError(null);
              }}
              className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
                mode === "register"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Kayıt Ol
            </button>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="agu-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  AGÜ Öğrenci E-Postası
                </label>
                {trimmedEmail.length > 0 && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                      isValidAguEmail ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {isValidAguEmail ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        @agu.edu.tr doğrulandı
                      </>
                    ) : (
                      "@agu.edu.tr uzantısı gerekli"
                    )}
                  </span>
                )}
              </div>

              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="agu-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="ad.soyad@agu.edu.tr"
                  className="w-full pl-10 pr-32 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all"
                />
                {!isValidAguEmail && (
                  <button
                    type="button"
                    onClick={handleAutoAppendDomain}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                  >
                    + @agu.edu.tr
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Kural: Sadece <strong>@agu.edu.tr</strong> uzantılı e-postalar kabul edilir. E-posta doğrulama linki beklenmez.
              </p>
            </div>

            <div>
              <label
                htmlFor="agu-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Şifre (En az 6 karakter)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="agu-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>
                {mode === "login"
                  ? "Kampüse Giriş Yap"
                  : "Kayıt Ol ve Profilini Oluştur"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Fast Demo Access Box for Live Presentation */}
          <div className="pt-5 border-t border-slate-200">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Jüri / Canlı Demo Hızlı Giriş Seçenekleri
                </span>
                <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Tek Tıkla Dene
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dolu bir öğrenci profiliyle (gelen teklifler, rezerveler ve mesajlarla) hemen incelemek veya yeni kayıt akışını test etmek için seçin:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginAsDemoUser("user-caner")}
                  className="p-2.5 rounded-xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 text-left transition-all group cursor-pointer"
                >
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                    Caner Yılmaz
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    Bilgisayar Müh. (Teklif & Mesaj Dolu)
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setEmail("yeni.ogrenci@agu.edu.tr");
                    setPassword("agu123456");
                    registerWithAguEmail("yeni.ogrenci@agu.edu.tr", "agu123456");
                  }}
                  className="p-2.5 rounded-xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 text-left transition-all group cursor-pointer"
                >
                  <div className="text-xs font-bold text-emerald-700">
                    ✨ Yeni Kayıt & Onboarding
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    İlk Profil Kurulum Modalını Aç
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
