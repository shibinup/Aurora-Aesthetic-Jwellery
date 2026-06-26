// app/products/loading.jsx

export default function Loading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div
          key={item}
          className="border rounded-2xl p-4 shadow animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="bg-gray-300 h-40 rounded-xl mb-4"></div>

          {/* Title Skeleton */}
          <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>

          {/* Price Skeleton */}
          <div className="bg-gray-300 h-4 rounded w-1/2 mb-4"></div>

          {/* Button Skeleton */}
          <div className="bg-gray-300 h-10 rounded"></div>
        </div>
      ))}
    </div>
  );
}