"use client";

import React, { useState } from "react";
import {
  CalendarClock,
  Check,
  CheckCircle2,
  ExternalLink,
  Gift,
  GraduationCap,
  MapPin,
  MessageSquare,
  Package,
  Pin,
  Plus,
  Send,
  ShieldCheck,
  ShoppingBag,
  Star,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { DashboardTab, useApp } from "@/context/AppContext";
import { formatPrice, getInitials } from "@/lib/utils";

export function ProfileDashboardModal() {
  const {
    isDashboardOpen,
    activeDashboardTab,
    openDashboard,
    closeDashboard,
    currentUser,
    products,
    needPosts,
    offers,
    reservations,
    directMessages,
    updateProductStatus,
    deleteProduct,
    setSelectedProduct,
    markNeedPostFulfilled,
    deleteNeedPost,
    respondToOffer,
    updateReservationStatus,
    replyToDirectMessage,
    openAddListingModal,
  } = useApp();

  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  if (!isDashboardOpen || !currentUser) return null;

  const myProducts = products.filter((p) => p.sellerId === currentUser.id);
  const myNeeds = needPosts.filter((n) => n.requesterId === currentUser.id);

  const incomingOffers = offers.filter((o) => o.sellerId === currentUser.id);
  const outgoingOffers = offers.filter((o) => o.buyerId === currentUser.id);

  const incomingReservations = reservations.filter(
    (r) => r.sellerId === currentUser.id
  );
  const outgoingReservations = reservations.filter(
    (r) => r.buyerId === currentUser.id
  );

  const myMessages = directMessages.filter(
    (m) => m.receiverId === currentUser.id || m.senderId === currentUser.id
  );

  const handleReplySubmit = (e: React.FormEvent, dmId: string) => {
    e.preventDefault();
    const text = replyTexts[dmId];
    if (!text || !text.trim()) return;
    replyToDirectMessage(dmId, text);
    setReplyTexts((prev) => ({ ...prev, [dmId]: "" }));
  };

  const tabs: {
    id: DashboardTab;
    label: string;
    count: number;
    icon: React.ReactNode;
  }[] = [
    {
      id: "my_products",
      label: "Vitrin İlanlarım",
      count: myProducts.length,
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      id: "my_needs",
      label: "İhtiyaç İlanlarım",
      count: myNeeds.length,
      icon: <Pin className="w-4 h-4" />,
    },
    {
      id: "offers_reservations",
      label: "Teklifler & Rezerveler",
      count:
        incomingOffers.length +
        outgoingOffers.length +
        incomingReservations.length +
        outgoingReservations.length,
      icon: <Tag className="w-4 h-4" />,
    },
    {
      id: "messages",
      label: "Mesajlarım ('Bende Var')",
      count: myMessages.length,
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Top User Profile Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xl flex items-center justify-center shadow-lg">
                {getInitials(currentUser.fullName)}
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">
                  {currentUser.fullName}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Doğrulanmış @agu.edu.tr
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
                <span className="inline-flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  {currentUser.department}
                </span>
                <span>•</span>
                <span>{currentUser.email}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {currentUser.rating.toFixed(1)} Kampüs Güven Puanı
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={closeDashboard}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
          {tabs.map((tab) => {
            const active = activeDashboardTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => openDashboard(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "border-emerald-600 text-emerald-700 bg-white rounded-t-xl"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] ${
                    active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50/50">
          {/* TAB 1: VİTRİN İLANLARIM */}
          {activeDashboardTab === "my_products" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Vitrin İlanlarım ({myProducts.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    İlanlarının durumunu &ldquo;Müsait&rdquo;, &ldquo;Rezerve Edildi&rdquo; veya &ldquo;Satıldı/Verildi&rdquo; olarak güncelleyebilirsin.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeDashboard();
                    openAddListingModal("product");
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Ürün Ekle</span>
                </button>
              </div>

              {myProducts.length === 0 ? (
                <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                  <Package className="w-8 h-8 text-slate-400 mx-auto" />
                  <div className="text-sm font-bold text-slate-800">
                    Henüz vitrine eklediğin bir ürün yok
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeDashboard();
                      openAddListingModal("product");
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                  >
                    + İlk Vitrin İlanını Aç
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 flex gap-4 items-start shadow-2xs"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="w-24 h-24 rounded-xl object-cover shrink-0 border border-slate-100"
                      />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                            {prod.title}
                          </h4>
                          <span className="text-xs font-extrabold text-emerald-700 shrink-0">
                            {formatPrice(prod.price, prod.isFree)}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500">
                          📍 {prod.handoverPoint} • {prod.questions.length} Soru
                        </div>

                        {/* Status Switcher Buttons */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {(
                            [
                              { id: "available", label: "Müsait" },
                              { id: "reserved", label: "Rezerve" },
                              { id: "sold", label: "Satıldı/Verildi" },
                            ] as const
                          ).map((st) => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() =>
                                updateProductStatus(prod.id, st.id)
                              }
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                                prod.status === st.id
                                  ? "bg-slate-900 text-white border-slate-900"
                                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {st.label}
                            </button>
                          ))}

                          <button
                            type="button"
                            onClick={() => {
                              closeDashboard();
                              setSelectedProduct(prod);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 ml-auto cursor-pointer"
                            title="İlanı Görüntüle"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                            title="İlanı Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: İHTİYAÇ İLANLARIM */}
          {activeDashboardTab === "my_needs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    İhtiyaç Panosu İlanlarım ({myNeeds.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Açtığın ihtiyaç ilanlarını yönet veya bulunduğunda &ldquo;Karşılandı&rdquo; olarak işaretle.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeDashboard();
                    openAddListingModal("need");
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>İhtiyaç İlanı Aç</span>
                </button>
              </div>

              {myNeeds.length === 0 ? (
                <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
                  <Pin className="w-8 h-8 text-slate-400 mx-auto" />
                  <div className="text-sm font-bold text-slate-800">
                    Henüz açtığın bir ihtiyaç ilanı bulunmuyor
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {myNeeds.map((need) => (
                    <div
                      key={need.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              need.status === "open"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {need.status === "open"
                              ? "● Aktif Aranıyor"
                              : "✓ Karşılandı / Bulundu"}
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            {need.budgetLabel}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {need.title}
                        </h4>
                        <p className="text-xs text-slate-500">
                          📍 {need.handoverPreference} • {need.responseCount} yanıt
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => markNeedPostFulfilled(need.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold cursor-pointer"
                        >
                          {need.status === "open"
                            ? "✓ Bulundu İşaretle"
                            : "Tekrar Aç"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteNeedPost(need.id)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GELEN/GİDEN TEKLİFLER & REZERVELER */}
          {activeDashboardTab === "offers_reservations" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Price Offers */}
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>Gelen & Giden Fiyat Teklifleri</span>
                </h3>

                {/* Incoming Offers */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-500">
                    İlanlarıma Gelen Teklifler ({incomingOffers.length})
                  </div>
                  {incomingOffers.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-400">
                      Henüz ilanlarına gelen bir fiyat teklifi yok.
                    </div>
                  ) : (
                    incomingOffers.map((off) => (
                      <div
                        key={off.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={off.productImage}
                            alt={off.productTitle}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 truncate">
                              {off.productTitle}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Teklif Veren:{" "}
                              <strong className="text-slate-800">
                                {off.buyerName}
                              </strong>{" "}
                              ({off.buyerDepartment})
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-slate-400 line-through mr-2">
                              İlan Fiyatı: {off.originalPrice} ₺
                            </span>
                            <span className="text-sm font-extrabold text-emerald-700">
                              Teklif: {off.offeredPrice} ₺
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              off.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : off.status === "accepted"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {off.status === "pending"
                              ? "Onay Bekliyor"
                              : off.status === "accepted"
                              ? "Kabul Edildi"
                              : "Reddedildi"}
                          </span>
                        </div>

                        {off.note && (
                          <p className="text-xs text-slate-600 italic">
                            &ldquo;{off.note}&rdquo;
                          </p>
                        )}

                        {off.status === "pending" && (
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() =>
                                respondToOffer(off.id, "accepted")
                              }
                              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Teklifi Kabul Et</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                respondToOffer(off.id, "rejected")
                              }
                              className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer"
                            >
                              Reddet
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Outgoing Offers */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-500">
                    Gönderdiğim Teklifler ({outgoingOffers.length})
                  </div>
                  {outgoingOffers.map((off) => (
                    <div
                      key={off.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {off.productTitle}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Satıcı: {off.sellerName} • Teklifim:{" "}
                          <strong className="text-emerald-700">
                            {off.offeredPrice} ₺
                          </strong>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                          off.status === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : off.status === "accepted"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {off.status === "pending"
                          ? "Beklemede"
                          : off.status === "accepted"
                          ? "Kabul Edildi"
                          : "Reddedildi"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Campus Reservations */}
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-emerald-600" />
                  <span>Kampüs Teslim & Rezervasyon Talepleri</span>
                </h3>

                {/* Incoming Reservations */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-500">
                    İlanlarıma Gelen Rezerve Talepleri (
                    {incomingReservations.length})
                  </div>
                  {incomingReservations.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {res.productTitle}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            res.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : res.status === "approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : res.status === "completed"
                              ? "bg-slate-800 text-white"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {res.status === "pending"
                            ? "Rezerve Onayı Bekliyor"
                            : res.status === "approved"
                            ? "Onaylandı (Buluşma Bekleniyor)"
                            : res.status === "completed"
                            ? "Teslim Edildi"
                            : "İptal Edildi"}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                        <div>
                          👤 <strong>Alıcı:</strong> {res.buyerName} (
                          {res.buyerDepartment})
                        </div>
                        <div>
                          📍 <strong>Teslim Noktası:</strong> {res.handoverPoint}{" "}
                          — <strong>{res.proposedTime}</strong>
                        </div>
                        <div className="italic text-slate-500">
                          &ldquo;{res.pickupNote}&rdquo;
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {res.status === "pending" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateReservationStatus(res.id, "approved")
                            }
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                          >
                            ✓ Rezervasyonu Onayla
                          </button>
                        )}
                        {res.status === "approved" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateReservationStatus(res.id, "completed")
                            }
                            className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                          >
                            🤝 Elden Teslim Edildi İşaretle
                          </button>
                        )}
                        {res.status !== "cancelled" &&
                          res.status !== "completed" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateReservationStatus(res.id, "cancelled")
                              }
                              className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer"
                            >
                              İptal Et
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Outgoing Reservations */}
                {outgoingReservations.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-slate-500">
                      Ayırttığım Ürünler ({outgoingReservations.length})
                    </div>
                    {outgoingReservations.map((res) => (
                      <div
                        key={res.id}
                        className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">
                            {res.productTitle}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700">
                            📍 {res.handoverPoint} ({res.proposedTime})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Satıcı: {res.sellerName} • Not: {res.pickupNote}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: MESAJLARIM ("BENDE BU ÜRÜN VAR" DIRECT MESSAGES) */}
          {activeDashboardTab === "messages" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  İhtiyaç Panosu &ldquo;Bende Bu Ürün Var&rdquo; Mesajlarım (
                  {myMessages.length})
                </h3>
                <p className="text-xs text-slate-500">
                  İhtiyaç panosundan gelen ürün bildirimlerini ve kampüs buluşma mesajlarını buradan yanıtlayabilirsin.
                </p>
              </div>

              {myMessages.length === 0 ? (
                <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-400">
                  Henüz mesaj kutunuzda bir görüşme bulunmuyor.
                </div>
              ) : (
                <div className="space-y-4">
                  {myMessages.map((dm) => (
                    <div
                      key={dm.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                            📌 İlgili İhtiyaç İlanı: {dm.needPostTitle}
                          </span>
                          <div className="text-xs font-bold text-slate-900 mt-0.5">
                            {dm.senderName} ({dm.senderDepartment}) →{" "}
                            {dm.receiverName}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                            📍 {dm.handoverPoint}
                          </span>
                          {dm.isFreeOffer ? (
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                              Ücretsiz / Ödünç Teklifi
                            </span>
                          ) : dm.proposedPrice ? (
                            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold">
                              Önerilen Fiyat: {dm.proposedPrice} ₺
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* Initial Message */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800">
                        <strong className="text-slate-900">
                          {dm.senderName}:
                        </strong>{" "}
                        {dm.message}
                      </div>

                      {/* Linked Marketplace Product Preview if attached */}
                      {dm.linkedProductTitle && (
                        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {dm.linkedProductImage && (
                              <img
                                src={dm.linkedProductImage}
                                alt={dm.linkedProductTitle}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <div className="text-[10px] font-bold uppercase text-emerald-700">
                                Bağlanan Vitrin İlanı
                              </div>
                              <div className="text-xs font-bold text-slate-900">
                                {dm.linkedProductTitle}
                              </div>
                            </div>
                          </div>
                          {dm.linkedProductId && (
                            <button
                              type="button"
                              onClick={() => {
                                const prod = products.find(
                                  (p) => p.id === dm.linkedProductId
                                );
                                if (prod) {
                                  closeDashboard();
                                  setSelectedProduct(prod);
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                            >
                              İlanı Aç
                            </button>
                          )}
                        </div>
                      )}

                      {/* Replies Thread */}
                      {dm.replies.length > 0 && (
                        <div className="space-y-2 pl-4 border-l-2 border-emerald-500">
                          {dm.replies.map((rep) => (
                            <div
                              key={rep.id}
                              className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/60"
                            >
                              <span className="font-bold text-slate-900">
                                {rep.senderName}:
                              </span>{" "}
                              <span className="text-slate-700">{rep.text}</span>
                              <span className="text-[10px] text-slate-400 ml-2">
                                ({rep.createdAt})
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      <form
                        onSubmit={(e) => handleReplySubmit(e, dm.id)}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={replyTexts[dm.id] || ""}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({
                              ...prev,
                              [dm.id]: e.target.value,
                            }))
                          }
                          placeholder="Mesaja yanıt yaz (Örn: Yarın saat 13:00'te Çelik Kafe önünde buluşalım)..."
                          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Yanıtla</span>
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
