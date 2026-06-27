"use client";

import { useState,useEffect } from "react";
import { products } from "../dummyDb";
import Loading from "../components/Skeleton";

function QtyControl({ qty, onIncrease, onDecrease, variant = "default" }) {
  if (variant === "mobile") {
    return (
      <div className="flex items-center border border-[#D4C5A9] rounded-md overflow-hidden">
        <button
          onClick={onDecrease}
          className="w-8 h-8 flex items-center justify-center text-[#6B5A3E] hover:bg-[#F0EBE1] transition-colors text-lg font-light"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium text-[#4A3728]">{qty}</span>
        <button
          onClick={onIncrease}
          className="w-8 h-8 flex items-center justify-center text-[#6B5A3E] hover:bg-[#F0EBE1] transition-colors text-lg font-light"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center border border-[#D4C5A9] rounded">
      <button
        onClick={onDecrease}
        className="px-2 py-1 text-[#6B5A3E] hover:bg-[#F0EBE1] transition-colors text-sm"
      >
        −
      </button>
      <span className="px-3 py-1 text-sm font-medium text-[#4A3728] border-x border-[#D4C5A9]">{qty}</span>
      <button
        onClick={onIncrease}
        className="px-2 py-1 text-[#6B5A3E] hover:bg-[#F0EBE1] transition-colors text-sm"
      >
        +
      </button>
    </div>
  );
}

function CartItem({ item, onQtyChange, onRemove, isLast }) {
  return (
    <div className={`flex items-center gap-4 py-5 ${!isLast ? "border-b border-[#EDE5D8]" : ""} `}>
      {/* Image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden flex-shrink-0 bg-[#F0EBE1]">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.background = "#E8DFD0"; }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#4A3728] leading-tight">{item.name}</p>
        {item.subtitle && (
          <p className="text-xs text-[#9B8B7A] mt-0.5">{item.subtitle}</p>
        )}
        <p className="text-sm font-bold text-[#4A3728] mt-1">${item.price.toFixed(2)}</p>
      </div>

      {/* Qty + Remove */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 flex-shrink-0">
        <QtyControl
          qty={item.qty}
          onIncrease={() => onQtyChange(item.id, 1)}
          onDecrease={() => onQtyChange(item.id, -1)}
        />
        <button
          onClick={() => onRemove(item.id)}
          className="text-xs text-[#9B8B7A] hover:text-[#C4A35A] underline transition-colors sm:no-underline"
          aria-label={`Remove ${item.name}`}
        >
          <span className="hidden sm:inline">Remove</span>
          <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function OrderSummary({ subtotal, onCheckout, promoOpen, setPromoOpen, promoCode, setPromoCode }) {
  return (
    <div className="bg-[#FAF7F2] border border-[#E8E0D0] rounded-lg p-6 sticky top-28">
      <h2 className="text-base font-semibold tracking-widest uppercase text-[#4A3728] mb-5">
        Order Summary
      </h2>

      <div className="flex justify-between text-sm text-[#6B5A3E] mb-2">
        <span>Subtotal:</span>
        <span className="font-semibold text-[#4A3728]">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-[#6B5A3E] mb-6 pb-5 border-b border-[#E8E0D0]">
        <span>Shipping:</span>
        <span className="italic text-[#9B8B7A]">calculated at next step</span>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-[#C4A35A] hover:bg-[#B0904A] text-white text-xs font-bold tracking-[0.2em] uppercase py-3.5 rounded transition-colors mb-4"
      >
        Proceed to Checkout
      </button>

      <button
        onClick={() => setPromoOpen(!promoOpen)}
        className="w-full text-center text-xs text-[#9B8B7A] hover:text-[#C4A35A] underline transition-colors"
      >
        Apply Promo Code
      </button>

      {promoOpen && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1 border border-[#D4C5A9] rounded px-3 py-2 text-sm bg-white text-[#4A3728] placeholder-[#C4B89A] focus:outline-none focus:border-[#C4A35A]"
          />
          <button className="bg-[#4A3728] text-white text-xs px-3 py-2 rounded hover:bg-[#6B5A3E] transition-colors">
            Apply
          </button>
        </div>
      )}
    </div>
  );
}



// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true)
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleQtyChange = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setLoading(true)
    const fetchData = async()=>{
        const data =products
        setCart(data)
        setLoading(false)
    }
    fetchData()
    setLoading(false)
  }, [])

  if(loading) return <Loading/>
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
     

      {/* Hero banner */}
      <div
        className="relative py-10 sm:py-14 text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #C4A35A 0%, #A8873E 50%, #8B6F30 100%)",
        }}
      >
        {/* Subtle leaf pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cellipse cx='30' cy='30' rx='8' ry='20' fill='none' stroke='%23fff' stroke-width='1' transform='rotate(30 30 30)'/%3E%3Cellipse cx='30' cy='30' rx='8' ry='20' fill='none' stroke='%23fff' stroke-width='1' transform='rotate(90 30 30)'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        <h1 className="relative text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.25em] uppercase drop-shadow-sm">
          Your Aurora Selections
        </h1>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#9B8B7A] text-lg mb-6">Your cart is empty.</p>
            <a
              href="#"
              className="inline-block bg-[#C4A35A] text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-3.5 rounded hover:bg-[#B0904A] transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 xl:gap-12">
              {/* Left: Cart items */}
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-[#EDE5D8] px-5 sm:px-8">
                  {cart.map((item, i) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQtyChange={handleQtyChange}
                      onRemove={handleRemove}
                      isLast={i === cart.length - 1}
                    />
                  ))}
                </div>

                {/* You May Also Like */}
              </div>

              {/* Right: Order Summary — hidden on mobile (shown below) */}
              <div className="hidden lg:block">
                <OrderSummary
                  subtotal={subtotal}
                  promoOpen={promoOpen}
                  setPromoOpen={setPromoOpen}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                />
              </div>
            </div>

            {/* Mobile sticky checkout bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FAF7F2] border-t border-[#E8E0D0] px-4 py-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[#6B5A3E]">Subtotal</span>
                <span className="text-sm font-bold text-[#4A3728]">${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-[#C4A35A] hover:bg-[#B0904A] text-white text-xs font-bold tracking-[0.2em] uppercase py-4 rounded-lg transition-colors">
                Checkout
              </button>
            </div>
            {/* Spacer for mobile sticky bar */}
            <div className="lg:hidden h-28" />
          </>
        )}
      </main>
    </div>
  );
}