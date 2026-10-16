export type ProductCategory =
  | "all"
  | "textbooks"
  | "lab_stationery"
  | "electronics"
  | "campus_life"
  | "clothing_upcycling";

export type ProductCondition = "like_new" | "good" | "fair";

export type ProductStatus = "available" | "reserved" | "sold";

export type CampusHandoverPoint =
  | "Kütüphane Önü"
  | "Çelik Kafe"
  | "Büyük Amfi Önü"
  | "Mühendislik Binası"
  | "Yemekhane Girişi"
  | "Fabrikalar Binası";

export interface User {
  id: string;
  email: string;
  fullName: string;
  department: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  completedSwaps: number;
  joinedAt: string;
  isVerifiedAgu: boolean;
  needsOnboarding?: boolean;
}

export interface QuestionAnswer {
  id: string;
  productId: string;
  askerId: string;
  askerName: string;
  askerDepartment: string;
  askerAvatar?: string;
  question: string;
  createdAt: string;
  answer?: string;
  answeredAt?: string;
  sellerName?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: number; // 0 means ÜCRETSİZ (Free / Donation)
  isFree: boolean;
  category: Exclude<ProductCategory, "all">;
  condition: ProductCondition;
  status: ProductStatus;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerDepartment: string;
  sellerAvatar?: string;
  sellerRating: number;
  handoverPoint: CampusHandoverPoint;
  createdAt: string;
  favoriteCount: number;
  favoritedBy: string[];
  questions: QuestionAnswer[];
  courseCode?: string;
  reservedBy?: string;
  reservedByName?: string;
  reservedNote?: string;
}

export type OfferStatus = "pending" | "accepted" | "rejected";

export interface Offer {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  originalPrice: number;
  offeredPrice: number;
  buyerId: string;
  buyerName: string;
  buyerDepartment: string;
  buyerAvatar?: string;
  sellerId: string;
  sellerName: string;
  note?: string;
  status: OfferStatus;
  createdAt: string;
}

export type ReservationStatus = "pending" | "approved" | "completed" | "cancelled";

export interface Reservation {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productPrice: number;
  buyerId: string;
  buyerName: string;
  buyerDepartment: string;
  buyerAvatar?: string;
  sellerId: string;
  sellerName: string;
  handoverPoint: CampusHandoverPoint;
  proposedTime: string;
  pickupNote: string;
  status: ReservationStatus;
  createdAt: string;
}

export type NeedUrgency = "urgent_lab" | "this_week" | "normal";

export type BudgetPreferenceType = "max_price" | "free_borrow" | "negotiable";

export interface NeedPost {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterDepartment: string;
  requesterAvatar?: string;
  title: string;
  description: string;
  category: Exclude<ProductCategory, "all">;
  urgency: NeedUrgency;
  budgetType: BudgetPreferenceType;
  maxBudget?: number;
  budgetLabel: string;
  handoverPreference: CampusHandoverPoint;
  courseCode?: string;
  createdAt: string;
  status: "open" | "fulfilled";
  responseCount: number;
}

export interface DirectMessageReply {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
}

export interface DirectMessage {
  id: string;
  needPostId: string;
  needPostTitle: string;
  senderId: string;
  senderName: string;
  senderDepartment: string;
  senderAvatar?: string;
  receiverId: string;
  receiverName: string;
  receiverDepartment: string;
  message: string;
  linkedProductId?: string;
  linkedProductTitle?: string;
  linkedProductPrice?: number;
  linkedProductImage?: string;
  proposedPrice?: number;
  isFreeOffer: boolean;
  handoverPoint: CampusHandoverPoint;
  createdAt: string;
  isRead: boolean;
  replies: DirectMessageReply[];
}

export interface AppNotification {
  id: string;
  userId: string;
  type: "offer" | "reservation" | "need_response" | "question" | "system";
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  targetDashboardTab?: "my_products" | "my_needs" | "offers_reservations" | "messages";
  relatedProductId?: string;
}
