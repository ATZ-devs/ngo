"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileWhatWeDoOpen, setMobileWhatWeDoOpen] = useState(false);
  const [mobileGetInvolvedOpen, setMobileGetInvolvedOpen] = useState(false);
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [getInvolvedOpen, setGetInvolvedOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const getInvolvedRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (whatWeDoRef.current && !whatWeDoRef.current.contains(e.target as Node)) {
        setWhatWeDoOpen(false);
      }
      if (getInvolvedRef.current && !getInvolvedRef.current.contains(e.target as Node)) {
        setGetInvolvedOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const whatWeDoPages = [
    { title: "Healthcare", href: "/healthcare" },
    { title: "Education", href: "/education" },
    { title: "Skill Development", href: "/skill-development" },
    { title: "Women Empowerment", href: "/women-empowerment" },
    { title: "Child Welfare", href: "/child-welfare" },
    { title: "Senior Citizen Care", href: "/senior-citizen-care" },
    { title: "Poverty Relief", href: "/poverty-relief" },
    { title: "Disaster Relief", href: "/disaster-relief" },
    { title: "Environmental Protection", href: "/environmental-protection" },
    { title: "Mental Health Awareness", href: "/mental-health" },
  ];

  const suggestions = searchQuery.trim().length > 0
    ? whatWeDoPages.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-[60]">
      <div className="relative">
        {/* Logo - overlaps both bars */}
        <Link href="/" className="absolute left-[60px] min-[390px]:left-[64px] sm:left-[70px] md:left-4 lg:left-8 top-[10px] md:top-1 z-[70] block">
          <div className="w-[68px] md:w-[82px] lg:w-[90px] relative bg-white rounded-b-3xl shadow-md flex flex-col">
            <div className="relative w-full h-[72px] md:h-[86px] lg:h-[95px]">
              <Image
                src="/logo-full.png"
                alt="JeevKutumb Foundation Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="h-2 lg:h-3" />
          </div>
        </Link>

        {/* Top Contact Bar - Dark Slate/Steel Blue */}
        <div className="bg-[#5a7a96] text-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden md:flex justify-end items-center gap-x-6 md:gap-x-8 py-2 text-sm pl-20 sm:pl-24 lg:pl-28">
              {/* Contact Information */}
              <div className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-6 text-white min-w-0">
                <a href="mailto:jeevkutumbfoundation@gmail.com" title="jeevkutumbfoundation@gmail.com" className="flex items-center space-x-1.5 min-w-0 hover:opacity-80 transition-opacity">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-white/95 text-[10px] md:text-xs lg:text-sm truncate max-w-[130px] md:max-w-[160px] lg:max-w-none">jeevkutumbfoundation@gmail.com</span>
                </a>
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium text-white/95 text-[10px] md:text-xs lg:text-sm">+91 77100 75418</span>
                </div>
              </div>

              {/* Search Bar and Social Media */}
              <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
                {/* Search Bar - compact pill on iPad (md), wider on desktop (lg+) */}
                <div className="hidden md:block lg:hidden relative">
                  <form onSubmit={handleSearch} className="flex items-center bg-white/20 backdrop-blur-sm rounded-full border border-white/30 px-3 py-1.5 hover:bg-white/25 transition-all duration-200">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent text-xs focus:outline-none px-1 py-0.5 w-20 text-white placeholder-white/70"
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    />
                    <button type="submit">
                      <svg className="w-4 h-4 text-white/80 hover:text-white cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full mt-1 right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-[80] overflow-hidden">
                      {suggestions.map(s => (
                        <button
                          key={s.href}
                          className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96] text-sm transition-colors"
                          onMouseDown={() => { router.push(s.href); setSearchQuery(""); setShowSuggestions(false); }}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="hidden lg:block relative">
                  <form onSubmit={handleSearch} className="flex items-center bg-white/20 backdrop-blur-sm rounded-full border border-white/30 px-4 py-1.5 hover:bg-white/25 transition-all duration-200">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent text-sm focus:outline-none px-2 py-1 w-36 text-white placeholder-white/70"
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    />
                    <button type="submit">
                      <svg className="w-4 h-4 text-white/80 hover:text-white cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full mt-1 left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-[80] overflow-hidden">
                      {suggestions.map(s => (
                        <button
                          key={s.href}
                          className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96] text-sm transition-colors"
                          onMouseDown={() => { router.push(s.href); setSearchQuery(""); setShowSuggestions(false); }}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center space-x-3">
                  {/* X (Twitter) */}
                  <Link href="https://twitter.com/jeevkutumb" className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                  </Link>

                  {/* Threads */}
                  <Link href="https://www.threads.net/@jeevkutumbfoundation" className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                      <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.23c8.249.053 14.474 2.452 18.502 7.13 2.932 3.405 4.893 8.11 5.864 14.05-7.314-1.244-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 10.646 125.202 1.205 97.07 1L96.99 1h-.04C68.748 1.205 47.17 10.683 32.853 28.24 20.007 43.949 13.396 66.678 13.171 95.982v.04l-.001.04c.226 29.303 6.837 52.032 19.682 67.74C47.17 181.317 68.748 190.795 96.95 191h.04l.04-.001c24.596-.174 41.826-6.624 55.965-20.887 18.774-18.902 18.213-42.545 12.027-57.114-4.432-10.321-12.6-18.618-23.485-23.01ZM98.44 142.228c-10.424.574-21.24-4.074-21.82-14.189-.426-7.989 5.671-16.91 24.377-17.984 2.138-.123 4.243-.184 6.318-.184 6.604 0 12.798.606 18.423 1.772-2.096 26.108-16.968 29.916-27.298 30.585Z"/>
                    </svg>
                  </Link>

                  {/* Instagram */}
                  <Link href="https://instagram.com/jeevkutumbfoundation" className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex md:hidden items-center justify-end gap-3 py-1.5 text-sm pl-[90px] min-[390px]:pl-[110px] sm:pl-[130px]">
              <div className="flex items-center gap-2 text-white flex-shrink-0 ml-[32px] min-[390px]:ml-[36px] sm:ml-[40px]">
                <a href="mailto:jeevkutumbfoundation@gmail.com" title="jeevkutumbfoundation@gmail.com" className="flex min-w-0 items-center gap-1 hover:opacity-80 transition-opacity">
                  <svg className="w-3.5 h-3.5 text-white/90 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate text-[10px] font-medium max-w-[54px] [@media(min-width:361px)]:max-w-[70px] min-[390px]:max-w-[100px] sm:max-w-[130px]">jeevkutumbfoundation@gmail.com</span>
                </a>
                <a href="tel:+917710075418" className="flex flex-shrink-0 items-center gap-1 hover:opacity-80 transition-opacity">
                  <svg className="w-3.5 h-3.5 text-white/90 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-[10px] font-medium">77100 75418</span>
                </a>
                <div className="flex items-center gap-1 flex-shrink-0">
                <Link href="https://twitter.com/jeevkutumb" className="text-white/85 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full" aria-label="JeevKutumb on X">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </Link>
                <Link href="https://instagram.com/jeevkutumbfoundation" className="text-white/85 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full" aria-label="JeevKutumb on Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header - Pure White Background */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 md:h-14 lg:h-16 md:pl-24 lg:pl-28 pr-0 sm:pr-4 md:pr-0">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex flex-1 items-center space-x-4 lg:space-x-8">
                <Link href="/" className="text-gray-800 hover:text-[#5a7a96] transition-colors font-medium py-2 text-sm lg:text-base">
                  Home
                </Link>
                <Link href="/about" className="text-gray-800 hover:text-[#5a7a96] transition-colors font-medium py-2 text-sm lg:text-base">
                  About Us
                </Link>

              {/* What We Do Dropdown */}
              <div className="relative" ref={whatWeDoRef}>
                <button
                  onClick={() => { setWhatWeDoOpen(o => !o); setGetInvolvedOpen(false); }}
                  className="text-gray-800 hover:text-[#5a7a96] transition-colors font-medium py-2 flex items-center text-sm lg:text-base"
                >
                  What We Do
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${whatWeDoOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {whatWeDoOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-md border border-gray-200 z-[80] max-h-96 overflow-y-auto">
                    <Link href="/healthcare" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Healthcare</Link>
                    <Link href="/education" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Education</Link>
                    <Link href="/skill-development" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Skill Development</Link>
                    <Link href="/women-empowerment" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Women Empowerment</Link>
                    <Link href="/child-welfare" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Child Welfare</Link>
                    <Link href="/senior-citizen-care" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Senior Citizen Care</Link>
                    <Link href="/poverty-relief" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Poverty Relief</Link>
                    <Link href="/disaster-relief" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Disaster Relief</Link>
                    <Link href="/environmental-protection" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Environmental Protection</Link>
                    <Link href="/mental-health" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setWhatWeDoOpen(false)}>Mental Health Awareness</Link>
                  </div>
                )}
              </div>

              {/* Get Involved Dropdown */}
              <div className="relative" ref={getInvolvedRef}>
                <button
                  onClick={() => { setGetInvolvedOpen(o => !o); setWhatWeDoOpen(false); }}
                  className="text-gray-800 hover:text-[#5a7a96] transition-colors font-medium py-2 flex items-center text-sm lg:text-base"
                >
                  Get Involved
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${getInvolvedOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {getInvolvedOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-md border border-gray-200 z-[80]">
                    <Link href="/volunteering" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setGetInvolvedOpen(false)}>Volunteering &amp; Internships</Link>
                    <Link href="/corporate-partnerships" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]" onClick={() => setGetInvolvedOpen(false)}>Corporate Partnerships</Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Donate Button & Mobile Menu */}
            <div className="flex-1 md:flex-none flex items-center justify-between md:justify-end md:space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex-shrink-0 p-2 -ml-1 rounded-md text-gray-700 hover:text-[#5a7a96] hover:bg-gray-100 transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Mobile: donate shifted to the right */}
              <div className="flex justify-end md:hidden">
                <Link
                  href="/donate#donation-form"
                  className="bg-[#5a7a96] hover:bg-[#4a6a86] text-white px-4 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-1.5 transform hover:-translate-y-0.5 text-sm whitespace-nowrap"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span>Donate Now</span>
                </Link>
              </div>
              {/* Desktop: donate normal */}
              <Link
                href="/donate"
                className="hidden md:flex bg-[#5a7a96] hover:bg-[#4a6a86] text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>Donate Now</span>
              </Link>

            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 bg-white">
              <div className="flex flex-col space-y-2 pt-4">
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-700 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>

                {/* Mobile What We Do - Expandable */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setMobileWhatWeDoOpen(!mobileWhatWeDoOpen)}
                  >
                    <span>What We Do</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${mobileWhatWeDoOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileWhatWeDoOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#5a7a96]/20 pl-3">
                      <Link href="/healthcare" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Healthcare</Link>
                      <Link href="/education" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Education</Link>
                      <Link href="/skill-development" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Skill Development</Link>
                      <Link href="/women-empowerment" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Women Empowerment</Link>
                      <Link href="/child-welfare" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Child Welfare</Link>
                      <Link href="/senior-citizen-care" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Senior Citizen Care</Link>
                      <Link href="/poverty-relief" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Poverty Relief</Link>
                      <Link href="/disaster-relief" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Disaster Relief</Link>
                      <Link href="/environmental-protection" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Environmental Protection</Link>
                      <Link href="/mental-health" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Mental Health Awareness</Link>
                    </div>
                  )}
                </div>
                {/* Mobile Get Involved - Expandable */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setMobileGetInvolvedOpen(!mobileGetInvolvedOpen)}
                  >
                    <span>Get Involved</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${mobileGetInvolvedOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileGetInvolvedOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#5a7a96]/20 pl-3">
                      <Link href="/volunteering" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Volunteering &amp; Internships</Link>
                      <Link href="/corporate-partnerships" className="block px-2 py-1.5 text-gray-600 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors text-sm" onClick={() => setIsMenuOpen(false)}>Corporate Partnerships</Link>
                    </div>
                  )}
                </div>
                {/* Mobile Search */}
                <div className="px-3 py-2">
                  <form onSubmit={handleSearch} className="flex items-center bg-gray-50 rounded-md border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent text-sm focus:outline-none flex-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                      <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </header>
  );
}
