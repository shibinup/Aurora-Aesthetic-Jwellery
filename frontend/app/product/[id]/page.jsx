"use client";
import { useParams } from 'next/navigation'
import Loading from '../../components/Skeleton';
import Image from 'next/image'
import { useEffect, useState } from "react";
import { products } from '../../dummyDb';

const product = {
  name: "Dawn Aura Diamond Necklace",
  price: 300,
  imageUrl:"https://images.unsplash.com/photo-1635767798638-3e25273a8236",
  description:
    "A delicate blend of elegance and brilliance. The Dawn Aura diamond necklace is crafted to reflect timeless beauty and sophistication for every occasion.",
  features: [
    {  label: "Premium Quality Diamonds" },
    {  label: "18K Gold Plated" },
    {  label: "Hypoallergenic & Skin Safe" },
    {  label: "Certificate of Authenticity" },
  ],
};


function QuantitySelector({ quantity, onChange }) {
  return (
    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors text-lg font-light"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="px-4 py-2 text-stone-800 font-medium min-w-[2.5rem] text-center">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors text-lg font-light"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default  function ProductPage() {
  const [product,setProduct] = useState(true)
  const[loading,setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [added, setAdded] = useState(false);
  const { id } = useParams()

    useEffect(() => {
    // 1. Declare the async function inside the effect
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = products.find(product => product.id === Number(id))
        setProduct(data)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setLoading(false)
    };
    
    // 2. Call the function immediately
    fetchData();

  }, [])

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  if(loading) return <Loading/>
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Product Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            {/* Main image */}
            <Image 
                src={product.imageUrl} 
                alt="Abstract 3D rendering"
                width={500} 
                height={500} 
                className="w-full h-auto max-w-[500px]" 
                sizes="(max-width: 768px) 100vw, 500px"
            />
            
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-5 lg:pt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-stone-900">
                ₹{product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-2.5">
              {product.features.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm text-stone-600">
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-stone-200" />

            {/* Quantity + Add to Cart */}
            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">Quantity</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-amber-600 hover:bg-amber-700 active:scale-95 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {added ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

    
      </main>
    </div>
  );
}