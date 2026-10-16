import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CATEGORIES, PRODUCT_CONDITIONS } from "./constants";
import { ProductCategory, ProductCondition } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  if (!name || !name.trim()) return "AGÜ";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getCategoryLabel(category: ProductCategory): string {
  return CATEGORIES.find((c) => c.id === category)?.label || "Diğer";
}

export function getCategoryShortLabel(category: ProductCategory): string {
  return CATEGORIES.find((c) => c.id === category)?.shortLabel || "Diğer";
}

export function getConditionConfig(condition: ProductCondition) {
  return (
    PRODUCT_CONDITIONS.find((c) => c.id === condition) || PRODUCT_CONDITIONS[0]
  );
}

export function formatPrice(price: number, isFree?: boolean): string {
  if (isFree || price === 0) return "ÜCRETSİZ";
  return `${price.toLocaleString("tr-TR")} ₺`;
}
