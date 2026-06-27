import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import {products} from './dummyDb'
export const dynamic = 'force-dynamic'

async function getProducts() {
  // Replace with your actual Node.js backend URL
 // const backendUrl = process.env.NEXT_PUBLIC_NODE_BACKEND_URL || 'http://localhost:5000';
  
  //const res = await fetch(`${backendUrl}/api/products`, {
    // 'no-store' tells Next.js not to cache this request (Strict SSR)
  if (!products) { 
    throw new Error('Failed to load products from dummy DB'); 
  } 
  
  return products
}


export default async function Home() {



const bestSellers = [
  {
    title: "Dawn",
    price:300,
    image: "/necklace.jpg",
    subtitle: "Aura Diamond Necklace",
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  {
    title: "Stellar",
     price:400,
    image: "/bracelet.jpg",
    subtitle: "Moonstone Bracelet",
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  },
  {
    title: "Bloom",
    price:500,
    image: "/earrings.jpg",
    subtitle: "High Diamond Earring",
    url: "https://images.unsplash.com/photo-1635767798638-3e25273a8236"
},{
    title: "Dawn",
    price:300,
    image: "/necklace.jpg",
    subtitle: "Aura Diamond Necklace",
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  {
    title: "Stellar",
     price:400,
    image: "/bracelet.jpg",
    subtitle: "Moonstone Bracelet",
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  },
  {
    title: "Bloom",
    price:500,
    image: "/earrings.jpg",
    subtitle: "High Diamond Earring",
    url: "https://images.unsplash.com/photo-1635767798638-3e25273a8236"
}
];

  const products = await getProducts()

  return (
     <main className="min-h-screen bg-[#faf7f1]">
      <Hero />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
  <h2 className="text-3xl font-bold text-center mb-8">
    Best Sellers
  </h2>

  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
    {products.map((product, index) => (
      <ProductCard
        key={index}
        product={product}
      />
    ))}
  </div>
</section>
    </main>
  );
}