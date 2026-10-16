"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  MessageSquare,
  Package,
  Pin,
  Plus,
  Recycle,
  RotateCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Tag,
  User as UserIcon,
  X,
} from "lucide-react";
import { APP_NAME, CAMPUS_BADGE } from "@/lib/constants";
import { useApp } from "@/context/AppContext";
import { getInitials } from "@/lib/utils";

export function Navbar() {
  const {
    currentUser,
    activeMainTab,
    setActiveMainTab,
    searchQuery,
    setSearchQuery,
    openAddListingModal,
    openDashboard,
    logout,
    notifications,
    markAllNotificationsRead,
    markNotificationRead,
    offers,
    reservations,
    directMessages,
    products,
    setSelectedProduct,
    resetDemoData,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!currentUser) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const pendingIncomingOffersCount = offers.filter(
    (o) => o.sellerId === currentUser.id && o.status === "pending"
  ).length;
  const pendingIncomingResCount = reservations.filter(
    (r) => r.sellerId === currentUser.id && r.status === "pending"
  ).length;
  const unreadMessagesCount = directMessages.filter(
    (m) => m.receiverId === currentUser.id && !m.isRead
  ).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-18 flex items-center justify-between gap-3 lg:gap-6">
            {/* 1. LEFT: [APP_NAME] Logo & Campus Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveMainTab("vitrin");
                  setSearchQuery("");
                }}
                className="flex items-center gap-2.5 text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 group-hover:bg-emerald-700 text-white flex items-center justify-center shadow-sm shadow-emerald-600/20 transition-colors">
                  <Recycle className="w-5 h-5 stroke-[2.3]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold tracking-tight text-slate-900">
                      {APP_NAME}
                    </span>
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {CAMPUS_BADGE}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 hidden xl:block">
                    SDG 4 & SDG 12 Kampüs Pazaryeri
                  </p>
                </div>
              </button>
            </div>

            {/* 2. CENTER-LEFT: Main View Switcher (Vitrin vs İhtiyaç Panosu) */}
            <nav className="hidden md:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shrink-0">
              <button
                type="button"
                onClick={() => setActiveMainTab("vitrin")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                  activeMainTab === "vitrin"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShoppingBag
                  className={`w-4 h-4 ${
                    activeMainTab === "vitrin"
                      ? "text-emerald-600"
                      : "text-slate-500"
                  }`}
                />
                <span>🛍️ Vitrin</span>
                <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-bold">
                  {products.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMainTab("wishboard")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                  activeMainTab === "wishboard"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Pin
                  className={`w-4 h-4 ${
                    activeMainTab === "wishboard"
                      ? "text-emerald-600"
                      : "text-slate-500"
                  }`}
                />
                <span>📌 İhtiyaç Panosu</span>
              </button>
            </nav>

            {/* 3. CENTER: Global Search Bar */}
            <div className="flex-1 max-w-md hidden sm:block">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Lab önlüğü, hesap makinesi, ders kitabı ara..."
                  className="w-full pl-10 pr-8 py-2.5 text-xs lg:text-sm rounded-xl bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200/80 focus:border-emerald-500 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md"
                    title="Aramayı Temizle"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* 4. RIGHT: Action & User Area */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Primary CTA Button: "+ İlan Ekle" */}
              <button
                type="button"
                onClick={() =>
                  openAddListingModal(
                    activeMainTab === "wishboard" ? "need" : "product"
                  )
                }
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>İlan Ekle</span>
              </button>

              {/* Notifications / Offers Bell Icon */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifOpen((prev) => !prev);
                    setIsProfileOpen(false);
                  }}
                  className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-700 border border-slate-200/80 transition-colors cursor-pointer"
                  title="Bildirimler, Teklifler ve Mesajlar"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Bildirimler & Teklifler
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Teklif, rezervasyon ve ihtiyaç yanıtların
                        </p>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllNotificationsRead}
                          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                        >
                          Tümünü Okundu İşaretle
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400">
                          Henüz yeni bildiriminiz bulunmuyor.
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <button
                            key={notif.id}
                            type="button"
                            onClick={() => {
                              markNotificationRead(notif.id);
                              setIsNotifOpen(false);
                              if (notif.targetDashboardTab) {
                                openDashboard(notif.targetDashboardTab);
                              } else if (notif.relatedProductId) {
                                const prod = products.find(
                                  (p) => p.id === notif.relatedProductId
                                );
                                if (prod) setSelectedProduct(prod);
                              }
                            }}
                            className={`w-full p-3.5 text-left hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer ${
                              !notif.isRead ? "bg-emerald-50/40" : ""
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                !notif.isRead
                                  ? "bg-emerald-500"
                                  : "bg-slate-300"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-slate-900 truncate">
                                  {notif.title}
                                </span>
                                <span className="text-[10px] text-slate-400 shrink-0">
                                  {notif.createdAt}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                                {notif.body}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>

                    <div className="p-2.5 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsNotifOpen(false);
                          openDashboard("offers_reservations");
                        }}
                        className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-700 border border-slate-200 transition-colors cursor-pointer"
                      >
                        Teklif & Rezerveler ({pendingIncomingOffersCount + pendingIncomingResCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsNotifOpen(false);
                          openDashboard("messages");
                        }}
                        className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-700 border border-slate-200 transition-colors cursor-pointer"
                      >
                        Mesajlarım ({directMessages.length})
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Dropdown / Avatar */}
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen((prev) => !prev);
                    setIsNotifOpen(false);
                  }}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 transition-colors cursor-pointer"
                >
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName}
                      className="w-8 h-8 rounded-lg object-cover border border-emerald-500/40"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center">
                      {getInitials(currentUser.fullName)}
                    </div>
                  )}
                  <div className="hidden lg:block text-left max-w-[130px]">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.fullName || "AGÜ Öğrencisi"}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {currentUser.department || "Bölüm Seçilmedi"}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-3.5 bg-slate-50 border-b border-slate-200">
                      <div className="text-xs font-bold text-slate-900">
                        {currentUser.fullName}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium">
                        {currentUser.department}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {currentUser.email}
                      </div>
                    </div>

                    <div className="p-1.5 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          openDashboard("my_products");
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          <UserIcon className="w-4 h-4 text-emerald-600" />
                          Profilim & Vitrin İlanlarım
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          openDashboard("my_needs");
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-emerald-600" />
                          İhtiyaç İlanlarım
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          openDashboard("offers_reservations");
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          <Tag className="w-4 h-4 text-emerald-600" />
                          Tekliflerim & Rezervelerim
                        </span>
                        {pendingIncomingOffersCount + pendingIncomingResCount >
                          0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {pendingIncomingOffersCount +
                              pendingIncomingResCount}
                          </span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          openDashboard("messages");
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                          Mesajlarım ("Bende Var")
                        </span>
                        {unreadMessagesCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                            {unreadMessagesCount}
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="p-1.5 border-t border-slate-100 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          resetDemoData();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                        <span>Demo Verilerini Sıfırla</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile View Switcher & Mobile Search Bar */}
          <div className="pb-3 space-y-2.5 md:hidden">
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveMainTab("vitrin")}
                className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                  activeMainTab === "vitrin"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600"
                }`}
              >
                <span>🛍️ Vitrin ({products.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab("wishboard")}
                className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                  activeMainTab === "wishboard"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600"
                }`}
              >
                <span>📌 İhtiyaç Panosu</span>
              </button>
            </div>

            <div className="relative sm:hidden">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Lab önlüğü, hesap makinesi, ders kitabı ara..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 text-slate-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Floating Action Button (FAB) for "+ İlan Ekle" */}
      <button
        type="button"
        onClick={() =>
          openAddListingModal(
            activeMainTab === "wishboard" ? "need" : "product"
          )
        }
        className="md:hidden fixed bottom-5 right-5 z-30 flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 border border-emerald-400/30 cursor-pointer"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>+ İlan Ekle</span>
      </button>
    </>
  );
}
