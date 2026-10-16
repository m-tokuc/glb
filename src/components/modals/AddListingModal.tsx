"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  Gift,
  Image as ImageIcon,
  MapPin,
  Pin,
  Plus,
  ShoppingBag,
  Sparkles,
  Tag,
  Upload,
  X,
} from "lucide-react";
import {
  CAMPUS_HANDOVER_POINTS,
  CATEGORIES,
  NEED_URGENCY_CONFIG,
  PRESET_ITEM_IMAGES,
  PRODUCT_CONDITIONS,
} from "@/lib/constants";
import {
  BudgetPreferenceType,
  CampusHandoverPoint,
  NeedUrgency,
  ProductCategory,
  ProductCondition,
} from "@/types";
import { useApp } from "@/context/AppContext";

export function AddListingModal() {
  const {
    isAddListingModalOpen,
    addListingInitialMode,
    closeAddListingModal,
    addProduct,
    addNeedPost,
  } = useApp();

  const [mode, setMode] = useState<"product" | "need">("product");

  // Option A: Product State
  const [prodTitle, setProdTitle] = useState("");
  const [prodCategory, setProdCategory] =
    useState<Exclude<ProductCategory, "all">>("lab_stationery");
  const [prodCondition, setProdCondition] =
    useState<ProductCondition>("like_new");
  const [isFree, setIsFree] = useState(false);
  const [prodPrice, setProdPrice] = useState("250");
  const [prodHandover, setProdHandover] =
    useState<CampusHandoverPoint>("Kütüphane Önü");
  const [prodCourseCode, setProdCourseCode] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    PRESET_ITEM_IMAGES[0].url
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Option B: Need Post State
  const [needTitle, setNeedTitle] = useState("");
  const [needCategory, setNeedCategory] =
    useState<Exclude<ProductCategory, "all">>("lab_stationery");
  const [needUrgency, setNeedUrgency] = useState<NeedUrgency>("urgent_lab");
  const [budgetType, setBudgetType] =
    useState<BudgetPreferenceType>("free_borrow");
  const [maxBudget, setMaxBudget] = useState("150");
  const [needHandover, setNeedHandover] =
    useState<CampusHandoverPoint>("Kütüphane Önü");
  const [needCourseCode, setNeedCourseCode] = useState("");
  const [needDescription, setNeedDescription] = useState("");

  useEffect(() => {
    if (isAddListingModalOpen) {
      setMode(addListingInitialMode);
    }
  }, [isAddListingModalOpen, addListingInitialMode]);

  if (!isAddListingModalOpen) return null;

  const selectableCategories = CATEGORIES.filter((c) => c.id !== "all") as {
    id: Exclude<ProductCategory, "all">;
    label: string;
  }[];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle.trim()) return;

    addProduct({
      title: prodTitle,
      description:
        prodDescription.trim() ||
        "AGÜ Sümer Kampüsü içinde elden teslim edilecek temiz akademik materyal.",
      price: isFree ? 0 : Math.max(0, Number(prodPrice) || 0),
      isFree: isFree || Number(prodPrice) === 0,
      category: prodCategory,
      condition: prodCondition,
      images: [selectedImageUrl],
      handoverPoint: prodHandover,
      courseCode: prodCourseCode,
    });

    // Reset & Close
    setProdTitle("");
    setProdDescription("");
    setProdCourseCode("");
    closeAddListingModal();
  };

  const handleNeedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!needTitle.trim()) return;

    let budgetLabel = "Ücretsiz / Ödünç";
    if (budgetType === "max_price") {
      budgetLabel = `Max ${Number(maxBudget) || 150} TL`;
    } else if (budgetType === "negotiable") {
      budgetLabel = "Fiyat Konuşulur";
    }

    addNeedPost({
      title: needTitle,
      description:
        needDescription.trim() ||
        "Elinde bu ürün olan arkadaşlar mesaj gönderirse kampüs içinde hemen teslim alabilirim.",
      category: needCategory,
      urgency: needUrgency,
      budgetType,
      maxBudget: budgetType === "max_price" ? Number(maxBudget) : undefined,
      budgetLabel,
      handoverPreference: needHandover,
      courseCode: needCourseCode,
    });

    setNeedTitle("");
    setNeedDescription("");
    setNeedCourseCode("");
    closeAddListingModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Sümer Kampüsü İlan Merkezi
            </span>
            <h2 className="text-lg sm:text-xl font-bold mt-0.5">
              Yeni Kampüs İlanı Oluştur
            </h2>
          </div>
          <button
            type="button"
            onClick={closeAddListingModal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Option Selector at the Top */}
        <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode("product")}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                mode === "product"
                  ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                  : "bg-white/60 border-slate-200 hover:bg-white"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  mode === "product"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  Ürün Sat / Ücretsiz Ver
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Vitrine ders kitabı, lab önlüğü veya ekipman ekle
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("need")}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                mode === "need"
                  ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                  : "bg-white/60 border-slate-200 hover:bg-white"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  mode === "need"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Pin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  İhtiyaç İlanı Aç
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Aradığın veya ödünç istediğin ürünü İhtiyaç Panosuna yaz
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* OPTION A: ÜRÜN KOY (SAT VEYA ÜCRETSİZ VER) */}
        {mode === "product" ? (
          <form
            onSubmit={handleProductSubmit}
            className="p-6 space-y-5 max-h-[72vh] overflow-y-auto"
          >
            {/* Image Upload & Preset Selector for Demo Ease */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ürün Fotoğrafı (Yükle veya Hazır Akademik Görsel Seç)</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Cihazdan Yükle</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {PRESET_ITEM_IMAGES.map((preset) => {
                  const isSelected = selectedImageUrl === preset.url;
                  return (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setSelectedImageUrl(preset.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-emerald-600 ring-2 ring-emerald-500/30 scale-105"
                          : "border-slate-200 opacity-75 hover:opacity-100"
                      }`}
                      title={preset.label}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Title & Course Code */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  İlan Başlığı <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  placeholder="Örn: Casio fx-991EX Hesap Makinesi / L Beden Lab Önlüğü"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  İlgili Ders Kodu
                </label>
                <input
                  type="text"
                  value={prodCourseCode}
                  onChange={(e) => setProdCourseCode(e.target.value)}
                  placeholder="Örn: CHEM 101, MATH 102"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Category & Condition */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Kategori
                </label>
                <select
                  value={prodCategory}
                  onChange={(e) =>
                    setProdCategory(
                      e.target.value as Exclude<ProductCategory, "all">
                    )
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
                >
                  {selectableCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Ürün Durumu
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRODUCT_CONDITIONS.map((cond) => (
                    <button
                      key={cond.id}
                      type="button"
                      onClick={() => setProdCondition(cond.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        prodCondition === cond.id
                          ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {cond.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Toggle: "Fiyat Belirle" vs "Ücretsiz Paylaş" */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Paylaşım Türü & Fiyatlandırma
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">
                  SDG 12 Döngüsel Kampüs Desteği
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsFree(false)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    !isFree
                      ? "bg-white border-slate-900 text-slate-900 shadow-xs"
                      : "bg-transparent border-slate-200 text-slate-500"
                  }`}
                >
                  <Tag className="w-4 h-4" />
                  <span>Fiyat Belirle (Satış)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFree(true)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFree
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                      : "bg-white border-slate-200 text-emerald-700"
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  <span>Ücretsiz Paylaş / Bağışla</span>
                </button>
              </div>

              {!isFree ? (
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Satış Fiyatı (TL)
                  </label>
                  <input
                    type="number"
                    min={1}
                    required={!isFree}
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="Örn: 250"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                  🌱 Bu ürün vitrinde yeşil <strong>ÜCRETSİZ</strong> rozetiyle yayınlanacak ve ihtiyacı olan bir AGÜ öğrencisine doğrudan destek olacak!
                </div>
              )}
            </div>

            {/* Campus Handover Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tercih Edilen Sümer Kampüsü Teslim Noktası</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CAMPUS_HANDOVER_POINTS.map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setProdHandover(pt.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      prodHandover === pt.id
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-xs font-semibold">{pt.id}</div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {pt.zone}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Açıklama & Teslim Notu
              </label>
              <textarea
                rows={3}
                value={prodDescription}
                onChange={(e) => setProdDescription(e.target.value)}
                placeholder="Ürünün detaylarını, hangi ders için uygun olduğunu ve kampüste hangi saatlerde teslim edebileceğini yaz..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={closeAddListingModal}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Vitrin İlanını Yayınla</span>
              </button>
            </div>
          </form>
        ) : (
          /* OPTION B: İHTİYAÇ İLANI AÇ (ARADIĞIN ÜRÜNÜ YAZ) */
          <form
            onSubmit={handleNeedSubmit}
            className="p-6 space-y-5 max-h-[72vh] overflow-y-auto"
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Aradığın Ürün / İhtiyaç Başlığı{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={needTitle}
                  onChange={(e) => setNeedTitle(e.target.value)}
                  placeholder="Örn: Perşembe Kimya Labı için L beden önlük lazım"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Ders Kodu (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={needCourseCode}
                  onChange={(e) => setNeedCourseCode(e.target.value)}
                  placeholder="Örn: CHEM 101"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Category & Urgency Level */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  İhtiyaç Kategorisi
                </label>
                <select
                  value={needCategory}
                  onChange={(e) =>
                    setNeedCategory(
                      e.target.value as Exclude<ProductCategory, "all">
                    )
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
                >
                  {selectableCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Aciliyet Durumu</span>
                </label>
                <select
                  value={needUrgency}
                  onChange={(e) =>
                    setNeedUrgency(e.target.value as NeedUrgency)
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
                >
                  {(
                    Object.keys(NEED_URGENCY_CONFIG) as NeedUrgency[]
                  ).map((uKey) => (
                    <option key={uKey} value={uKey}>
                      {NEED_URGENCY_CONFIG[uKey].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget Expectation */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Bütçe / Edinme Tercihi
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setBudgetType("free_borrow")}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    budgetType === "free_borrow"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  Ücretsiz / Ödünç
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetType("max_price")}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    budgetType === "max_price"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  Max Bütçe Belirle
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetType("negotiable")}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    budgetType === "negotiable"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  Fiyat Konuşulur
                </button>
              </div>

              {budgetType === "max_price" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Ayırdığın Maksimum Bütçe (TL)
                  </label>
                  <input
                    type="number"
                    min={10}
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    placeholder="Örn: 150"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white"
                  />
                </div>
              )}
            </div>

            {/* Preferred Handover Point */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nerede Teslim Alabilirsin?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CAMPUS_HANDOVER_POINTS.map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setNeedHandover(pt.id)}
                    className={`p-2 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                      needHandover === pt.id
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                        : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    {pt.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Detaylı Açıklama
              </label>
              <textarea
                rows={3}
                value={needDescription}
                onChange={(e) => setNeedDescription(e.target.value)}
                placeholder="Ürüne ne zaman ihtiyacın olduğunu, ödünç mü yoksa satın almak için mi aradığını belirt..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={closeAddListingModal}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Pin className="w-4 h-4" />
                <span>İhtiyaç Panosuna Ekle</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
