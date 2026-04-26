"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentOffset, setCurrentOffset] = useState(0);
  const [useManualControl, setUseManualControl] = useState(false);

  // Hero carousel state
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Hover pause/resume — only toggles playState, never resets the animation definition
  useEffect(() => {
    if (!carouselRef.current || useManualControl) return;
    carouselRef.current.style.animationPlayState = isHovered ? 'paused' : 'running';
  }, [isHovered, useManualControl]);

  // Handle manual control — freeze at exact arrow position
  useEffect(() => {
    if (useManualControl && carouselRef.current) {
      carouselRef.current.style.animation = 'none';
      carouselRef.current.style.transform = `translateX(${currentOffset}px)`;
    }
  }, [currentOffset, useManualControl]);

  // Resume auto-scroll from the current position after 800ms of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (useManualControl) {
      timeout = setTimeout(() => {
        if (carouselRef.current) {
          // Compute how far into the 60s cycle we already are
          const delay = ((-currentOffset) / 3440) * 60;
          carouselRef.current.style.transform = '';
          carouselRef.current.style.animation = `scroll 60s linear -${Math.max(0, delay).toFixed(2)}s infinite`;
          carouselRef.current.style.animationPlayState = 'running';
        }
        // Setting false triggers the hover effect to re-run,
        // which will pause again if mouse is still hovering
        setUseManualControl(false);
      }, 800);
    }
    return () => clearTimeout(timeout);
  }, [useManualControl, currentOffset]);

  const goToPrevious = () => {
    setUseManualControl(true);
    setCurrentOffset(prev => {
      const newOffset = prev + 344; // Move backward
      // Keep within reasonable bounds
      if (newOffset > 0) {
        return -3096; // Jump to end
      }
      return newOffset;
    });
  };

  const goToNext = () => {
    setUseManualControl(true);
    setCurrentOffset(prev => {
      const newOffset = prev - 344; // Move forward
      // Keep within reasonable bounds
      if (newOffset < -3440) {
        return 0; // Jump to beginning
      }
      return newOffset;
    });
  };

  const programCards = [
    {
      title: "Healthcare",
      href: "/healthcare",
      image: "/assets/Healthcare.png",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Education",
      href: "/education",
      image: "/assets/Education.png",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      title: "Skill Development",
      href: "/skill-development",
      image: "/assets/Skill Development.png",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Women Empowerment",
      href: "/women-empowerment",
      image: "/assets/Women Development.png",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },

    {
      title: "Child Welfare",
      href: "/child-welfare",
      image: "/assets/Child Welfare.png",
      unoptimized: true,
      contain: true,
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Senior Citizen Care",
      href: "/senior-citizen-care",
      image: "/assets/Senior Citizen Care.png",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Poverty Relief",
      href: "/poverty-relief",
      image: "/assets/Poverty Relief.png",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      title: "Disaster Relief",
      href: "/disaster-relief",
      image: "/assets/Disaster Relief.png",
      unoptimized: true,
      contain: true,
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      title: "Environmental Protection",
      href: "/environmental-protection",
      image: "/assets/Environmental Protection.png",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Mental Health Awareness",
      href: "/mental-health",
      image: "/assets/Mental Health Awareness.png",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white">
      {/* Add CSS for seamless infinite animation */}
      <style jsx>{`
        .infinite-scroll {
          animation: scroll 60s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-3440px); /* -(344px * 10) = total width of 10 cards */
          }
        }
      `}</style>

      {/* Hero Carousel */}
      <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        {/* Slide 1 - Full image with button */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${heroSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <div className="absolute inset-0 bg-[#6a8ea8]" />

          {/* Decorative circles and lines */}
          <div className="absolute left-0 top-0 w-96 h-96 rounded-full border-2 border-white/15 -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute right-10 top-8 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute left-1/4 top-4 w-40 h-40 rounded-full border border-white/10" />
          <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full border-2 border-white/15 translate-x-1/3 translate-y-1/3" />
          <div className="absolute left-10 bottom-16 w-48 h-48 rounded-full border border-white/10" />
          <div className="absolute right-1/4 bottom-8 w-32 h-32 rounded-full border border-white/8" />
          <div className="absolute left-1/3 top-10 w-[1px] h-32 bg-white/10 rotate-[30deg]" />
          <div className="absolute right-1/3 bottom-20 w-[1px] h-40 bg-white/10 -rotate-[20deg]" />

          <Image
            src="/assets/Home Page 2.png"
            alt="Giving is another way of saving on tax"
            fill
            className="object-contain object-center z-[1]"
            priority
          />
          <div className="absolute inset-0 flex items-end justify-center z-10 pb-20 md:pb-28">
            <Link
              href="/tax-savings"
              className="inline-flex items-center px-10 py-4 bg-[#5a7a96] text-white font-semibold rounded-full text-lg hover:bg-[#4a6a86] transition-all duration-200 shadow-lg"
            >
              How to Save Tax?
            </Link>
          </div>
        </div>

        {/* Slide 2 - Full image with "Hope Begins With Us" + Donate Now */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${heroSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <Image
            src="/assets/Home Page 1.jpeg"
            alt="Hope Begins With Us"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight" style={{ fontFamily: 'var(--font-playfair-display)' }}>
              Hope Begins<br />With Us
            </h1>
            <Link
              href="/donate"
              className="inline-flex items-center px-10 py-4 bg-[#5a7a96] text-white font-semibold rounded-full text-lg hover:bg-[#4a6a86] transition-all duration-200 shadow-lg"
            >
              Donate Now
            </Link>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <button
            onClick={() => setHeroSlide(0)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${heroSlide === 0 ? "bg-white scale-110" : "bg-white/50"}`}
            aria-label="Slide 1"
          />
          <button
            onClick={() => setHeroSlide(1)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${heroSlide === 1 ? "bg-white scale-110" : "bg-white/50"}`}
            aria-label="Slide 2"
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-section text-gray-900">What We Do</h2>
          </div>

          {/* Seamless Infinite Carousel */}
          <div
            className="relative overflow-hidden"
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setIsHovered(true); }}
            onPointerLeave={(e) => { if (e.pointerType === 'mouse') setIsHovered(false); }}
          >
            <div
              ref={carouselRef}
              className="flex gap-6 pb-4 infinite-scroll"
              style={{
                width: 'calc(344px * 20)', // 20 cards (10 x 2) for seamless loop
              }}
            >
              {/* First set of cards */}
              {programCards.map((card, index) => (
                <Link key={`first-${index}`} href={card.href} className="flex-none w-80 h-80 bg-[#5a7a96] rounded-xl relative overflow-hidden block hover:opacity-90 transition-opacity">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className={card.contain ? "object-contain p-2" : "object-cover"}
                      sizes="320px"
                      unoptimized={card.unoptimized}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      {card.icon}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-12">
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  </div>
                </Link>
              ))}

              {/* Duplicate set of cards for seamless loop */}
              {programCards.map((card, index) => (
                <Link key={`second-${index}`} href={card.href} className="flex-none w-80 h-80 bg-[#5a7a96] rounded-xl relative overflow-hidden block hover:opacity-90 transition-opacity">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className={card.contain ? "object-contain p-2" : "object-cover"}
                      sizes="320px"
                      unoptimized={card.unoptimized}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      {card.icon}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-12">
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Arrows - always visible, z-index above overflow-hidden clip */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 z-20 opacity-90"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 z-20 opacity-90"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Tolstoy Quote Section */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 md:px-14 py-12 text-center">
              <div className="text-7xl text-[#5a7a96]/20 font-serif leading-none select-none mb-2">&ldquo;</div>
              <p className="text-2xl md:text-3xl text-gray-700 italic font-medium leading-relaxed" style={{ fontFamily: "'Jaini Purva', serif" }}>
                The sole meaning of life is to serve humanity.
              </p>
              <div className="w-10 h-px bg-[#5a7a96]/40 mx-auto mt-8 mb-5"></div>
              <p className="text-[#5a7a96] font-semibold text-lg tracking-wide">— Leo Tolstoy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#5a7a96] text-white section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto">
            Your contribution can transform lives and build stronger communities.
            Join thousands of supporters in our mission for positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/donate" className="bg-[#5a7a96] hover:bg-[#4a6a86] border-2 border-white text-white px-8 py-3 rounded-full font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg tracking-wide flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>DONATE NOW</span>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}