"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentOffset, setCurrentOffset] = useState(0);
  const [useManualControl, setUseManualControl] = useState(false);

  // Continuous auto-scroll functionality with CSS animation
  useEffect(() => {
    if (carouselRef.current) {
      if (!isHovered && !useManualControl) {
        carouselRef.current.style.animation = 'scroll 60s linear infinite';
        carouselRef.current.style.animationPlayState = 'running';
      } else {
        carouselRef.current.style.animationPlayState = 'paused';
      }
    }
  }, [isHovered, useManualControl]);

  // Handle manual control
  useEffect(() => {
    if (useManualControl && carouselRef.current) {
      carouselRef.current.style.animation = 'none';
      carouselRef.current.style.transform = `translateX(${currentOffset}px)`;
    }
  }, [currentOffset, useManualControl]);

  // Reset to auto after manual control stops
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (useManualControl && !isHovered) {
      timeout = setTimeout(() => {
        setUseManualControl(false);
        if (carouselRef.current) {
          carouselRef.current.style.animation = 'scroll 60s linear infinite';
          carouselRef.current.style.animationPlayState = 'running';
        }
      }, 2000); // Resume auto-scroll 2 seconds after last manual interaction
    }
    return () => clearTimeout(timeout);
  }, [useManualControl, isHovered, currentOffset]);

  const goToPrevious = () => {
    setUseManualControl(true);
    setCurrentOffset(prev => {
      const newOffset = prev + 344; // Move backward
      // Keep within reasonable bounds
      if (newOffset > 0) {
        return -3440; // Jump to end
      }
      return newOffset;
    });
  };

  const goToNext = () => {
    setUseManualControl(true);
    setCurrentOffset(prev => {
      const newOffset = prev - 344; // Move forward
      // Keep within reasonable bounds
      if (newOffset < -3784) {
        return 0; // Jump to beginning
      }
      return newOffset;
    });
  };

  const programCards = [
    {
      title: "Healthcare",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Education",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      title: "Skill Development",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Women Empowerment",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Youth Development",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Child Welfare",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Senior Citizen Care",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Poverty Relief",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      title: "Disaster Relief",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      title: "Environmental Protection",
      icon: (
        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Mental Health Awareness",
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
            transform: translateX(-3784px); /* -(344px * 11) = total width of 11 cards */
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Half - Content */}
            <div className="space-y-8">
              <h1 className="heading-hero text-gray-900 leading-tight">
                Giving is another way of saving on tax.
              </h1>
              <div>
                <Link
                  href="/donate"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#5a7a96] font-semibold rounded-full transition-all duration-200 text-lg"
                >
                  How to Save Tax?
                </Link>
              </div>
            </div>

            {/* Right Half - Image Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md h-96 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/30">
                <div className="text-center text-white/70">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Photo of children sitting on a rock</p>
                  <p className="text-xs mt-1">(Placeholder)</p>
                </div>
              </div>
            </div>
          </div>
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={carouselRef}
              className="flex gap-6 pb-4 infinite-scroll"
              style={{
                width: 'calc(344px * 22)', // 22 cards (11 x 2) for seamless loop
              }}
            >
              {/* First set of cards */}
              {programCards.map((card, index) => (
                <div key={`first-${index}`} className="flex-none w-80 h-80 bg-[#5a7a96] rounded-xl relative overflow-hidden">
                  <div className="h-full flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  </div>
                </div>
              ))}

              {/* Duplicate set of cards for seamless loop */}
              {programCards.map((card, index) => (
                <div key={`second-${index}`} className="flex-none w-80 h-80 bg-[#5a7a96] rounded-xl relative overflow-hidden">
                  <div className="h-full flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows - Only visible on hover */}
            {isHovered && (
              <>
                {/* Left Arrow */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 z-10 opacity-90 hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 z-10 opacity-90 hover:opacity-100"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Gandhi Quote Section */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <blockquote className="quote-gandhi">
              &ldquo;The best way to find yourself is to lose yourself in the service of others.&rdquo;
              <footer className="text-[#5a7a96] font-semibold mt-6 text-right text-lg">— Mahatma Gandhi</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#5a7a96] text-white section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
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
            <Link href="/get-involved" className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-[#5a7a96] px-6 py-3 rounded-full font-semibold transition-all duration-200">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}