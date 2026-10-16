"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowUpDown,
  BookOpen,
  CheckCircle2,
  Coffee,
  Cpu,
  Filter,
  FlaskConical,
  Gift,
  Heart,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Plus,
  Recycle,
  RotateCcw,
  Shirt,
  Sparkles,
  Star,
} from "lucide-react";
import {
  CAMPUS_HANDOVER_POINTS,
  CATEGORIES,
  PRODUCT_CONDITIONS,
} from "@/lib/constants";
import {
  CampusHandoverPoint,
  ProductCategory,
  ProductCondition,
  ProductItem,
} from "@/types";
import { useApp } from "@/context/AppContext";
import {
  formatPrice,
  getCategoryShortLabel,
  getConditionConfig,
  getInitials,
} from "@/lib/utils";

type SortOption = "newest" | "price_asc" | "price_desc" | "free_only";
type PriceTypeFilter = "all" | "paid" | "free";

export function VitrinView() {
  const {
    products,
    currentUser,
    searchQuery,
    setSearchQuery,
    toggleFavoriteProduct,
    setSelectedProduct,
    openAddListingModal,
    setActiveMainTab,
  } = useApp();

  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedConditions, setSelectedConditions] = useState<
    ProductCondition[]
  >([]);
  const [priceType, setPriceType] = useState<PriceTypeFilter>("all");
  const [selectedHandover, setSelectedHandover] = useState<
    CampusHandoverPoint | "all"
  >("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const toggleCondition = (cond: ProductCondition) => {
    setSelectedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSortBy("newest");
    setSelectedConditions([]);
    setPriceType("all");
    setSelectedHandover("all");
    setOnlyFavorites(false);
    setSearchQuery("");
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-4 h-4" />;
      case "FlaskConical":
        return <FlaskConical className="w-4 h-4" />;
      case "Cpu":
        return <Cpu className="w-4 h-4" />;
      case "Coffee":
        return <Coffee className="w-4 h-4" />;
      case "Shirt":
        return <Shirt className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Category Filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 2. Global Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sellerDepartment.toLowerCase().includes(q) ||
          p.sellerName.toLowerCase().includes(q) ||
          (p.courseCode && p.courseCode.toLowerCase().includes(q)) ||
          p.handoverPoint.toLowerCase().includes(q)
      );
    }

    // 3. Condition Filter
    if (selectedConditions.length > 0) {
      list = list.filter((p) => selectedConditions.includes(p.condition));
    }

    // 4. Price Type Filter
    if (priceType === "free" || sortBy === "free_only") {
      list = list.filter((p) => p.isFree || p.price === 0);
    } else if (priceType === "paid") {
      list = list.filter((p) => !p.isFree && p.price > 0);
    }

    // 5. Handover Point Filter
    if (selectedHandover !== "all") {
      list = list.filter((p) => p.handoverPoint === selectedHandover);
    }

    // 6. Favorites Filter
    if (onlyFavorites && currentUser) {
      list = list.filter((p) => p.favoritedBy.includes(currentUser.id));
    }

    // 7. Sorting
    if (sortBy === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedConditions,
    priceType,
    selectedHandover,
    onlyFavorites,
    sortBy,
    currentUser,
  ]);

  const freeProductsCount = products.filter(
    (p) => p.isFree || p.price === 0
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Sustainability & Marketplace Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-16 w-72 h-72 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Recycle className="w-3.5 h-3.5" />
                <span>AGU Sümer Kampüsü Vitrin</span>
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30">
                SDG 4: Nitelikli Eğitim
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                SDG 12: Sorumlu Tüketim
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Kampüs İçi Ders Kitabı, Lab Ekipmanı ve Yaşam Vitrini
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kargo beklemek yok! Beğendiğin ürüne{" "}
              <strong className="text-white">Teklif Ver</strong>,{" "}
              <strong className="text-white">Soru Sor</strong> veya{" "}
              <strong className="text-emerald-300">Kütüphane Önü / Çelik Kafe</strong>{" "}
              için hemen <strong className="text-white">Ayırt / Rezerve Et</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
              <div className="text-xl font-extrabold text-emerald-400">
                {products.length}
              </div>
              <div className="text-[11px] text-slate-300">Aktif Vitrin İlanı</div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-emerald-500/20 backdrop-blur-xs border border-emerald-400/30 text-center">
              <div className="text-xl font-extrabold text-emerald-300">
                {freeProductsCount}
              </div>
              <div className="text-[11px] text-emerald-100">
                Ücretsiz / Bağış Ürün
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveMainTab("wishboard")}
              className="px-4 py-3 rounded-2xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-xs shadow-sm transition-colors cursor-pointer"
            >
              Aradığını Bulamadın mı? <br />
              <span className="text-emerald-600 font-extrabold">
                📌 İhtiyaç Panosuna Git →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Category Pills Bar (Desktop + Mobile friendly) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count =
            cat.id === "all"
              ? products.length
              : products.filter((p) => p.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30"
              }`}
            >
              <span
                className={isSelected ? "text-emerald-400" : "text-emerald-600"}
              >
                {getCategoryIcon(cat.iconName)}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* MAIN E-COMMERCE LAYOUT: LEFT SIDEBAR FILTERS + RIGHT 4-COLUMN PRODUCT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT FILTER SIDEBAR */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-6 lg:sticky lg:top-24 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>Detaylı Filtrele</span>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Sıfırla</span>
            </button>
          </div>

          {/* Price Type Filter: Tümü / Ücretli / Ücretsiz */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Fiyat Türü
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setPriceType("all");
                  if (sortBy === "free_only") setSortBy("newest");
                }}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  priceType === "all" && sortBy !== "free_only"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600"
                }`}
              >
                Tümü
              </button>
              <button
                type="button"
                onClick={() => {
                  setPriceType("paid");
                  if (sortBy === "free_only") setSortBy("newest");
                }}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  priceType === "paid"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600"
                }`}
              >
                Ücretli
              </button>
              <button
                type="button"
                onClick={() => setPriceType("free")}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  priceType === "free" || sortBy === "free_only"
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "text-emerald-700"
                }`}
              >
                Ücretsiz
              </button>
            </div>
          </div>

          {/* Condition Checkboxes */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Ürün Kondisyonu
            </label>
            <div className="space-y-1.5">
              {PRODUCT_CONDITIONS.map((cond) => {
                const checked = selectedConditions.includes(cond.id);
                return (
                  <label
                    key={cond.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                      checked
                        ? "bg-emerald-50/70 border-emerald-400 text-slate-900"
                        : "bg-slate-50/60 border-slate-200/80 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCondition(cond.id)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="font-semibold">{cond.label}</span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md border ${cond.badgeClass}`}
                    >
                      {
                        products.filter((p) => p.condition === cond.id).length
                      }{" "}
                      ürün
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Campus Handover Point Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kampüs Teslim Noktası</span>
            </label>
            <select
              value={selectedHandover}
              onChange={(e) =>
                setSelectedHandover(
                  e.target.value as CampusHandoverPoint | "all"
                )
              }
              className="w-full px-3 py-2.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Tüm Sümer Kampüsü Noktaları</option>
              {CAMPUS_HANDOVER_POINTS.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.id} ({pt.zone})
                </option>
              ))}
            </select>
          </div>

          {/* Favorites Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setOnlyFavorites((prev) => !prev)}
              className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                onlyFavorites
                  ? "bg-rose-50 border-rose-300 text-rose-700"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <Heart
                  className={`w-4 h-4 ${
                    onlyFavorites
                      ? "fill-rose-500 text-rose-500"
                      : "text-slate-400"
                  }`}
                />
                <span>Favorilediğim İlanlar</span>
              </span>
              <span className="text-[11px] font-bold">
                {
                  products.filter((p) =>
                    p.favoritedBy.includes(currentUser?.id || "")
                  ).length
                }
              </span>
            </button>
          </div>
        </aside>

        {/* RIGHT PRODUCT GRID AREA */}
        <div className="lg:col-span-9 space-y-4">
          {/* Sorting & Results Count Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="text-xs sm:text-sm text-slate-600">
              Toplam{" "}
              <strong className="font-bold text-slate-900">
                {filteredProducts.length}
              </strong>{" "}
              kampüs ilanı listeleniyor
              {searchQuery && (
                <span>
                  {" "}
                  • Arama:{" "}
                  <strong className="text-emerald-700">"{searchQuery}"</strong>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                Sırala:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="newest">En Yeni İlanlar</option>
                <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="free_only">Sadece Ücretsizler (Bağış)</option>
              </select>
            </div>
          </div>

          {/* 4-Column Responsive Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">
                  Aradığın kriterlere uygun vitrin ilanı bulunamadı
                </h3>
                <p className="text-xs text-slate-500">
                  Filtreleri sıfırlayabilir veya aradığın bu ürünü doğrudan{" "}
                  <strong>İhtiyaç Panosuna</strong> yazarak elinde olan AGÜ
                  öğrencilerinin sana ulaşmasını sağlayabilirsin!
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Filtreleri Temizle
                </button>
                <button
                  type="button"
                  onClick={() => openAddListingModal("need")}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  + İhtiyaç İlanı Aç
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorited={product.favoritedBy.includes(
                    currentUser?.id || ""
                  )}
                  onToggleFavorite={() => toggleFavoriteProduct(product.id)}
                  onSelect={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: ProductItem;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
}

function ProductCard({
  product,
  isFavorited,
  onToggleFavorite,
  onSelect,
}: ProductCardProps) {
  const conditionObj = getConditionConfig(product.condition);

  return (
    <div
      onClick={onSelect}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/60 shadow-2xs hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Left Badges: Status & Condition */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.status === "available" ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600/95 text-white shadow-xs backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Müsait
            </span>
          ) : product.status === "reserved" ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
              Rezerve Edildi
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-white shadow-xs">
              Teslim Edildi
            </span>
          )}

          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-md bg-white/90 text-slate-800 border-white/50 shadow-2xs`}
          >
            {conditionObj.label}
          </span>
        </div>

        {/* Top Right: Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm transition-transform active:scale-90 cursor-pointer"
          title="Favorilere Ekle"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited
                ? "fill-rose-500 text-rose-500"
                : "text-slate-600 hover:text-rose-500"
            }`}
          />
        </button>

        {/* Bottom Overlay: Handover Point & Course Code */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium truncate">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{product.handoverPoint}</span>
          </span>

          {product.courseCode && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-950/85 text-emerald-300 text-[10px] font-bold shrink-0">
              {product.courseCode}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 font-medium mb-1">
            <span>{getCategoryShortLabel(product.category)}</span>
            <span>{product.createdAt}</span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2 leading-snug transition-colors">
            {product.title}
          </h3>
        </div>

        <div className="space-y-2.5 pt-1 border-t border-slate-100">
          {/* Seller Info */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">
              {getInitials(product.sellerName)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-slate-800 truncate flex items-center gap-1">
                <span className="truncate">{product.sellerName}</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {product.sellerDepartment}
              </div>
            </div>
          </div>

          {/* Price or Green "ÜCRETSİZ" Badge & Q&A Counter */}
          <div className="flex items-center justify-between pt-1">
            {product.isFree || product.price === 0 ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-xs tracking-wide">
                <Gift className="w-3.5 h-3.5 text-emerald-600" />
                ÜCRETSİZ
              </span>
            ) : (
              <span className="text-base font-extrabold text-slate-900">
                {formatPrice(product.price)}
              </span>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-400">
              {product.questions.length > 0 && (
                <span
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md"
                  title="Ürün Soruları"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                  {product.questions.length}
                </span>
              )}
              <span className="inline-flex items-center gap-0.5 text-[11px] text-slate-500">
                <Heart className="w-3 h-3 text-rose-400" />
                {product.favoriteCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
