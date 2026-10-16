"use client";

import React, { useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Gift,
  Heart,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  UserCheck,
  X,
} from "lucide-react";
import { CAMPUS_HANDOVER_POINTS } from "@/lib/constants";
import { CampusHandoverPoint } from "@/types";
import { useApp } from "@/context/AppContext";
import {
  formatPrice,
  getCategoryLabel,
  getConditionConfig,
  getInitials,
} from "@/lib/utils";

export function ProductDetailModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    currentUser,
    toggleFavoriteProduct,
    createOffer,
    createReservation,
    askProductQuestion,
    answerProductQuestion,
    updateProductStatus,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeActionPanel, setActiveActionPanel] = useState<
    "none" | "offer" | "reserve"
  >("none");

  // Offer Form State
  const [offerAmount, setOfferAmount] = useState("");
  const [offerNote, setOfferNote] = useState("");

  // Reservation Form State
  const [resHandover, setResHandover] =
    useState<CampusHandoverPoint>("Kütüphane Önü");
  const [resTime, setResTime] = useState("Yarın Saat 13:00 (Öğle Arası)");
  const [resNote, setResNote] = useState(
    "Yarın saat 13:00'te kütüphane önünde teslim alacağım."
  );

  // Q&A Form State
  const [questionText, setQuestionText] = useState("");
  const [replyingToQuestionId, setReplyingToQuestionId] = useState<
    string | null
  >(null);
  const [answerText, setAnswerText] = useState("");

  if (!selectedProduct) return null;

  const conditionObj = getConditionConfig(selectedProduct.condition);
  const isFavorited = selectedProduct.favoritedBy.includes(
    currentUser?.id || ""
  );
  const isSeller = currentUser?.id === selectedProduct.sellerId;

  const handleOpenOffer = () => {
    if (selectedProduct.isFree || selectedProduct.price === 0) return;
    setOfferAmount(String(Math.round(selectedProduct.price * 0.85)));
    setActiveActionPanel(activeActionPanel === "offer" ? "none" : "offer");
  };

  const handleOpenReserve = () => {
    setResHandover(selectedProduct.handoverPoint);
    setResNote(
      `Yarın saat 13:00'te ${selectedProduct.handoverPoint} noktasında teslim alacağım.`
    );
    setActiveActionPanel(activeActionPanel === "reserve" ? "none" : "reserve");
  };

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Number(offerAmount);
    if (!numericPrice || numericPrice <= 0) return;
    createOffer(selectedProduct.id, numericPrice, offerNote);
    setOfferNote("");
    setActiveActionPanel("none");
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReservation(selectedProduct.id, resHandover, resTime, resNote);
    setActiveActionPanel("none");
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    askProductQuestion(selectedProduct.id, questionText);
    setQuestionText("");
  };

  const handleAnswerSubmit = (e: React.FormEvent, qId: string) => {
    e.preventDefault();
    if (!answerText.trim()) return;
    answerProductQuestion(selectedProduct.id, qId, answerText);
    setAnswerText("");
    setReplyingToQuestionId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Top Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">
              {getCategoryLabel(selectedProduct.category)}
            </span>
            {selectedProduct.courseCode && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                {selectedProduct.courseCode}
              </span>
            )}
            <span className="hidden sm:inline">• {selectedProduct.createdAt}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavoriteProduct(selectedProduct.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                isFavorited
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorited ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              <span>{selectedProduct.favoriteCount}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* 2-Column Product Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Image Gallery */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={
                    selectedProduct.images[activeImageIndex] ||
                    selectedProduct.images[0]
                  }
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />

                {/* Status Badge Overlay */}
                <div className="absolute top-3 left-3">
                  {selectedProduct.status === "available" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                      ● Müsait (Teslime Hazır)
                    </span>
                  ) : selectedProduct.status === "reserved" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm">
                      📌 Rezerve Edildi
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-white shadow-sm">
                      ✓ Teslim Edildi
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails if multiple images */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-2.5">
                  {selectedProduct.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-emerald-600 ring-2 ring-emerald-500/20"
                          : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* SDG Sustainability Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs text-emerald-950 leading-relaxed">
                  <span className="font-bold">
                    Sıfır Kargo & Kampüs İçi Döngüsel Ekonomi (SDG 12):
                  </span>{" "}
                  Bu ürünü Sümer Kampüsü içinde elden teslim alarak hem öğrenci bütçeni korur hem de karbon ayak izini azaltırsın.
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Title, Price, Seller Card, Handover Point & Primary CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                {/* Title & Price */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${conditionObj.badgeClass}`}
                    >
                      Durum: {conditionObj.label}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      📍 {selectedProduct.handoverPoint}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                    {selectedProduct.title}
                  </h1>

                  <div className="mt-3 flex items-center gap-3">
                    {selectedProduct.isFree || selectedProduct.price === 0 ? (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-lg">
                        <Gift className="w-5 h-5 text-emerald-600" />
                        <span>ÜCRETSİZ / KAMPÜS BAĞIŞI</span>
                      </div>
                    ) : (
                      <div className="text-3xl font-extrabold text-slate-900">
                        {formatPrice(selectedProduct.price)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Ürün Açıklaması
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Campus Handover Point Card */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Kampüs Teslim Noktası
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        AGU Sümer Kampüsü — {selectedProduct.handoverPoint}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Elden Teslim
                  </span>
                </div>

                {/* Seller Profile Card */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm flex items-center justify-center">
                      {getInitials(selectedProduct.sellerName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">
                          {selectedProduct.sellerName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <ShieldCheck className="w-3 h-3" />
                          Doğrulanmış AGÜ
                        </span>
                      </div>
                      <div className="text-xs text-slate-300">
                        {selectedProduct.sellerDepartment}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{selectedProduct.sellerRating.toFixed(1)}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Güvenilir Satıcı
                    </div>
                  </div>
                </div>
              </div>

              {/* Reserved Notice if already reserved */}
              {selectedProduct.status === "reserved" && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-900">
                  <div>
                    <strong>📌 Bu ürün şu an rezerve edilmiş:</strong>{" "}
                    {selectedProduct.reservedByName || "Bir öğrenci"} (
                    {selectedProduct.reservedNote || "Kampüs teslimi bekliyor"})
                  </div>
                  {isSeller && (
                    <button
                      type="button"
                      onClick={() =>
                        updateProductStatus(selectedProduct.id, "available")
                      }
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 font-bold text-amber-800 hover:bg-amber-100 shrink-0 cursor-pointer"
                    >
                      Müsait Yap
                    </button>
                  )}
                </div>
              )}

              {/* TWO PRIMARY ACTION BUTTONS: "Teklif Ver" & "Ayırt / Rezerve Et" */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Button 1: Teklif Ver (Disabled if item is Free) */}
                  <button
                    type="button"
                    disabled={
                      selectedProduct.isFree || selectedProduct.price === 0
                    }
                    onClick={handleOpenOffer}
                    className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all ${
                      selectedProduct.isFree || selectedProduct.price === 0
                        ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                        : activeActionPanel === "offer"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white hover:bg-slate-50 text-slate-900 border-slate-300 cursor-pointer"
                    }`}
                  >
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>
                      {selectedProduct.isFree || selectedProduct.price === 0
                        ? "Ücretsiz Ürün (Teklife Kapalı)"
                        : "Teklif Ver (Fiyat Öner)"}
                    </span>
                  </button>

                  {/* Button 2: Ayırt / Rezerve Et */}
                  <button
                    type="button"
                    onClick={handleOpenReserve}
                    className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <CalendarClock className="w-4 h-4" />
                    <span>Ayırt / Rezerve Et</span>
                  </button>
                </div>

                {/* POPUP PANEL 1: TEKLİF VER (MAKE AN OFFER) */}
                {activeActionPanel === "offer" && (
                  <form
                    onSubmit={handleOfferSubmit}
                    className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-900/15 space-y-3 animate-in fade-in duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                        💸 Satıcıya Fiyat Teklifi Gönder
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[0.9, 0.85, 0.75].map((ratio) => {
                          const suggested = Math.round(
                            selectedProduct.price * ratio
                          );
                          return (
                            <button
                              key={ratio}
                              type="button"
                              onClick={() => setOfferAmount(String(suggested))}
                              className="px-2 py-0.5 rounded-md bg-white hover:bg-emerald-50 border border-slate-200 text-[11px] font-bold text-emerald-700 cursor-pointer"
                            >
                              {suggested} ₺
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Teklifin (TL)
                        </label>
                        <input
                          type="number"
                          required
                          min={1}
                          value={offerAmount}
                          onChange={(e) => setOfferAmount(e.target.value)}
                          className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Kısa Not (Opsiyonel)
                        </label>
                        <input
                          type="text"
                          value={offerNote}
                          onChange={(e) => setOfferNote(e.target.value)}
                          placeholder="Örn: Bugün kütüphane önünde nakit alabilirim"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveActionPanel("none")}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600"
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Teklifi Gönder
                      </button>
                    </div>
                  </form>
                )}

                {/* POPUP PANEL 2: AYIRT / REZERVE ET (RESERVE FOR CAMPUS PICKUP) */}
                {activeActionPanel === "reserve" && (
                  <form
                    onSubmit={handleReserveSubmit}
                    className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-500/30 space-y-3 animate-in fade-in duration-150"
                  >
                    <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                      📌 Kampüs İçi Teslimat İçin Rezerve Et
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                          Buluşma Noktası
                        </label>
                        <select
                          value={resHandover}
                          onChange={(e) =>
                            setResHandover(
                              e.target.value as CampusHandoverPoint
                            )
                          }
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-emerald-300 bg-white text-slate-800"
                        >
                          {CAMPUS_HANDOVER_POINTS.map((pt) => (
                            <option key={pt.id} value={pt.id}>
                              {pt.id}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                          Teslim Günü & Saati
                        </label>
                        <input
                          type="text"
                          required
                          value={resTime}
                          onChange={(e) => setResTime(e.target.value)}
                          placeholder="Örn: Yarın saat 13:00"
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-emerald-300 bg-white text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                        Satıcıya Teslimat Notun
                      </label>
                      <input
                        type="text"
                        required
                        value={resNote}
                        onChange={(e) => setResNote(e.target.value)}
                        placeholder="Yarın saat 13:00'te kütüphane önünde alacağım"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white text-slate-800"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveActionPanel("none")}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600"
                      >
                        Vazgeç
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                      >
                        Ürünü Ayırt / Rezerve Et
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: PUBLIC Q&A ("ÜRÜN SORULARI - SORU & CEVAP") */}
          <div className="pt-6 border-t border-slate-200 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    Ürün Soruları — Soru & Cevap ({selectedProduct.questions.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Dolap tarzı herkese açık soru-cevap alanı. Satıcıya ürün veya sınav uygunluğu hakkında soru sorabilirsin.
                  </p>
                </div>
              </div>
            </div>

            {/* Ask Question Form */}
            <form
              onSubmit={handleAskQuestion}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Satıcıya soru sor (Örn: Casio fx-991EX mi yoksa alt model mi? Sınavda geçerli mi?)"
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Soru Sor</span>
              </button>
            </form>

            {/* Q&A List */}
            <div className="space-y-3">
              {selectedProduct.questions.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center text-xs text-slate-500">
                  Bu ürün için henüz soru sorulmadı. İlk soruyu sen sor!
                </div>
              ) : (
                selectedProduct.questions.map((qa) => (
                  <div
                    key={qa.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3"
                  >
                    {/* Buyer Question */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {getInitials(qa.askerName)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {qa.askerName}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              ({qa.askerDepartment})
                            </span>
                            <span className="text-[10px] text-slate-400">
                              • {qa.createdAt}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-800 mt-1 font-medium">
                            {qa.question}
                          </p>
                        </div>
                      </div>

                      {!qa.answer && (
                        <button
                          type="button"
                          onClick={() =>
                            setReplyingToQuestionId(
                              replyingToQuestionId === qa.id ? null : qa.id
                            )
                          }
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0 cursor-pointer"
                        >
                          Satıcı Olarak Cevapla
                        </button>
                      )}
                    </div>

                    {/* Seller Reply with "Satıcı" Badge */}
                    {qa.answer && (
                      <div className="ml-6 sm:ml-9 p-3.5 rounded-xl bg-white border border-emerald-200/90 shadow-2xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-900">
                            {qa.sellerName || selectedProduct.sellerName}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                            <UserCheck className="w-3 h-3" />
                            Satıcı
                          </span>
                          {qa.answeredAt && (
                            <span className="text-[10px] text-slate-400">
                              • {qa.answeredAt}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {qa.answer}
                        </p>
                      </div>
                    )}

                    {/* Reply Input if Seller clicks reply */}
                    {replyingToQuestionId === qa.id && !qa.answer && (
                      <form
                        onSubmit={(e) => handleAnswerSubmit(e, qa.id)}
                        className="ml-6 sm:ml-9 flex gap-2 pt-1"
                      >
                        <input
                          type="text"
                          required
                          value={answerText}
                          onChange={(e) => setAnswerText(e.target.value)}
                          placeholder="Satıcı yanıtınızı yazın..."
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Yanıtla
                        </button>
                      </form>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
