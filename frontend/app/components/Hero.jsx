export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <div
        className="relative rounded-xl overflow-hidden h-[300px] md:h-[500px]"
        style={{
          backgroundImage: "url('/Hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-center">
          <div className="px-8 md:px-16 text-white max-w-lg">
            <h2 className="text-4xl md:text-7xl font-serif leading-tight">
              AURA OF
              <br />
              ELEGANCE
            </h2>

            <p className="mt-4 text-sm md:text-lg">
              Discover timeless beauty.
              Handcrafted pieces that shine.
            </p>

            <button className="mt-6 bg-[#c9a34e] hover:bg-[#b9933d] px-6 py-3 rounded-md font-medium transition">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}