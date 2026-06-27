import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={product.imageUrl}
          alt={product.description}
          fill
          className="object-cover"
        />
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