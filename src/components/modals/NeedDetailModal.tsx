"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Gift,
  HandHeart,
  Link2,
  MapPin,
  Send,
  Sparkles,
  Tag,
  Wallet,
  X,
} from "lucide-react";
import {
  CAMPUS_HANDOVER_POINTS,
  NEED_URGENCY_CONFIG,
} from "@/lib/constants";
import { CampusHandoverPoint } from "@/types";
import { useApp } from "@/context/AppContext";
import {
  formatPrice,
  getCategoryLabel,
  getInitials,
} from "@/lib/utils";

export function NeedDetailModal() {
  const {
    selectedNeedPost,
    setSelectedNeedPost,
    products,
    currentUser,
    sendHaveItemMessage,
  } = useApp();

  const [message, setMessage] = useState(
    "Merhaba! Aradığın ürün bende temiz durumda var, yarın kampüste elden teslim edebilirim."
  );
  const [offerMode, setOfferMode] = useState<
    "link_product" | "custom_price" | "free_share"
  >("free_share");
  const [linkedProductId, setLinkedProductId] = useState<string>("");
  const [proposedPrice, setProposedPrice] = useState<string>("100");
  const [handoverPoint, setHandoverPoint] =
    useState<CampusHandoverPoint>("Çelik Kafe");

  if (!selectedNeedPost) return null;

  const urgencyObj = NEED_URGENCY_CONFIG[selectedNeedPost.urgency];

  // Available marketplace products to link (prioritizing currentUser's products, then all available products)
  const availableProducts = products.filter((p) => p.status !== "sold");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendHaveItemMessage({
      needPostId: selectedNeedPost.id,
      message,
      linkedProductId:
        offerMode === "link_product" && linkedProductId
          ? linkedProductId
          : undefined,
      proposedPrice:
        offerMode === "custom_price"
          ? Number(proposedPrice) || 0
          : offerMode === "free_share"
          ? 0
          : undefined,
      isFreeOffer: offerMode === "free_share",
      handoverPoint,
    });

    setSelectedNeedPost(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${urgencyObj.badgeClass}`}
            >
              <span className={`w-2 h-2 rounded-full ${urgencyObj.dotClass}`} />
              {urgencyObj.label}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              • İhtiyaç Panosu Detayı
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedNeedPost(null)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Detailed Need Request Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-900 text-emerald-400 font-bold text-sm flex items-center justify-center">
                  {getInitials(selectedNeedPost.requesterName)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900">
                      {selectedNeedPost.requesterName}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xs text-slate-500">
                    {selectedNeedPost.requesterDepartment} •{" "}
                    {selectedNeedPost.createdAt}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-extrabold">
                  <Wallet className="w-3.5 h-3.5" />
                  {selectedNeedPost.budgetLabel}
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {getCategoryLabel(selectedNeedPost.category)}
                </span>
                {selectedNeedPost.courseCode && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[10px] font-bold">
                    {selectedNeedPost.courseCode}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {selectedNeedPost.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                {selectedNeedPost.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-200/70">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>
                Tercih Edilen Buluşma Noktası:{" "}
                <strong className="text-slate-900">
                  {selectedNeedPost.handoverPreference}
                </strong>
              </span>
            </div>
          </div>

          {/* STRUCTURED RESPONSE FORM: "BENDE BU ÜRÜN VAR / MESAJ GÖNDER" */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <HandHeart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Bende Bu Ürün Var — Yardımcı Ol & Mesaj Gönder
                </h3>
                <p className="text-xs text-slate-500">
                  İlan sahibine mesaj yaz, mevcut bir vitrin ilanını bağla veya fiyat/ödünç teklifini ilet.
                </p>
              </div>
            </div>

            {/* 3-Option Selector: Ücretsiz/Ödünç vs Fiyat Öner vs Vitrin İlanı Bağla */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setOfferMode("free_share")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  offerMode === "free_share"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Gift className="w-4 h-4 text-emerald-600" />
                  <span>Ücretsiz / Ödünç Ver</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Dayanışma için bedelsiz paylaş
                </p>
              </button>

              <button
                type="button"
                onClick={() => setOfferMode("custom_price")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  offerMode === "custom_price"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>Fiyat Teklif Et</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Satış fiyatını belirterek yaz
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOfferMode("link_product");
                  if (!linkedProductId && availableProducts[0]) {
                    setLinkedProductId(availableProducts[0].id);
                  }
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  offerMode === "link_product"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Link2 className="w-4 h-4 text-emerald-600" />
                  <span>Vitrin İlanı Bağla</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Mevcut vitrin ilanını ekle
                </p>
              </button>
            </div>

            {/* Dynamic Sub-input based on offerMode */}
            {offerMode === "custom_price" && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Önerdiğin Fiyat (TL)
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm font-bold rounded-xl border border-slate-200 bg-white"
                />
              </div>
            )}

            {offerMode === "link_product" && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Bağlanacak Vitrin İlanını Seç
                </label>
                <select
                  value={linkedProductId}
                  onChange={(e) => setLinkedProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white"
                >
                  {availableProducts.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.title} ({formatPrice(prod.price, prod.isFree)}) —{" "}
                      {prod.sellerName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Handover Point Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Kampüs Teslim Noktası Önerin
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CAMPUS_HANDOVER_POINTS.map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setHandoverPoint(pt.id)}
                    className={`p-2 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                      handoverPoint === pt.id
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                        : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    📍 {pt.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Message Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {selectedNeedPost.requesterName} Adlı Öğrenciye Mesajın{" "}
                <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Örn: Bende temiz L beden önlük var, yarın sabah Çelik Kafe'de verebilirim..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedNeedPost(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Kapat
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>&ldquo;Bende Bu Ürün Var&rdquo; Mesajını Gönder</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
