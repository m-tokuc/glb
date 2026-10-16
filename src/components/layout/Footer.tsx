"use client";

import React from "react";
import { MapPin, Recycle, ShieldCheck } from "lucide-react";
import {
  APP_NAME,
  CAMPUS_BADGE,
  CAMPUS_HANDOVER_POINTS,
  SDG_GOALS,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-100">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-slate-900">
                {APP_NAME}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {CAMPUS_BADGE}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              Abdullah Gül Üniversitesi (AGÜ) öğrencileri için kapalı devre
              sürdürülebilir kampüs pazaryeri ve topluluk ihtiyaç panosu. Kargo
              maliyeti olmadan kampüs içi güvenli elden teslimat.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Sadece @agu.edu.tr kurumsal öğrenci hesaplarına açıktır.</span>
            </div>
          </div>

          {/* Standardized Campus Handover Points */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Standart Sümer Kampüsü Teslim Noktaları</span>
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
              {CAMPUS_HANDOVER_POINTS.map((pt) => (
                <div key={pt.id} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{pt.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SDG Goals */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Sürdürülebilir Kalkınma Amaçları
            </h4>
            <div className="space-y-2">
              {SDG_GOALS.map((sdg) => (
                <div
                  key={sdg.code}
                  className={`p-2.5 rounded-xl border text-xs ${sdg.lightColor}`}
                >
                  <strong>{sdg.code}:</strong> {sdg.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <span>
            © 2026 {APP_NAME} — Abdullah Gül Üniversitesi (AGÜ) Sürdürülebilir Kampüs Projesi
          </span>
          <span>SDG 4 (Quality Education) & SDG 12 (Responsible Consumption)</span>
        </div>
      </div>
    </footer>
  );
}
