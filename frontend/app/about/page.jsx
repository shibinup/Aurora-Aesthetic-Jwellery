"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

// ─── Gold Leaf Divider ────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="w-full overflow-hidden leading-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 28"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-7"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6914" stopOpacity="0" />
            <stop offset="20%" stopColor="#C9A84C" stopOpacity="1" />
            <stop offset="50%" stopColor="#E8D5A3" stopOpacity="1" />
            <stop offset="80%" stopColor="#C9A84C" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B6914" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Main rule */}
        <line x1="0" y1="14" x2="1440" y2="14" stroke="url(#goldGrad)" strokeWidth="1" />
        {/* Decorative diamond at centre */}
        <polygon
          points="720,8 726,14 720,20 714,14"
          fill="#C9A84C"
          opacity="0.9"
        />
        {/* Flanking small diamonds */}
        <polygon points="600,11 604,14 600,17 596,14" fill="#C9A84C" opacity="0.5" />
        <polygon points="840,11 844,14 840,17 836,14" fill="#C9A84C" opacity="0.5" />
      </svg>
    </div>
  );
}

// ─── Fade-in on scroll hook ───────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useFadeIn();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 24);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroFade = useFadeIn();
  const storyFade = useFadeIn();
  const craftFade = useFadeIn();
  const teamFade = useFadeIn();
  const ctaFade = useFadeIn();

 
  

  const values = [
    {
      icon: "⬡",
      title: "Old Gold Purity",
      desc: "Every piece begins with 22-karat gold reclaimed from heirloom sources — metal that carries memory and warmth no new ore can replicate.",
    },
    {
      icon: "◈",
      title: "Hand-Wrought Always",
      desc: "No casting lines, no machine finishing. Each curve is achieved through sustained hand pressure, annealing, and the artisan's trained eye.",
    },
    {
      icon: "◇",
      title: "Slow Craft",
      desc: "A single collar necklace may take forty hours to complete. We make fewer pieces so each one can be made properly.",
    },
    {
      icon: "○",
      title: "Ethical Provenance",
      desc: "From gold sourcing to final hallmarking, every link in our supply chain is documented, auditable, and built on fair wages.",
    },
  ];

  return (
    <>
      <Head>
        <title>About Us — Aurora Aesthetic Jewellery</title>
        <meta
          name="description"
          content="The story of Aurora Aesthetic Jewellery — old gold, slow craft, and the artisans who keep an ancient tradition luminous."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        :root {
          --obsidian: #0D0B08;
          --gold: #C9A84C;
          --champagne: #E8D5A3;
          --ivory: #F5F0E8;
          --bronze: #8B6914;
          --warm-mid: #1A1710;
        }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .text-gold { color: var(--gold); }
        .text-champagne { color: var(--champagne); }
        .text-ivory { color: var(--ivory); }
        .bg-obsidian { background-color: var(--obsidian); }
        .bg-warm-mid { background-color: var(--warm-mid); }
        .bg-ivory { background-color: var(--ivory); }
        .border-gold { border-color: var(--gold); }
        .tracking-editorial { letter-spacing: 0.25em; }
        .tracking-widest-xl { letter-spacing: 0.35em; }
        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .fade-up { transition: none; opacity: 1; transform: none; }
        }
      `}</style>

      <main className="bg-obsidian font-body min-h-screen">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

          {/* Ambient radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(201,168,76,0.10) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Thin top rule */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #C9A84C44, transparent)" }}
            aria-hidden="true"
          />

          <div
            ref={heroFade.ref}
            className={`fade-up ${heroFade.visible ? "visible" : ""} max-w-4xl mx-auto`}
          >
            <p
              className="text-gold font-body text-xs tracking-widest-xl uppercase mb-8"
              style={{ fontWeight: 400 }}
            >
              Est. 2018 · Malappuram, Kerala
            </p>

            <h1
              className="font-display text-ivory leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", fontWeight: 300, fontStyle: "italic" }}
            >
              Aurora Aesthetic
              <br />
              <span
                className="text-gold not-italic"
                style={{ fontWeight: 600, fontSize: "clamp(2rem, 6vw, 5rem)" }}
              >
                Jewellery
              </span>
            </h1>

            <p
              className="font-display text-champagne text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              Old gold, living memory — jewellery shaped by hands that understand
              what endures.
            </p>

            <div className="mt-12 flex justify-center">
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold to-transparent opacity-60" />
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ── OUR STORY ────────────────────────────────────────────────────── */}
        <section className="bg-ivory py-24 md:py-36 px-6">
          <div
            ref={storyFade.ref}
            className={`fade-up ${storyFade.visible ? "visible" : ""} max-w-6xl mx-auto`}
          >
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

              {/* Text column */}
              <div>
                <p
                  className="text-xs tracking-editorial uppercase font-body mb-4"
                  style={{ color: "var(--bronze)", fontWeight: 500 }}
                >
                  Our Story
                </p>
                <h2
                  className="font-display leading-tight mb-8"
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 4rem)",
                    fontWeight: 300,
                    color: "var(--obsidian)",
                    fontStyle: "italic",
                  }}
                >
                  Born from a Kerala goldsmith's
                  <span style={{ color: "var(--bronze)", fontWeight: 600 }}> century-old workshop</span>
                </h2>
                <div
                  className="space-y-5 text-base md:text-lg leading-relaxed"
                  style={{ color: "#3a3228", fontWeight: 300 }}
                >
                  <p>
                    Aurora began not in a showroom, but in a narrow lane in Thrissur where
                    Priya Menon's grandfather lit his gas torch every morning for fifty years.
                    The smell of hot metal, beeswax, and burnishing clay was the first thing
                    she learned to love.
                  </p>
                  <p>
                    When global fast-fashion threatened to flatten jewellery into disposable
                    accessories, Priya made a counter-bet: that people still wanted something
                    that would outlast them. In 2006, she founded Aurora to prove it.
                  </p>
                  <p>
                    Every Aurora piece is made with reclaimed old gold — metal with provenance,
                    with history, with a warmth that 24-karat refined gold simply cannot hold.
                    We believe the age of the gold is part of what you wear.
                  </p>
                </div>
              </div>

              {/* Visual column — abstract gold composition */}
              <div className="relative flex justify-center items-center">
                <div
                  className="relative w-72 h-72 md:w-96 md:h-96 rounded-full"
                  style={{ background: "radial-gradient(circle, #E8D5A3 0%, #C9A84C 50%, #8B6914 100%)" }}
                >
                  {/* Concentric ring */}
                  <div
                    className="absolute inset-4 rounded-full border"
                    style={{ borderColor: "rgba(255,255,255,0.3)" }}
                  />
                  <div
                    className="absolute inset-12 rounded-full border"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  />
                  {/* Centre text */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                    <p
                      className="font-display"
                      style={{ fontSize: "clamp(3.5rem, 7vw, 5rem)", color: "var(--obsidian)", fontWeight: 600, lineHeight: 1 }}
                    >
                      22K
                    </p>
                    <p
                      className="font-body text-xs tracking-editorial uppercase mt-2"
                      style={{ color: "var(--obsidian)", opacity: 0.7, fontWeight: 500 }}
                    >
                      Old Gold Standard
                    </p>
                  </div>
                </div>

                {/* Floating label */}
                <div
                  className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 border px-4 py-3"
                  style={{ borderColor: "var(--bronze)", background: "var(--ivory)" }}
                >
                  <p className="font-display text-3xl md:text-4xl" style={{ color: "var(--obsidian)", fontWeight: 300 }}>
                    <Counter target={18} />+
                  </p>
                  <p className="font-body text-xs tracking-editorial uppercase" style={{ color: "var(--bronze)", fontWeight: 500 }}>
                    Years of Craft
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ── VALUES ───────────────────────────────────────────────────────── */}
        <section className="bg-warm-mid py-24 md:py-36 px-6">
          <div
            ref={craftFade.ref}
            className={`fade-up ${craftFade.visible ? "visible" : ""} max-w-6xl mx-auto`}
          >
            <div className="text-center mb-16 md:mb-20">
              <p
                className="text-xs tracking-editorial uppercase font-body mb-4 text-gold"
                style={{ fontWeight: 400 }}
              >
                What We Believe
              </p>
              <h2
                className="font-display text-ivory leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 300, fontStyle: "italic" }}
              >
                The principles that shape every piece
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="border-t pt-8 group cursor-default"
                  style={{ borderColor: "rgba(201,168,76,0.3)" }}
                >
                  <span
                    className="font-display text-4xl text-gold block mb-4 transition-transform duration-300 group-hover:scale-110 origin-left"
                    style={{ fontWeight: 300 }}
                  >
                    {v.icon}
                  </span>
                  <h3
                    className="font-display text-champagne text-xl mb-3"
                    style={{ fontWeight: 600 }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "rgba(232,213,163,0.65)", fontWeight: 300 }}
                  >
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats bar */}
            <div
              className="mt-20 grid grid-cols-3 divide-x"
              style={{ borderColor: "rgba(201,168,76,0.2)" }}
            >
              {[
                { n: 2400, suf: "+", label: "Pieces Created" },
                { n: 40, suf: " hrs", label: "Avg. per Necklace" },
                { n: 100, suf: "%", label: "Old Gold Used" },
              ].map((s) => (
                <div key={s.label} className="text-center py-8" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
                  <p
                    className="font-display text-gold"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300 }}
                  >
                    <Counter target={s.n} suffix={s.suf} />
                  </p>
                  <p
                    className="font-body text-xs tracking-editorial uppercase mt-2"
                    style={{ color: "rgba(232,213,163,0.5)", fontWeight: 400 }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GoldDivider />

        <GoldDivider />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="bg-obsidian py-28 md:py-40 px-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div
            ref={ctaFade.ref}
            className={`fade-up ${ctaFade.visible ? "visible" : ""} relative z-10 max-w-3xl mx-auto`}
          >
            <p
              className="font-body text-xs tracking-editorial uppercase text-gold mb-6"
              style={{ fontWeight: 400 }}
            >
              Commission a Piece
            </p>
            <h2
              className="font-display text-ivory leading-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 300, fontStyle: "italic" }}
            >
              Your heirloom starts with a conversation.
            </h2>
            <p
              className="font-body text-base md:text-lg mb-12 leading-relaxed"
              style={{ color: "rgba(232,213,163,0.7)", fontWeight: 300 }}
            >
              Tell us the occasion, the memory you want to hold, the wrist or neck it will
              rest on — and we will begin the work of making something that lasts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                
                className="inline-block font-body text-sm tracking-editorial uppercase px-10 py-4 transition-all duration-300 hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(90deg, #C9A84C, #E8D5A3, #C9A84C)",
                  color: "var(--obsidian)",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                }}
              >
                  contact Us
                +91 9188070772
              </div>
              <a
                href="/collections"
                className="inline-block font-body text-sm tracking-editorial uppercase px-10 py-4 border transition-all duration-300 hover:bg-white/5 active:scale-95"
                style={{
                  borderColor: "rgba(201,168,76,0.5)",
                  color: "var(--champagne)",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                }}
              >
                View Collections
              </a>
            </div>

            <p
              className="font-body text-xs mt-10"
              style={{ color: "rgba(201,168,76,0.4)", fontWeight: 300, letterSpacing: "0.1em" }}
            >
              Shippingg all over India
            </p>
          </div>
        </section>

      </main>
    </>
  );
}