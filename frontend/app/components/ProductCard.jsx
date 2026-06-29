"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation'
export default function ProductCard({ product }) {
const router = useRouter()
const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div onClick={handleCardClick}  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
    <div className="bg-white rounded-lg shadow group">  {/* 👈 add `group` here */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.description}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>

        <p className="text-lg font-bold mt-3">
          ₹{product.price}
        </p>

        <button className="mt-4 w-full bg-[#c9a34e] text-white py-2 rounded-md hover:bg-[#b9933d] transition">
          Shop Now
        </button>
      </div>
    </div>
  );
}