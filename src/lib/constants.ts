import {
  CampusHandoverPoint,
  NeedUrgency,
  ProductCategory,
  ProductCondition,
} from "@/types";

/**
 * GLOBAL CONFIGURABLE APP NAME CONSTANT
 * Change this single constant to rename the platform across the entire application.
 */
export const APP_NAME = "Hand2Hand";

export const APP_SUBTITLE = "AGU Kampüs İçi Sürdürülebilir Paylaşım & İhtiyaç Platformu";
export const CAMPUS_BADGE = "AGU Sümer Campus";
export const ALLOWED_EMAIL_DOMAIN = "@agu.edu.tr";
export const AGU_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@agu\.edu\.tr$/i;

export const SDG_GOALS = [
  {
    code: "SDG 4",
    title: "Nitelikli Eğitim",
    enTitle: "Quality Education",
    color: "bg-rose-600 text-white",
    lightColor: "bg-rose-50 text-rose-700 border-rose-200",
    description:
      "Ders materyallerine, laboratuvar ekipmanlarına ve akademik kaynaklara her öğrencinin eşit ve ekonomik erişimi.",
  },
  {
    code: "SDG 12",
    title: "Sorumlu Üretim ve Tüketim",
    enTitle: "Responsible Consumption & Production",
    color: "bg-amber-600 text-white",
    lightColor: "bg-amber-50 text-amber-800 border-amber-200",
    description:
      "Kampüs içinde döngüsel ekonomi oluşturarak tek dönemlik malzeme israfını sıfıra indirmek.",
  },
];

export const AGU_DEPARTMENTS: string[] = [
  "Bilgisayar Mühendisliği",
  "Endüstri Mühendisliği",
  "Elektrik-Elektronik Mühendisliği",
  "Makine Mühendisliği",
  "İnşaat Mühendisliği",
  "Mimarlık",
  "Moleküler Biyoloji ve Genetik",
  "Biyomühendislik",
  "İşletme",
  "Ekonomi",
  "Psikoloji",
  "Siyaset Bilimi ve Uluslararası İlişkiler",
  "Malzeme Bilimi ve Nanoteknoloji Mühendisliği",
  "Hazırlık Okulu (AGÜ-İngilizce)",
];

export const CATEGORIES: {
  id: ProductCategory;
  label: string;
  shortLabel: string;
  description: string;
  iconName: string;
}[] = [
  {
    id: "all",
    label: "Tümü",
    shortLabel: "Tümü",
    description: "Kampüsteki tüm aktif vitrin ilanları",
    iconName: "LayoutGrid",
  },
  {
    id: "textbooks",
    label: "Ders Kitapları & Notlar",
    shortLabel: "Kitap & Not",
    description: "Calculus, Fizik, GLB, Mühendislik kitapları ve çıkmış özetler",
    iconName: "BookOpen",
  },
  {
    id: "lab_stationery",
    label: "Laboratuvar & Kırtasiye",
    shortLabel: "Lab & Kırtasiye",
    description: "Lab önlüğü, koruyucu gözlük, bilimsel hesap makinesi, T-cetveli",
    iconName: "FlaskConical",
  },
  {
    id: "electronics",
    label: "Elektronik & Proje Malzemeleri",
    shortLabel: "Elektronik & Proje",
    description: "Arduino, sensörler, breadboard, multimetre, kablo ve donanım",
    iconName: "Cpu",
  },
  {
    id: "campus_life",
    label: "Kampüs Yaşam & Hobi",
    shortLabel: "Kampüs & Yurt",
    description: "Yurt eşyaları, masa lambası, spor ekipmanları, tuval ve boya",
    iconName: "Coffee",
  },
  {
    id: "clothing_upcycling",
    label: "Giyim & İleri Dönüşüm",
    shortLabel: "Giyim & Dönüşüm",
    description: "AGU merch, kampüs tekstili ve ileri dönüşüm tasarım ürünleri",
    iconName: "Shirt",
  },
];

export const PRODUCT_CONDITIONS: {
  id: ProductCondition;
  label: string;
  badgeClass: string;
  description: string;
}[] = [
  {
    id: "like_new",
    label: "Yeni Gibi",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Hiç kullanılmamış veya sadece 1-2 kez özenle kullanılmış.",
  },
  {
    id: "good",
    label: "İyi Durumda",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
    description: "Bir dönem kullanılmış, tüm fonksiyonları eksiksiz ve temiz.",
  },
  {
    id: "fair",
    label: "Kullanılmış",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    description: "Normal kullanım izleri var ancak ders/lab için tamamen işlevsel.",
  },
];

export const CAMPUS_HANDOVER_POINTS: {
  id: CampusHandoverPoint;
  label: string;
  zone: string;
}[] = [
  {
    id: "Kütüphane Önü",
    label: "Sümer Kampüsü Kütüphane Önü",
    zone: "Merkez Kampüs - Ana Çalışma Alanı",
  },
  {
    id: "Çelik Kafe",
    label: "Çelik Kafe",
    zone: "Sosyal Alan & Kahve Noktası",
  },
  {
    id: "Büyük Amfi Önü",
    label: "Büyük Amfi Önü",
    zone: "Derslikler & Amfi Meydanı",
  },
  {
    id: "Mühendislik Binası",
    label: "Mühendislik Binası Girişi",
    zone: "Lablar & Bölüm Ofisleri",
  },
  {
    id: "Yemekhane Girişi",
    label: "Yemekhane Girişi",
    zone: "Öğle Molası Buluşma Noktası",
  },
  {
    id: "Fabrikalar Binası",
    label: "Fabrikalar Binası",
    zone: "Tarihi Sümerbank Kampüs Koridoru",
  },
];

export const NEED_URGENCY_CONFIG: Record<
  NeedUrgency,
  { label: string; badgeClass: string; dotClass: string }
> = {
  urgent_lab: {
    label: "Acil - Yarın Lab Var",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    dotClass: "bg-rose-500 animate-pulse",
  },
  this_week: {
    label: "Bu Hafta Lazım",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    dotClass: "bg-amber-500",
  },
  normal: {
    label: "Normal",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    dotClass: "bg-slate-400",
  },
};

export const PRESET_ITEM_IMAGES: {
  label: string;
  category: Exclude<ProductCategory, "all">;
  url: string;
}[] = [
  {
    label: "Bilimsel Hesap Makinesi",
    category: "lab_stationery",
    url: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Kimya / Biyoloji Lab Önlüğü",
    category: "lab_stationery",
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Üniversite Ders Kitabı & Notlar",
    category: "textbooks",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Arduino & Elektronik Devre Seti",
    category: "electronics",
    url: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Mimarlık Çizim & Cetvel Seti",
    category: "lab_stationery",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Kablosuz Klavye & Çalışma Ekipmanı",
    category: "electronics",
    url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Yurt Masa Lambası & Aksesuar",
    category: "campus_life",
    url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Kampüs Hoodie / Sweatshirt",
    category: "clothing_upcycling",
    url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
  },
];
