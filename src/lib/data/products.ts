export interface Product {
  id: number
  name: string
  cat: string
  price: string
  old: string | null
  rating: number
  reviews: number
  badge: string | null
  badgeColor: string | null
  imgBg: string
  imgFg: string
  imgText: string
}

export const bestSellers: Product[] = [
  { id: 1, name: "Oxford Classic", cat: "Men · Formal", price: "৳2,499", old: "৳2,999", rating: 4.5, reviews: 124, badge: "Best Seller", badgeColor: "#D4A017", imgBg: "e8eaf6", imgFg: "1A2B5E", imgText: "Oxford" },
  { id: 2, name: "Loafer Pro", cat: "Men · Casual", price: "৳1,899", old: null, rating: 4.3, reviews: 89, badge: "New", badgeColor: "#16a34a", imgBg: "dcfce7", imgFg: "166534", imgText: "Loafer" },
  { id: 3, name: "Sneaker Elite", cat: "Unisex · Sport", price: "৳3,299", old: "৳3,999", rating: 4.7, reviews: 203, badge: "Hot", badgeColor: "#ef4444", imgBg: "fff7ed", imgFg: "92400e", imgText: "Sneaker" },
  { id: 4, name: "Derby Formal", cat: "Men · Formal", price: "৳2,799", old: null, rating: 4.4, reviews: 67, badge: null, badgeColor: null, imgBg: "f0fdf4", imgFg: "166534", imgText: "Derby" },
  { id: 5, name: "Comfort Sandal", cat: "Women · Casual", price: "৳1,299", old: "৳1,599", rating: 4.2, reviews: 156, badge: "Sale 20%", badgeColor: "#ef4444", imgBg: "fdf2f8", imgFg: "86198f", imgText: "Sandal" },
  { id: 6, name: "Ranger Boot", cat: "Men · Boots", price: "৳3,999", old: null, rating: 4.6, reviews: 91, badge: "Premium", badgeColor: "#1A2B5E", imgBg: "f5f5f5", imgFg: "374151", imgText: "Boot" },
  { id: 7, name: "Ballet Flat", cat: "Women · Flats", price: "৳1,499", old: "৳1,899", rating: 4.3, reviews: 112, badge: "Sale", badgeColor: "#ef4444", imgBg: "fdf4ff", imgFg: "7c3aed", imgText: "Ballet" },
  { id: 8, name: "Kids Runner", cat: "Kids · Sport", price: "৳1,199", old: null, rating: 4.5, reviews: 78, badge: "New", badgeColor: "#16a34a", imgBg: "eff6ff", imgFg: "1d4ed8", imgText: "Kids" },
]

export const newArrivals: Product[] = [
  { id: 9, name: "Chelsea Boot", cat: "Men · Boots", price: "৳4,299", old: null, rating: 4.6, reviews: 23, badge: "New", badgeColor: "#16a34a", imgBg: "f0fdf4", imgFg: "166534", imgText: "Chelsea" },
  { id: 10, name: "Wedge Sandal", cat: "Women · Heels", price: "৳2,199", old: "৳2,799", rating: 4.4, reviews: 31, badge: "New", badgeColor: "#16a34a", imgBg: "fdf2f8", imgFg: "86198f", imgText: "Wedge" },
  { id: 11, name: "Slip-On Max", cat: "Unisex · Casual", price: "৳1,699", old: null, rating: 4.2, reviews: 18, badge: "New", badgeColor: "#16a34a", imgBg: "fff7ed", imgFg: "92400e", imgText: "SlipOn" },
  { id: 12, name: "First Steps", cat: "Newborn · 0-12m", price: "৳899", old: "৳1,099", rating: 4.8, reviews: 45, badge: "Trending", badgeColor: "#D4A017", imgBg: "eff6ff", imgFg: "1d4ed8", imgText: "Newborn" },
  { id: 13, name: "Platform Sneaker", cat: "Women · Sneakers", price: "৳2,899", old: null, rating: 4.5, reviews: 29, badge: "New", badgeColor: "#16a34a", imgBg: "fdf4ff", imgFg: "7c3aed", imgText: "Platform" },
  { id: 14, name: "Driving Moc", cat: "Men · Casual", price: "৳2,299", old: "৳2,699", rating: 4.3, reviews: 37, badge: "New", badgeColor: "#16a34a", imgBg: "e8eaf6", imgFg: "1A2B5E", imgText: "Moccasin" },
  { id: 15, name: "Sport Sandal", cat: "Kids · Outdoors", price: "৳999", old: null, rating: 4.4, reviews: 52, badge: "New", badgeColor: "#16a34a", imgBg: "dcfce7", imgFg: "166534", imgText: "SportSandal" },
  { id: 16, name: "Ankle Strap", cat: "Women · Heels", price: "৳1,999", old: "৳2,499", rating: 4.6, reviews: 19, badge: "New", badgeColor: "#16a34a", imgBg: "fdf2f8", imgFg: "86198f", imgText: "AnkleStrap" },
]

export const flashSaleProducts: Product[] = [
  { id: 17, name: "Power Sneaker", cat: "Men · Sport", price: "৳1,999", old: "৳3,499", rating: 4.5, reviews: 89, badge: "SALE 43%", badgeColor: "#ef4444", imgBg: "f5f5f5", imgFg: "999999", imgText: "Shoe" },
  { id: 18, name: "Heel Pump", cat: "Women · Heels", price: "৳1,499", old: "৳2,799", rating: 4.4, reviews: 67, badge: "SALE 46%", badgeColor: "#ef4444", imgBg: "f5f5f5", imgFg: "999999", imgText: "Shoe" },
  { id: 19, name: "Leather Moccasin", cat: "Men · Casual", price: "৳2,299", old: "৳3,999", rating: 4.6, reviews: 112, badge: "SALE 42%", badgeColor: "#ef4444", imgBg: "f5f5f5", imgFg: "999999", imgText: "Shoe" },
  { id: 20, name: "Kids School Shoe", cat: "Kids · Formal", price: "৳799", old: "৳1,299", rating: 4.3, reviews: 45, badge: "SALE 38%", badgeColor: "#ef4444", imgBg: "f5f5f5", imgFg: "999999", imgText: "Shoe" },
]

// ── Universal PLP product type (extends Product for ProductCard compat) ──

export interface PlpProduct extends Product {
  brand: 'Bata' | 'Hush Puppies' | 'North Star' | 'Bay' | 'Power'
  category: string
  gender: 'men' | 'women' | 'kids' | 'newborn' | 'unisex'
  priceNum: number
  originalPriceNum: number | null
  sizes: number[]
  color: 'Black' | 'White' | 'Brown' | 'Navy' | 'Red' | 'Tan' | 'Grey' | 'Pink' | 'Purple'
  sales: number
  isNew: boolean
  inStock: boolean
  // PDP-specific fields (optional — PDP generates defaults when absent)
  description?: string
  extraColors?: string[]
  unavailableSizes?: number[]
}

export type MenProduct = PlpProduct

export const menProducts: PlpProduct[] = [
  // ── Sneakers (7) ──
  { id: 101, name: "Air Runner X1", brand: "North Star", category: "sneaker", gender: "men", priceNum: 2499, price: "৳2,499", originalPriceNum: 2999, old: "৳2,999", rating: 4.5, reviews: 128, sizes: [38,39,40,41,42], color: "Black", badge: "SALE", badgeColor: "#ef4444", imgBg: "e8f4fd", imgFg: "1A2B5E", imgText: "Sneaker", cat: "Men · Sneaker", sales: 340, isNew: false, inStock: true },
  { id: 102, name: "Flex Pro 3.0", brand: "Power", category: "sneaker", gender: "men", priceNum: 1999, price: "৳1,999", originalPriceNum: null, old: null, rating: 4.3, reviews: 89, sizes: [38,39,40,41,42,43], color: "White", badge: "Best Seller", badgeColor: "#D4A017", imgBg: "f0fdf4", imgFg: "15803d", imgText: "FlexPro", cat: "Men · Sneaker", sales: 420, isNew: false, inStock: true },
  { id: 103, name: "Urban Runner", brand: "Bay", category: "sneaker", gender: "unisex", priceNum: 2999, price: "৳2,999", originalPriceNum: null, old: null, rating: 4.6, reviews: 203, sizes: [37,38,39,40,41,42], color: "Grey", badge: null, badgeColor: null, imgBg: "f8fafc", imgFg: "475569", imgText: "Urban", cat: "Unisex · Sneaker", sales: 280, isNew: false, inStock: true },
  { id: 104, name: "Canvas Classic", brand: "Bata", category: "sneaker", gender: "unisex", priceNum: 1499, price: "৳1,499", originalPriceNum: 1899, old: "৳1,899", rating: 4.1, reviews: 156, sizes: [37,38,39,40,41,42], color: "Navy", badge: "SALE", badgeColor: "#ef4444", imgBg: "eff6ff", imgFg: "1d4ed8", imgText: "Canvas", cat: "Unisex · Sneaker", sales: 390, isNew: false, inStock: true },
  { id: 105, name: "Trail Blazer", brand: "Hush Puppies", category: "sneaker", gender: "men", priceNum: 3299, price: "৳3,299", originalPriceNum: null, old: null, rating: 4.4, reviews: 67, sizes: [39,40,41,42,43], color: "Red", badge: "NEW", badgeColor: "#16a34a", imgBg: "fff1f2", imgFg: "9f1239", imgText: "Trail", cat: "Men · Sneaker", sales: 185, isNew: true, inStock: true },
  { id: 106, name: "High Top Elite", brand: "North Star", category: "sneaker", gender: "men", priceNum: 2699, price: "৳2,699", originalPriceNum: 3299, old: "৳3,299", rating: 4.2, reviews: 91, sizes: [38,39,40,41,42], color: "Navy", badge: null, badgeColor: null, imgBg: "e8f4fd", imgFg: "1A2B5E", imgText: "HighTop", cat: "Men · Sneaker", sales: 195, isNew: false, inStock: true },
  { id: 107, name: "Grid Turbo", brand: "Power", category: "sneaker", gender: "unisex", priceNum: 3499, price: "৳3,499", originalPriceNum: null, old: null, rating: 4.7, reviews: 275, sizes: [37,38,39,40,41,42,43], color: "Grey", badge: "Hot", badgeColor: "#ef4444", imgBg: "f0f9ff", imgFg: "0369a1", imgText: "GridTurbo", cat: "Unisex · Sneaker", sales: 275, isNew: true, inStock: true },
  // ── Loafers (5) ──
  { id: 108, name: "Classic Loafer", brand: "Bay", category: "loafer", gender: "men", priceNum: 1799, price: "৳1,799", originalPriceNum: null, old: null, rating: 4.2, reviews: 98, sizes: [39,40,41,42,43,44], color: "Brown", badge: null, badgeColor: null, imgBg: "fdf6ec", imgFg: "92400e", imgText: "Loafer", cat: "Men · Loafer", sales: 310, isNew: false, inStock: true },
  { id: 109, name: "Comfort Drive", brand: "Hush Puppies", category: "loafer", gender: "men", priceNum: 2499, price: "৳2,499", originalPriceNum: 2999, old: "৳2,999", rating: 4.5, reviews: 112, sizes: [40,41,42,43,44], color: "Tan", badge: null, badgeColor: null, imgBg: "fefce8", imgFg: "713f12", imgText: "ComfortDrv", cat: "Men · Loafer", sales: 245, isNew: false, inStock: true },
  { id: 110, name: "Driver Moc", brand: "Bata", category: "loafer", gender: "men", priceNum: 1999, price: "৳1,999", originalPriceNum: null, old: null, rating: 4.3, reviews: 78, sizes: [39,40,41,42,43], color: "Black", badge: null, badgeColor: null, imgBg: "f8fafc", imgFg: "374151", imgText: "DriverMoc", cat: "Men · Loafer", sales: 275, isNew: false, inStock: true },
  { id: 111, name: "Slip-On Pro", brand: "North Star", category: "loafer", gender: "unisex", priceNum: 1599, price: "৳1,599", originalPriceNum: 1999, old: "৳1,999", rating: 4.0, reviews: 134, sizes: [37,38,39,40,41,42,43], color: "Brown", badge: "SALE", badgeColor: "#ef4444", imgBg: "fdf6ec", imgFg: "92400e", imgText: "SlipOn", cat: "Unisex · Loafer", sales: 360, isNew: false, inStock: true },
  { id: 112, name: "Lounge Master", brand: "Hush Puppies", category: "loafer", gender: "men", priceNum: 2799, price: "৳2,799", originalPriceNum: null, old: null, rating: 4.5, reviews: 57, sizes: [39,40,41,42,43,44], color: "Navy", badge: null, badgeColor: null, imgBg: "ede9fe", imgFg: "4338ca", imgText: "Lounge", cat: "Men · Loafer", sales: 205, isNew: false, inStock: true },
  // ── Sandals (3) ──
  { id: 113, name: "Sport Slide", brand: "Bata", category: "sandal", gender: "men", priceNum: 999, price: "৳999", originalPriceNum: 1299, old: "৳1,299", rating: 4.0, reviews: 201, sizes: [39,40,41,42,43], color: "Brown", badge: "SALE", badgeColor: "#ef4444", imgBg: "fff7ed", imgFg: "c2410c", imgText: "Slide", cat: "Men · Sandal", sales: 520, isNew: false, inStock: true },
  { id: 114, name: "Outdoor Slide", brand: "Power", category: "sandal", gender: "men", priceNum: 799, price: "৳799", originalPriceNum: 1199, old: "৳1,199", rating: 3.8, reviews: 287, sizes: [39,40,41,42,43,44], color: "Black", badge: "SALE 33%", badgeColor: "#ef4444", imgBg: "f0fdf4", imgFg: "15803d", imgText: "OutdoorSlide", cat: "Men · Sandal", sales: 680, isNew: false, inStock: true },
  { id: 115, name: "Beach Walker", brand: "North Star", category: "sandal", gender: "men", priceNum: 1199, price: "৳1,199", originalPriceNum: null, old: null, rating: 4.2, reviews: 89, sizes: [40,41,42,43], color: "Tan", badge: null, badgeColor: null, imgBg: "fff7ed", imgFg: "c2410c", imgText: "Beach", cat: "Men · Sandal", sales: 410, isNew: false, inStock: true },
  // ── Boots (5) ──
  { id: 116, name: "Chelsea Boot", brand: "Power", category: "boot", gender: "men", priceNum: 3999, price: "৳3,999", originalPriceNum: 4999, old: "৳4,999", rating: 4.5, reviews: 67, sizes: [40,41,42,43,44], color: "Black", badge: null, badgeColor: null, imgBg: "f1f5f9", imgFg: "374151", imgText: "Chelsea", cat: "Men · Boot", sales: 165, isNew: false, inStock: true },
  { id: 117, name: "Desert Trek", brand: "Bay", category: "boot", gender: "men", priceNum: 3299, price: "৳3,299", originalPriceNum: null, old: null, rating: 4.4, reviews: 45, sizes: [40,41,42,43,44,45], color: "Tan", badge: null, badgeColor: null, imgBg: "fdf6ec", imgFg: "92400e", imgText: "DesertTrek", cat: "Men · Boot", sales: 155, isNew: false, inStock: true },
  { id: 118, name: "Trekker Pro", brand: "Bata", category: "boot", gender: "men", priceNum: 3699, price: "৳3,699", originalPriceNum: 4499, old: "৳4,499", rating: 4.3, reviews: 56, sizes: [40,41,42,43,44], color: "Brown", badge: null, badgeColor: null, imgBg: "f1f5f9", imgFg: "374151", imgText: "Trekker", cat: "Men · Boot", sales: 140, isNew: false, inStock: true },
  { id: 119, name: "Chukka Elite", brand: "Hush Puppies", category: "boot", gender: "men", priceNum: 4499, price: "৳4,499", originalPriceNum: null, old: null, rating: 4.6, reviews: 38, sizes: [41,42,43,44], color: "Brown", badge: "Premium", badgeColor: "#1A2B5E", imgBg: "fdf6ec", imgFg: "92400e", imgText: "Chukka", cat: "Men · Boot", sales: 98, isNew: false, inStock: true },
  { id: 120, name: "Work Force Boot", brand: "Bay", category: "boot", gender: "men", priceNum: 4999, price: "৳4,999", originalPriceNum: null, old: null, rating: 4.4, reviews: 29, sizes: [41,42,43,44,45], color: "Black", badge: null, badgeColor: null, imgBg: "f1f5f9", imgFg: "1f2937", imgText: "WorkBoot", cat: "Men · Boot", sales: 85, isNew: false, inStock: true },
  // ── Formal (4) ──
  { id: 121, name: "Oxford Classic", brand: "Bata", category: "formal", gender: "men", priceNum: 2799, price: "৳2,799", originalPriceNum: null, old: null, rating: 4.4, reviews: 124, sizes: [39,40,41,42,43], color: "Black", badge: null, badgeColor: null, imgBg: "ede9fe", imgFg: "1A2B5E", imgText: "Oxford", cat: "Men · Formal", sales: 215, isNew: false, inStock: true },
  { id: 122, name: "Derby Premium", brand: "Hush Puppies", category: "formal", gender: "men", priceNum: 3999, price: "৳3,999", originalPriceNum: 4999, old: "৳4,999", rating: 4.7, reviews: 45, sizes: [40,41,42,43,44], color: "Brown", badge: null, badgeColor: null, imgBg: "ede9fe", imgFg: "4338ca", imgText: "Derby", cat: "Men · Formal", sales: 120, isNew: false, inStock: true },
  { id: 123, name: "Wing Tip Pro", brand: "Bay", category: "formal", gender: "men", priceNum: 3499, price: "৳3,499", originalPriceNum: null, old: null, rating: 4.5, reviews: 78, sizes: [40,41,42,43], color: "Black", badge: null, badgeColor: null, imgBg: "ede9fe", imgFg: "1A2B5E", imgText: "WingTip", cat: "Men · Formal", sales: 175, isNew: false, inStock: true },
  { id: 124, name: "Monk Strap", brand: "North Star", category: "formal", gender: "men", priceNum: 2999, price: "৳2,999", originalPriceNum: 3699, old: "৳3,699", rating: 4.3, reviews: 56, sizes: [40,41,42,43,44], color: "Brown", badge: "NEW", badgeColor: "#16a34a", imgBg: "ede9fe", imgFg: "4338ca", imgText: "MonkStrap", cat: "Men · Formal", sales: 145, isNew: true, inStock: true },
]

// ── Women's Products ──

export const womenProducts: PlpProduct[] = [
  // Flats (3)
  { id: 201, name: "Ballet Flat", brand: "Bata", category: "flat", gender: "women", priceNum: 1299, price: "৳1,299", originalPriceNum: 1599, old: "৳1,599", rating: 4.3, reviews: 187, sizes: [35,36,37,38,39], color: "Black", badge: "SALE", badgeColor: "#ef4444", imgBg: "f8fafc", imgFg: "374151", imgText: "BalletFlat", cat: "Women · Flat", sales: 420, isNew: false, inStock: true },
  { id: 207, name: "Mary Jane", brand: "Bata", category: "flat", gender: "women", priceNum: 999, price: "৳999", originalPriceNum: null, old: null, rating: 4.1, reviews: 278, sizes: [35,36,37,38,39,40], color: "Black", badge: null, badgeColor: null, imgBg: "f8fafc", imgFg: "374151", imgText: "MaryJane", cat: "Women · Flat", sales: 520, isNew: false, inStock: true },
  { id: 211, name: "Floral Flat", brand: "Bata", category: "flat", gender: "women", priceNum: 1099, price: "৳1,099", originalPriceNum: null, old: null, rating: 4.2, reviews: 143, sizes: [35,36,37,38,39], color: "Pink", badge: "NEW", badgeColor: "#16a34a", imgBg: "fdf2f8", imgFg: "86198f", imgText: "FloralFlat", cat: "Women · Flat", sales: 230, isNew: true, inStock: true },
  // Heels (3)
  { id: 202, name: "Heel Pump", brand: "Hush Puppies", category: "heel", gender: "women", priceNum: 2499, price: "৳2,499", originalPriceNum: null, old: null, rating: 4.4, reviews: 134, sizes: [36,37,38,39,40], color: "Tan", badge: null, badgeColor: null, imgBg: "fdf6ec", imgFg: "92400e", imgText: "HeelPump", cat: "Women · Heel", sales: 280, isNew: false, inStock: true },
  { id: 206, name: "Stiletto Pump", brand: "Hush Puppies", category: "heel", gender: "women", priceNum: 3499, price: "৳3,499", originalPriceNum: 4499, old: "৳4,499", rating: 4.6, reviews: 45, sizes: [35,36,37,38,39], color: "Red", badge: null, badgeColor: null, imgBg: "fff1f2", imgFg: "9f1239", imgText: "Stiletto", cat: "Women · Heel", sales: 98, isNew: false, inStock: true },
  { id: 212, name: "Glam Heel", brand: "Hush Puppies", category: "heel", gender: "women", priceNum: 2999, price: "৳2,999", originalPriceNum: 3599, old: "৳3,599", rating: 4.4, reviews: 67, sizes: [36,37,38,39], color: "Purple", badge: null, badgeColor: null, imgBg: "fdf4ff", imgFg: "7c3aed", imgText: "GlamHeel", cat: "Women · Heel", sales: 120, isNew: false, inStock: true },
  // Sneakers (2)
  { id: 203, name: "Women Runner", brand: "North Star", category: "sneaker", gender: "women", priceNum: 2199, price: "৳2,199", originalPriceNum: null, old: null, rating: 4.5, reviews: 89, sizes: [35,36,37,38,39,40], color: "White", badge: "NEW", badgeColor: "#16a34a", imgBg: "f0fdf4", imgFg: "15803d", imgText: "WmnRunner", cat: "Women · Sneaker", sales: 195, isNew: true, inStock: true },
  { id: 208, name: "Platform Sneaker", brand: "North Star", category: "sneaker", gender: "women", priceNum: 2799, price: "৳2,799", originalPriceNum: null, old: null, rating: 4.6, reviews: 56, sizes: [36,37,38,39,40], color: "White", badge: "Hot", badgeColor: "#ef4444", imgBg: "f0fdf4", imgFg: "15803d", imgText: "PlatformSneaker", cat: "Women · Sneaker", sales: 175, isNew: true, inStock: true },
  // Sandals (2)
  { id: 204, name: "Strappy Sandal", brand: "Bay", category: "sandal", gender: "women", priceNum: 1599, price: "৳1,599", originalPriceNum: 1999, old: "৳1,999", rating: 4.2, reviews: 212, sizes: [36,37,38,39], color: "Brown", badge: "SALE", badgeColor: "#ef4444", imgBg: "fff7ed", imgFg: "c2410c", imgText: "StrapSandal", cat: "Women · Sandal", sales: 340, isNew: false, inStock: true },
  { id: 209, name: "Wedge Sandal", brand: "Bay", category: "sandal", gender: "women", priceNum: 1799, price: "৳1,799", originalPriceNum: 2299, old: "৳2,299", rating: 4.3, reviews: 98, sizes: [36,37,38,39,40], color: "Tan", badge: "SALE", badgeColor: "#ef4444", imgBg: "fff7ed", imgFg: "c2410c", imgText: "WedgeSandal", cat: "Women · Sandal", sales: 265, isNew: false, inStock: true },
  // Boots (2)
  { id: 205, name: "Ankle Boot", brand: "Power", category: "boot", gender: "women", priceNum: 3299, price: "৳3,299", originalPriceNum: null, old: null, rating: 4.4, reviews: 67, sizes: [36,37,38,39,40], color: "Black", badge: null, badgeColor: null, imgBg: "f1f5f9", imgFg: "374151", imgText: "AnkleBoot", cat: "Women · Boot", sales: 145, isNew: false, inStock: true },
  { id: 210, name: "Chelsea Boot W", brand: "Power", category: "boot", gender: "women", priceNum: 3999, price: "৳3,999", originalPriceNum: null, old: null, rating: 4.5, reviews: 34, sizes: [36,37,38,39], color: "Brown", badge: "Premium", badgeColor: "#1A2B5E", imgBg: "fdf6ec", imgFg: "92400e", imgText: "ChelseaBootW", cat: "Women · Boot", sales: 85, isNew: false, inStock: true },
]

// ── Kids' Products ──

export const kidsProducts: PlpProduct[] = [
  // School (3)
  { id: 301, name: "School Runner", brand: "Bata", category: "school", gender: "kids", priceNum: 1199, price: "৳1,199", originalPriceNum: null, old: null, rating: 4.4, reviews: 245, sizes: [28,29,30,31,32,33], color: "Black", badge: null, badgeColor: null, imgBg: "f8fafc", imgFg: "374151", imgText: "SchoolRunner", cat: "Kids · School", sales: 580, isNew: false, inStock: true },
  { id: 306, name: "School Formal", brand: "Bata", category: "school", gender: "kids", priceNum: 999, price: "৳999", originalPriceNum: 1299, old: "৳1,299", rating: 4.3, reviews: 198, sizes: [28,29,30,31,32], color: "Black", badge: "SALE", badgeColor: "#ef4444", imgBg: "f8fafc", imgFg: "374151", imgText: "SchoolFormal", cat: "Kids · School", sales: 510, isNew: false, inStock: true },
  { id: 309, name: "Grow Fit", brand: "Hush Puppies", category: "school", gender: "kids", priceNum: 1499, price: "৳1,499", originalPriceNum: null, old: null, rating: 4.6, reviews: 134, sizes: [30,31,32,33,34,35,36], color: "Black", badge: null, badgeColor: null, imgBg: "f8fafc", imgFg: "374151", imgText: "GrowFit", cat: "Kids · School", sales: 340, isNew: false, inStock: true },
  // Sneakers (3)
  { id: 302, name: "Kids Sneaker X", brand: "North Star", category: "sneaker", gender: "kids", priceNum: 1399, price: "৳1,399", originalPriceNum: null, old: null, rating: 4.5, reviews: 178, sizes: [29,30,31,32,33,34], color: "White", badge: "Best Seller", badgeColor: "#D4A017", imgBg: "f0fdf4", imgFg: "15803d", imgText: "KidsSneaker", cat: "Kids · Sneaker", sales: 420, isNew: false, inStock: true },
  { id: 305, name: "Sport Shoe", brand: "Hush Puppies", category: "sneaker", gender: "kids", priceNum: 1299, price: "৳1,299", originalPriceNum: null, old: null, rating: 4.4, reviews: 167, sizes: [30,31,32,33,34,35], color: "Navy", badge: null, badgeColor: null, imgBg: "eff6ff", imgFg: "1d4ed8", imgText: "SportShoe", cat: "Kids · Sneaker", sales: 290, isNew: false, inStock: true },
  { id: 308, name: "Doodle Sneaker", brand: "Bay", category: "sneaker", gender: "kids", priceNum: 1099, price: "৳1,099", originalPriceNum: null, old: null, rating: 4.5, reviews: 78, sizes: [29,30,31,32,33,34], color: "White", badge: "NEW", badgeColor: "#16a34a", imgBg: "f0fdf4", imgFg: "15803d", imgText: "DoodleSneaker", cat: "Kids · Sneaker", sales: 150, isNew: true, inStock: true },
  // Sandals (2)
  { id: 303, name: "Velcro Sandal", brand: "Bay", category: "sandal", gender: "kids", priceNum: 899, price: "৳899", originalPriceNum: 1199, old: "৳1,199", rating: 4.2, reviews: 312, sizes: [28,29,30,31,32], color: "Brown", badge: "SALE", badgeColor: "#ef4444", imgBg: "fff7ed", imgFg: "c2410c", imgText: "VelcroSandal", cat: "Kids · Sandal", sales: 350, isNew: false, inStock: true },
  { id: 307, name: "Kids Slide", brand: "North Star", category: "sandal", gender: "kids", priceNum: 799, price: "৳799", originalPriceNum: null, old: null, rating: 4.0, reviews: 423, sizes: [28,29,30,31,32,33], color: "Grey", badge: null, badgeColor: null, imgBg: "f1f5f9", imgFg: "6b7280", imgText: "KidsSlide", cat: "Kids · Sandal", sales: 620, isNew: false, inStock: true },
  // Boots (2)
  { id: 304, name: "Rain Boot", brand: "Power", category: "boot", gender: "kids", priceNum: 1599, price: "৳1,599", originalPriceNum: null, old: null, rating: 4.3, reviews: 89, sizes: [29,30,31,32,33], color: "Red", badge: null, badgeColor: null, imgBg: "fff1f2", imgFg: "9f1239", imgText: "RainBoot", cat: "Kids · Boot", sales: 180, isNew: false, inStock: true },
  { id: 310, name: "Jungle Boot", brand: "Power", category: "boot", gender: "kids", priceNum: 1799, price: "৳1,799", originalPriceNum: 2299, old: "৳2,299", rating: 4.2, reviews: 56, sizes: [31,32,33,34,35], color: "Brown", badge: null, badgeColor: null, imgBg: "fdf6ec", imgFg: "92400e", imgText: "JungleBoot", cat: "Kids · Boot", sales: 95, isNew: false, inStock: true },
]

// ── Newborn Products ──

export const newbornProducts: PlpProduct[] = [
  // Booties (4)
  { id: 401, name: "First Bootie", brand: "Bata", category: "bootie", gender: "newborn", priceNum: 699, price: "৳699", originalPriceNum: null, old: null, rating: 4.6, reviews: 156, sizes: [16,17,18], color: "White", badge: null, badgeColor: null, imgBg: "eff6ff", imgFg: "1d4ed8", imgText: "FirstBootie", cat: "Newborn · Bootie", sales: 380, isNew: false, inStock: true },
  { id: 402, name: "Soft Step", brand: "Hush Puppies", category: "bootie", gender: "newborn", priceNum: 799, price: "৳799", originalPriceNum: null, old: null, rating: 4.7, reviews: 89, sizes: [16,17,18,19], color: "Pink", badge: "NEW", badgeColor: "#16a34a", imgBg: "fdf2f8", imgFg: "86198f", imgText: "SoftStep", cat: "Newborn · Bootie", sales: 210, isNew: true, inStock: true },
  { id: 405, name: "Bunny Bootie", brand: "Power", category: "bootie", gender: "newborn", priceNum: 649, price: "৳649", originalPriceNum: null, old: null, rating: 4.3, reviews: 145, sizes: [16,17,18,19], color: "White", badge: null, badgeColor: null, imgBg: "f0f9ff", imgFg: "0369a1", imgText: "BunnyBootie", cat: "Newborn · Bootie", sales: 320, isNew: false, inStock: true },
  { id: 407, name: "Tiny Boot", brand: "Hush Puppies", category: "bootie", gender: "newborn", priceNum: 749, price: "৳749", originalPriceNum: null, old: null, rating: 4.4, reviews: 78, sizes: [17,18,19,20], color: "Brown", badge: null, badgeColor: null, imgBg: "fdf6ec", imgFg: "92400e", imgText: "TinyBoot", cat: "Newborn · Bootie", sales: 165, isNew: false, inStock: true },
  // Sandals (1)
  { id: 403, name: "Mini Sandal", brand: "North Star", category: "sandal", gender: "newborn", priceNum: 599, price: "৳599", originalPriceNum: null, old: null, rating: 4.4, reviews: 123, sizes: [17,18,19], color: "Tan", badge: null, badgeColor: null, imgBg: "fff7ed", imgFg: "c2410c", imgText: "MiniSandal", cat: "Newborn · Sandal", sales: 290, isNew: false, inStock: true },
  // Slippers (2)
  { id: 404, name: "Crib Slipper", brand: "Bay", category: "slipper", gender: "newborn", priceNum: 549, price: "৳549", originalPriceNum: 749, old: "৳749", rating: 4.5, reviews: 198, sizes: [16,17,18], color: "Brown", badge: "SALE", badgeColor: "#ef4444", imgBg: "fdf6ec", imgFg: "92400e", imgText: "CribSlipper", cat: "Newborn · Slipper", sales: 450, isNew: false, inStock: true },
  { id: 406, name: "Mary Jane Baby", brand: "Bata", category: "slipper", gender: "newborn", priceNum: 599, price: "৳599", originalPriceNum: null, old: null, rating: 4.5, reviews: 167, sizes: [17,18,19,20], color: "Pink", badge: null, badgeColor: null, imgBg: "fdf2f8", imgFg: "86198f", imgText: "MaryJaneBaby", cat: "Newborn · Slipper", sales: 280, isNew: false, inStock: true },
  // Sneaker (1)
  { id: 408, name: "Infant Sneaker", brand: "North Star", category: "sneaker", gender: "newborn", priceNum: 699, price: "৳699", originalPriceNum: null, old: null, rating: 4.6, reviews: 45, sizes: [18,19,20], color: "White", badge: "NEW", badgeColor: "#16a34a", imgBg: "f0fdf4", imgFg: "15803d", imgText: "InfantSneaker", cat: "Newborn · Sneaker", sales: 140, isNew: true, inStock: true },
]

export const allPlpProducts: PlpProduct[] = [
  ...menProducts,
  ...womenProducts,
  ...kidsProducts,
  ...newbornProducts,
]
