"use client";

import React, { useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Upload,
  UserCheck,
  X,
} from "lucide-react";
import { AGU_DEPARTMENTS, APP_NAME } from "@/lib/constants";
import { useApp } from "@/context/AppContext";
import { getInitials } from "@/lib/utils";

export function OnboardingModal() {
  const { currentUser, isOnboardingOpen, completeOnboarding } = useApp();

  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [department, setDepartment] = useState(
    currentUser?.department || AGU_DEPARTMENTS[0]
  );
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    currentUser?.avatarUrl
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOnboardingOpen || !currentUser) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 3) {
      setError("Lütfen adınızı ve soyadınızı eksiksiz girin.");
      return;
    }
    if (!department) {
      setError("Lütfen AGÜ bölümünüzü seçin.");
      return;
    }
    completeOnboarding(fullName, department, avatarUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Adım 2/2 • Kampüs Profil Kurulumu</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            {APP_NAME} Profilini Tamamla 🎓
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            <span className="font-semibold text-emerald-300">
              {currentUser.email}
            </span>{" "}
            adresin doğrulandı. Kampüs arkadaşlarının seni tanıması için bilgilerini tamamla.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Avatar Upload / Fallback Initials Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="relative">
              {avatarUrl ? (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md">
                  <img
                    src={avatarUrl}
                    alt="Profil"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setAvatarUrl(undefined)}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow"
                    title="Fotoğrafı Kaldır"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-2xl flex items-center justify-center shadow-md shadow-emerald-600/20 border-2 border-white">
                  {getInitials(fullName || "AGÜ")}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
                title="Fotoğraf Yükle"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="text-sm font-semibold text-slate-900">
                Profil Fotoğrafı{" "}
                <span className="text-xs font-normal text-slate-400">
                  (İsteğe Bağlı)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 mb-2.5">
                Fotoğraf yüklemezsen baş harflerinden oluşan otomatik AGÜ rozeti kullanılır.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bilgisayardan Fotoğraf Seç</span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="onboard-fullname"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Ad Soyad <span className="text-rose-500">*</span>
            </label>
            <input
              id="onboard-fullname"
              type="text"
              required
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Örn: Caner Yılmaz"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="onboard-department"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Bölüm (Fakülte / Program) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="onboard-department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all"
              >
                {AGU_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Profilimi Kaydet ve Kampüse Başla</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
