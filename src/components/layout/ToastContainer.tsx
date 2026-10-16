"use client";

import React from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto p-4 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            {t.type === "info" ? (
              <Info className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white">{t.title}</div>
            {t.description && (
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                {t.description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
