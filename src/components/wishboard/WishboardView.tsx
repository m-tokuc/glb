"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  HandHeart,
  MapPin,
  MessageSquarePlus,
  Pin,
  Plus,
  Sparkles,
  Wallet,
} from "lucide-react";
import { CATEGORIES, NEED_URGENCY_CONFIG } from "@/lib/constants";
import { NeedPost, NeedUrgency, ProductCategory } from "@/types";
import { useApp } from "@/context/AppContext";
import { getCategoryShortLabel, getInitials } from "@/lib/utils";

export function WishboardView() {
  const {
    needPosts,
    searchQuery,
    setSelectedNeedPost,
    openAddListingModal,
  } = useApp();

  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>("all");
  const [selectedUrgency, setSelectedUrgency] = useState<NeedUrgency | "all">(
    "all"
  );

  const filteredNeeds = useMemo(() => {
    let list = [...needPosts];

    if (selectedCategory !== "all") {
      list = list.filter((n) => n.category === selectedCategory);
    }

    if (selectedUrgency !== "all") {
      list = list.filter((n) => n.urgency === selectedUrgency);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.requesterName.toLowerCase().includes(q) ||
          n.requesterDepartment.toLowerCase().includes(q) ||
          (n.courseCode && n.courseCode.toLowerCase().includes(q))
      );
    }

    return list;
  }, [needPosts, selectedCategory, selectedUrgency, searchQuery]);

  const urgentCount = needPosts.filter(
    (n) => n.urgency === "urgent_lab" && n.status === "open"
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Hero Banner for Wishboard */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white p-6 sm:p-8 shadow-sm border border-emerald-900/50 relative overflow-hidden">
        <div className="absolute -right-10 -top-16 w-72 h-72 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Pin className="w-3.5 h-3.5" />
                <span>AGU Topluluk İhtiyaç Panosu (Wishboard)</span>
              </span>
              {urgentCount > 0 && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/25 text-rose-200 border border-rose-400/30">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  <span>{urgentCount} Acil Yarın Lab İhtiyacı</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Aradığın Ürünü Yaz, Kampüs Arkadaşın Yardıma Gelsin!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Vitrinde bulamadığın ders kitabı, laboratuvar önlüğü, multimetre veya yurt eşyası için ilan aç; elinde olan AGÜ öğrencileri{" "}
              <strong className="text-emerald-300">
                &ldquo;Bende Bu Ürün Var&rdquo;
              </strong>{" "}
              butonuyla sana doğrudan mesaj veya ilan bağlantısı göndersin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openAddListingModal("need")}
              className="px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>+ Yeni İhtiyaç İlanı Aç</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {cat.shortLabel}
            </button>
          ))}
        </div>

        {/* Urgency Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">
            Aciliyet:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedUrgency("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                selectedUrgency === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Tümü
            </button>
            <button
              type="button"
              onClick={() => setSelectedUrgency("urgent_lab")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                selectedUrgency === "urgent_lab"
                  ? "bg-rose-600 text-white"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              🚨 Acil Lab
            </button>
            <button
              type="button"
              onClick={() => setSelectedUrgency("this_week")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                selectedUrgency === "this_week"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              Bu Hafta
            </button>
          </div>
        </div>
      </div>

      {/* Need Posts Grid (2-3 Column Forum/Wishboard Cards) */}
      {filteredNeeds.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Bu filtreye uygun ihtiyaç ilanı bulunamadı
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Aradığın bir ders materyali veya ekipman varsa hemen yeni bir ihtiyaç ilanı açabilirsin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredNeeds.map((need) => (
            <NeedPostCard
              key={need.id}
              need={need}
              onSelect={() => setSelectedNeedPost(need)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NeedPostCard({
  need,
  onSelect,
}: {
  need: NeedPost;
  onSelect: () => void;
}) {
  const urgencyObj = NEED_URGENCY_CONFIG[need.urgency];

  return (
    <div
      onClick={onSelect}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/70 p-5 shadow-2xs hover:shadow-xl hover:shadow-slate-900/5 transition-all flex flex-col justify-between space-y-4 cursor-pointer"
    >
      <div className="space-y-3.5">
        {/* Top Row: Urgency Badge + Category & Course Code */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${urgencyObj.badgeClass}`}
          >
            <span className={`w-2 h-2 rounded-full ${urgencyObj.dotClass}`} />
            {urgencyObj.label}
          </span>

          <div className="flex items-center gap-1.5">
            {need.courseCode && (
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-emerald-400 text-[10px] font-bold">
                {need.courseCode}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold">
              {getCategoryShortLabel(need.category)}
            </span>
          </div>
        </div>

        {/* Requester Profile Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
            {getInitials(need.requesterName)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {need.requesterName}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              {need.requesterDepartment} • {need.createdAt}
            </div>
          </div>
        </div>

        {/* Need Title & Description */}
        <div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-700 leading-snug transition-colors">
            {need.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1.5 line-clamp-3 leading-relaxed">
            {need.description}
          </p>
        </div>
      </div>

      {/* Bottom Footer: Budget Preference, Handover Spot & Primary CTA */}
      <div className="pt-3.5 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bütçe: {need.budgetLabel}</span>
          </div>

          <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{need.handoverPreference}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
        >
          <HandHeart className="w-4 h-4 text-emerald-400 group-hover:text-white" />
          <span>Bende Bu Ürün Var / Mesaj Gönder</span>
          {need.responseCount > 0 && (
            <span className="ml-auto px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
              {need.responseCount} yanıt
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
