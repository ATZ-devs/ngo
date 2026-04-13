"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-md sticky top-0 z-[60]">
      <div className="relative">
        {/* Logo - overlaps both bars */}
        <Link href="/" className="absolute left-4 sm:left-6 lg:left-8 top-1 z-[70] block">
          <div className="w-[90px] h-[110px] relative">
            <Image
              src="/logo-full.png"
              alt="JeevKutumb Foundation Logo"
              width={280}
              height={400}
              className="object-contain drop-shadow-lg w-full h-full"
              priority
            />
          </div>
        </Link>

        {/* Top Contact Bar - Dark Slate/Steel Blue */}
        <div className="bg-[#5a7a96] text-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end items-center py-2.5 text-sm pl-24 sm:pl-28">
              {/* Contact Information */}
              <div className="flex items-center space-x-6 text-white mr-auto">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-white/95 hidden sm:inline">jeevkutumbfoundation@gmail.com</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium text-white/95">+91 77100 75418</span>
                </div>
              </div>

              {/* Search Bar and Social Media */}
              <div className="flex items-center space-x-4">
                {/* Search Bar - Pill shaped, light */}
                <div className="hidden md:flex items-center bg-white/20 backdrop-blur-sm rounded-full border border-white/30 px-4 py-1.5 hover:bg-white/25 transition-all duration-200">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-sm focus:outline-none px-2 py-1 w-36 text-white placeholder-white/70"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className="w-4 h-4 text-white/80 hover:text-white cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
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
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.186.408-2.26 1.33-3.022.812-.67 1.927-1.073 3.222-1.166 1.077-.076 2.072.007 2.975.247.002-.643-.034-1.257-.108-1.838-.222-1.726-.882-2.453-1.705-2.685-.444-.126-.958-.132-1.487-.019-.592.127-1.089.39-1.36.722l-1.677-1.39c.609-.735 1.516-1.267 2.614-1.503.88-.189 1.782-.183 2.606.019 1.652.403 2.853 1.69 3.192 4.322.083.645.123 1.347.119 2.103.459.24.888.52 1.282.842 1.172.958 1.923 2.28 2.175 3.828.342 2.097-.1 4.478-2.122 6.458-1.839 1.802-4.142 2.63-7.434 2.654zM8.894 16.343c.04.692.397 1.154.989 1.538.653.423 1.503.617 2.403.571 1.08-.058 1.904-.462 2.518-1.225.534-.665.893-1.504 1.074-2.505-.647-.181-1.343-.28-2.085-.239-1.837.132-3.533.692-4.9 1.86z"/>
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
          </div>
        </div>

        {/* Main Header - Pure White Background */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 pl-24 sm:pl-28">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <Link href="/" className="text-gray-800 hover:text-[#5a7a96] transition-colors font-medium py-2">
                  Home
                </Link>
                <Link href="/about" className="text-gray-800 hover:text-[#5a7a96] transition-colors font-medium py-2">
                  About Us
                </Link>

              {/* What We Do Dropdown */}
              <div className="relative group">
                <button className="text-gray-800 hover:text-[#5a7a96] transition-colors font-medium py-2 flex items-center">
                  What We Do
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-md border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] max-h-96 overflow-y-auto">
                  <Link href="/healthcare" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Healthcare</Link>
                  <Link href="/education" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Education</Link>
                  <Link href="/skill-development" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Skill Development</Link>
                  <Link href="/women-empowerment" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Women Empowerment</Link>
                  <Link href="/child-welfare" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Child Welfare</Link>
                  <Link href="/senior-citizen-care" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Senior Citizen Care</Link>
                  <Link href="/poverty-relief" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Poverty Relief</Link>
                  <Link href="/disaster-relief" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Disaster Relief</Link>
                  <Link href="/environmental-protection" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Environmental Protection</Link>
                  <Link href="/mental-health" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Mental Health Awareness</Link>
                </div>
              </div>

              {/* Get Involved Dropdown */}
              <div className="relative group">
                <button className="text-gray-800 hover:text-[#5a7a96] transition-colors font-medium py-2 flex items-center">
                  Get Involved
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-md border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                  <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Contact Us</Link>
                  <Link href="/donate" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5a7a96]">Donate</Link>
                </div>
              </div>
            </nav>

            {/* Donate Button & Mobile Menu - Far Right */}
            <div className="flex items-center space-x-4">
              <Link
                href="/donate"
                className="bg-[#5a7a96] hover:bg-[#4a6a86] text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>Donate Now</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#5a7a96] hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-200 bg-white">
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
                <Link
                  href="/programs"
                  className="block px-3 py-2 text-gray-700 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  What We Do
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-[#5a7a96] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Involved
                </Link>

                {/* Mobile Search */}
                <div className="px-3 py-2">
                  <div className="flex items-center bg-gray-50 rounded-md border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent text-sm focus:outline-none flex-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
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