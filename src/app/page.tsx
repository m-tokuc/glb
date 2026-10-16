"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { AuthScreen } from "@/components/auth/AuthScreen";
import { OnboardingModal } from "@/components/auth/OnboardingModal";
import { Navbar } from "@/components/layout/Navbar";
import { VitrinView } from "@/components/marketplace/VitrinView";
import { WishboardView } from "@/components/wishboard/WishboardView";
import { AddListingModal } from "@/components/modals/AddListingModal";
import { ProductDetailModal } from "@/components/modals/ProductDetailModal";
import { NeedDetailModal } from "@/components/modals/NeedDetailModal";
import { ProfileDashboardModal } from "@/components/modals/ProfileDashboardModal";
import { ToastContainer } from "@/components/layout/ToastContainer";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const { currentUser, activeMainTab } = useApp();

  // If not authenticated yet, show Phase 1 Split-Screen @agu.edu.tr Authentication Flow
  if (!currentUser) {
    return (
      <>
        <AuthScreen />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Phase 2: Sticky Global Web Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeMainTab === "vitrin" ? <VitrinView /> : <WishboardView />}
      </main>

      {/* Campus Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <OnboardingModal />
      <AddListingModal />
      <ProductDetailModal />
      <NeedDetailModal />
      <ProfileDashboardModal />
      <ToastContainer />
    </div>
  );
}
