"use client";

import { useState, useCallback } from "react";
import { useRouter } from 'next/navigation'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1,  name: "Elysian Hoop Earrings",   price: 29, category: "Earrings",   metal: "Gold",     stone: "Mixed",   image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop&crop=center" },
  { id: 2,  name: "Stardust Ring",            price: 28, category: "Rings",      metal: "Gold",     stone: "Diamond", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop" },
  { id: 3,  name: "Aura Diamond Necklace",    price: 36, category: "Necklaces",  metal: "Silver",   stone: "Diamond", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop" },
  { id: 4,  name: "Moonstone Bracelet",       price: 36, category: "Bracelets",  metal: "Gold",     stone: "Pearl",   image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop" },
  { id: 5,  name: "Moonstone Bracelet Slim",  price: 26, category: "Bracelets",  metal: "Rose Gold",stone: "Pearl",   image: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=300&h=300&fit=crop" },
  { id: 6,  name: "Celestial Necklace",       price: 26, category: "Necklaces",  metal: "Gold",     stone: "Mixed",   image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop" },
  { id: 7,  name: "Aurora Pearl Drop",        price: 42, category: "Earrings",   metal: "Silver",   stone: "Pearl",   image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=300&h=300&fit=crop" },
  { id: 8,  name: "Starburst Ring Gold",      price: 55, category: "Rings",      metal: "Rose Gold",stone: "Diamond", image: "https://images.unsplash.com/photo-1567345319743-bef98e8a4df4?w=300&h=300&fit=crop" },
  { id: 9,  name: "Lumina Cuff",              price: 48, category: "Bracelets",  metal: "Gold",     stone: "Diamond", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop" },
  { id: 10, name: "Soleil Chain Necklace",    price: 32, category: "Necklaces",  metal: "Rose Gold",stone: "Mixed",   image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=300&fit=crop" },
  { id: 11, name: "Dew Drop Earrings",        price: 24, category: "Earrings",   metal: "Silver",   stone: "Pearl",   image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=300&h=300&fit=crop" },
  { id: 12, name: "Nova Statement Ring",      price: 62, category: "Rings",      metal: "Gold",     stone: "Diamond", image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=300&h=300&fit=crop" },
];

const CATEGORIES = ["Necklaces", "Earrings", "Rings", "Bracelets"];
const METALS     = ["Gold", "Silver", "Rose Gold"];
const STONES     = ["Diamond", "Pearl", "Mixed"];
const SORT_OPTIONS = [
  { label: "Relevance",   value: "relevance" },
  { label: "Price: Low",  value: "price_asc" },
  { label: "Price: High", value: "price_desc" },
  { label: "Name A–Z",    value: "name_asc" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="flex flex-col items-center leading-none select-none">
      <span className="text-[15px] md:text-[17px] font-semibold tracking-[0.25em] text-[#2c2416]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        AURORA AESTHETIC
      </span>
      <span className="text-[9px] tracking-[0.35em] text-[#9a7f55] mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        JEWELLERY
      </span>
    </div>
  );
}

function NavBar({ cartCount, onMobileMenuToggle, mobileMenuOpen }) {
  const navLinks = ["Home", "Collections", "Shop", "About", "Journal", "Account", "Wishlist", "Cart"];
  return (
    <header className="sticky top-0 z-50 bg-[#faf8f3] border-b border-[#e8dfc9] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#5a4a2f] hover:text-[#b8952a] transition-colors"
            onClick={onMobileMenuToggle}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>

          <Logo />

          {/* Desktop nav icons */}
          <div className="flex items-center gap-5 text-[#5a4a2f]">
            <button aria-label="Search" className="hover:text-[#b8952a] transition-colors">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button aria-label="Account" className="hover:text-[#b8952a] transition-colors">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            <button aria-label="Cart" className="relative hover:text-[#b8952a] transition-colors">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#b8952a] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center justify-center gap-8 pb-3">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-[11px] tracking-[0.15em] transition-colors ${
                link === "Home"
                  ? "text-[#b8952a] border-b border-[#b8952a] pb-0.5"
                  : "text-[#5a4a2f] hover:text-[#b8952a]"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
            >
              {link.toUpperCase()}
            </a>
          ))}
        </nav>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3 border-t border-[#e8dfc9] pt-3">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[12px] tracking-[0.12em] text-[#5a4a2f] hover:text-[#b8952a] transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
              >
                {link.toUpperCase()}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

function HeroBanner() {
  return (
    <div
      className="relative w-full h-52 md:h-72 flex items-end overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2c1f0e 0%, #6b4c1e 40%, #c49a3c 100%)",
      }}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(circle at 70% 40%, #fff4d6 0%, transparent 60%)" }} />
      <div className="relative z-10 px-6 md:px-12 pb-8 md:pb-12">
        <p className="text-[#f0c96a] text-xs tracking-[0.3em] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          ALL COLLECTIONS
        </p>
        <h1
          className="text-white text-4xl md:text-6xl uppercase font-bold leading-none"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "0.04em" }}
        >
          Find Your<br />
          <span className="text-[#f0c96a]">Perfect Sparkle</span>
        </h1>
      </div>
      {/* Decorative star */}
      <div className="absolute right-8 bottom-6 opacity-30">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M40 0 L42 38 L80 40 L42 42 L40 80 L38 42 L0 40 L38 38 Z" fill="#f0c96a"/>
        </svg>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[#e8dfc9] pb-4 mb-4 last:border-0 last:mb-0">
      <button
        className="flex w-full items-center justify-between mb-3 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="text-[11px] tracking-[0.2em] text-[#2c2416] group-hover:text-[#b8952a] transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
        >
          {title}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-[#9a7f55] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function CheckboxOption({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
          checked
            ? "bg-[#b8952a] border-[#b8952a]"
            : "border-[#c9b98a] bg-white group-hover:border-[#b8952a]"
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span
        className="text-[12px] text-[#5a4a2f] group-hover:text-[#2c2416] transition-colors"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {label}
      </span>
    </label>
  );
}

function PriceRangeSlider({ min, max, value, onChange }) {
  return (
    <div className="pt-1">
      <div className="flex justify-between mb-3">
        <span className="text-[11px] text-[#9a7f55]" style={{ fontFamily: "'Montserrat', sans-serif" }}>${value[0]}</span>
        <span className="text-[11px] text-[#9a7f55]" style={{ fontFamily: "'Montserrat', sans-serif" }}>${value[1]}</span>
      </div>
      {/* Simple dual slider approximation with two range inputs stacked */}
      <div className="relative h-1.5 bg-[#e8dfc9] rounded-full">
        <div
          className="absolute h-1.5 bg-[#b8952a] rounded-full"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((value[1] - min) / (max - min)) * 100}%`,
          }}
        />
        <input
          type="range" min={min} max={max} value={value[0]}
          onChange={(e) => onChange([+e.target.value, value[1]])}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ zIndex: 2 }}
        />
        <input
          type="range" min={min} max={max} value={value[1]}
          onChange={(e) => onChange([value[0], +e.target.value])}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ zIndex: 3 }}
        />
        {/* Thumb min */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#b8952a] rounded-full shadow-sm pointer-events-none"
          style={{ left: `calc(${((value[0] - min) / (max - min)) * 100}% - 8px)` }}
        />
        {/* Thumb max */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#b8952a] rounded-full shadow-sm pointer-events-none"
          style={{ left: `calc(${((value[1] - min) / (max - min)) * 100}% - 8px)` }}
        />
      </div>
    </div>
  );
}

function FilterSidebar({ filters, onFilterChange, onClear }) {
  return (
    <aside className="bg-[#faf8f3] rounded-xl border border-[#e8dfc9] p-5 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2
          className="text-[11px] tracking-[0.25em] text-[#2c2416]"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
        >
          FILTERS
        </h2>
        <button
          onClick={onClear}
          className="text-[10px] tracking-[0.1em] text-[#9a7f55] hover:text-[#b8952a] transition-colors underline underline-offset-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Clear all
        </button>
      </div>

      <FilterSection title="CATEGORY">
        {CATEGORIES.map((cat) => (
          <CheckboxOption
            key={cat}
            label={cat}
            checked={filters.categories.includes(cat)}
            onChange={() => onFilterChange("categories", cat)}
          />
        ))}
      </FilterSection>

      <FilterSection title="PRICE RANGE">
        <PriceRangeSlider
          min={0} max={500}
          value={filters.priceRange}
          onChange={(v) => onFilterChange("priceRange", v)}
        />
      </FilterSection>
    </aside>
  );
}

function ProductCard({ product ,onNavigate}) {
  const [wishlist, setWishlist] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={()=>onNavigate(product.id)}
      className="group bg-white rounded-xl overflow-hidden border border-[#f0e8d4] hover:border-[#d4b87a] hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#faf8f3] aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-108" : "scale-100"}`}
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />
        {/* Wishlist */}
        <button
          onClick={() => setWishlist((v) => !v)}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
          aria-label="Wishlist"
        >
          <svg
            className={`w-3.5 h-3.5 transition-colors ${wishlist ? "text-red-400 fill-red-400" : "text-[#9a7f55]"}`}
            fill={wishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        {/* Quick add overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-[#2c2416]/90 backdrop-blur-sm py-2.5 text-center transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>

        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p
          className="text-[12px] text-[#9a7f55] tracking-[0.1em] mb-0.5 truncate"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {product.category.toUpperCase()}
        </p>
        <h3
          className="text-[14px] text-[#2c2416] leading-snug mb-1.5 truncate"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
        >
          {product.name}
        </h3>
        <p
          className="text-[14px] text-[#b8952a] font-semibold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function MobileFilterDrawer({ open, onClose, filters, onFilterChange, onClear }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#faf8f3] z-50 rounded-t-2xl max-h-[85vh] overflow-y-auto transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="sticky top-0 bg-[#faf8f3] border-b border-[#e8dfc9] px-5 py-4 flex items-center justify-between">
          <span
            className="text-[11px] tracking-[0.25em] text-[#2c2416]"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
          >
            FILTERS
          </span>
          <div className="flex items-center gap-4">
            <button onClick={onClear} className="text-[10px] text-[#9a7f55] underline" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Clear all
            </button>
            <button onClick={onClose} className="text-[#5a4a2f] hover:text-[#b8952a]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-5">
          <FilterSidebar filters={filters} onFilterChange={onFilterChange} onClear={onClear} />
        </div>
        <div className="px-5 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-[#b8952a] text-white py-3 rounded-lg text-[11px] tracking-[0.2em] hover:bg-[#a07d20] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
          >
            APPLY FILTERS
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AuroraFilterPage() {
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [cartCount, setCartCount]             = useState(1);
  const [sortBy, setSortBy]                   = useState("relevance");
  const [filters, setFilters] = useState({
    categories: [],
    metals: [],
    stones: [],
    priceRange: [0, 500],
  });

  const handleFilterChange = useCallback((type, value) => {
    setFilters((prev) => {
      if (type === "priceRange") return { ...prev, priceRange: value };
      const arr = prev[type];
      return {
        ...prev,
        [type]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }, []);

 
const router = useRouter()

  const handleNavigation = (id) => {
    router.push(`/product/${id}`)
  }



  const clearFilters = useCallback(() => {
    setFilters({ categories: [], metals: [], stones: [], priceRange: [0, 500] });
  }, []);


  // Filtered + sorted products
  const filtered = PRODUCTS
    .filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.metals.length    && !filters.metals.includes(p.metal))          return false;
      if (filters.stones.length    && !filters.stones.includes(p.stone))          return false;
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1])     return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc")  return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "name_asc")   return a.name.localeCompare(b.name);
      return 0;
    });

  const activeFilterCount =
    filters.categories.length +
    filters.metals.length +
    filters.stones.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="min-h-screen" style={{ backgroundColor: "#f6f2ea", fontFamily: "'Montserrat', sans-serif" }}>
      

        <HeroBanner />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Mobile top bar: filter + sort */}
          <div className="flex md:hidden items-center gap-3 mb-5">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#b8952a] text-white py-2.5 rounded-lg text-[11px] tracking-[0.15em] font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M6 12h12M9 20h6"/>
              </svg>
              FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <div className="flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-[#e8dfc9] text-[#2c2416] text-[11px] tracking-[0.1em] py-2.5 px-3 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#b8952a]"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-7">
            {/* Sidebar — desktop only */}
            <div className="hidden md:block w-56 flex-shrink-0">
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} />
            </div>

            {/* Product grid */}
            <div className="flex-1 min-w-0">
              {/* Desktop sort bar */}
              <div className="hidden md:flex items-center justify-between mb-6">
                <p className="text-[12px] text-[#9a7f55]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                  {activeFilterCount > 0 && <span className="ml-1 text-[#b8952a]">({activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} active)</span>}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-[0.1em] text-[#9a7f55]">SORT BY:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-[#e8dfc9] text-[#2c2416] text-[11px] py-1.5 pl-3 pr-8 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#b8952a] cursor-pointer"
                  >
                    {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Active filter chips */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {[...filters.categories, ...filters.metals, ...filters.stones].map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 bg-[#f0e8d4] text-[#5a4a2f] text-[10px] tracking-[0.1em] px-3 py-1 rounded-full border border-[#d4b87a]"
                    >
                      {tag}
                      <button
                        onClick={() => {
                          for (const type of ["categories", "metals", "stones"]) {
                            if (filters[type].includes(tag)) { handleFilterChange(type, tag); break; }
                          }
                        }}
                        className="text-[#9a7f55] hover:text-[#b8952a] ml-0.5"
                      >×</button>
                    </span>
                  ))}
                </div>
              )}

              {/* Grid */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <svg className="w-12 h-12 text-[#d4b87a] mb-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
                  </svg>
                  <p className="text-[#2c2416] text-lg mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>No pieces found</p>
                  <p className="text-[#9a7f55] text-[12px]">Try adjusting your filters to discover more.</p>
                  <button onClick={clearFilters} className="mt-4 text-[11px] tracking-[0.15em] text-[#b8952a] border border-[#b8952a] px-4 py-2 rounded-lg hover:bg-[#b8952a] hover:text-white transition-colors">
                    CLEAR FILTERS
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} onNavigate={handleNavigation} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        <MobileFilterDrawer
          open={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={clearFilters}
        />

        {/* Footer strip */}

      </div>
    </>
  );
}