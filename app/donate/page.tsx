"use client";

import Link from "next/link";
import { useState } from "react";

export default function DonatePage() {
  const [citizenship, setCitizenship] = useState("indian");
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "INDIA",
    panNumber: ""
  });
  const [acceptTerms, setAcceptTerms] = useState(true);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#6D8BA3] section-padding relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full border-2 border-white/20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-20 top-20 w-64 h-64 rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-10 bottom-10 w-32 h-32 rounded-full border border-white/15"></div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Half */}
            <div className="space-y-8">
              <h1 className="text-6xl font-serif leading-tight">
                <span className="block text-transparent text-stroke text-white">Help people</span>
                <span className="block text-transparent text-stroke text-white">Save Tax</span>
              </h1>
              <div>
                <Link
                  href="#form"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#6D8BA3] font-semibold rounded-full transition-all duration-200 text-lg bg-transparent"
                >
                  How to Save Tax?
                </Link>
              </div>
            </div>

            {/* Right Half - Hands Illustration Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md h-96 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/30">
                <div className="text-center text-white/70">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm">Diverse hands stacked together</p>
                  <p className="text-xs mt-1">(Unity illustration placeholder)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS for outline text */}
        <style jsx>{`
          .text-stroke {
            -webkit-text-stroke: 2px white;
            -webkit-text-fill-color: transparent;
          }
        `}</style>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="section-padding bg-white" id="form">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-16 items-start">

            {/* Left Column - 40% width (2/5) Program Info */}
            <div className="lg:col-span-2 space-y-12">
              {/* First Program Block */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">
                  <span className="text-gray-900">Our</span>{" "}
                  <span className="text-[#6D8BA3] italic">Healthcare</span>{" "}
                  <span className="text-gray-900">Program</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>

              {/* Second Program Block */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">
                  <span className="text-gray-900">Our</span>{" "}
                  <span className="text-[#6D8BA3] italic">Education</span>{" "}
                  <span className="text-gray-900">Program</span>
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.
                </p>
              </div>
            </div>

            {/* Right Column - 60% width (3/5) Donation Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <form className="space-y-6">

                  {/* Citizenship */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Citizenship *</label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="citizenship"
                          value="indian"
                          checked={citizenship === "indian"}
                          onChange={(e) => setCitizenship(e.target.value)}
                          className="w-4 h-4 text-[#6D8BA3] border-gray-300 focus:ring-[#6D8BA3]"
                        />
                        <span className="ml-2 text-gray-900">Indian Citizen</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="citizenship"
                          value="foreign"
                          checked={citizenship === "foreign"}
                          onChange={(e) => setCitizenship(e.target.value)}
                          className="w-4 h-4 text-[#6D8BA3] border-gray-300 focus:ring-[#6D8BA3]"
                        />
                        <span className="ml-2 text-gray-900">Foreign Citizen/NRI</span>
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Indian citizen option is for transacting through Indian bank accounts or cards issued by Indian banks.
                    </p>
                  </div>

                  {/* Helper Note */}
                  <p className="text-sm text-gray-500">
                    Special characters not allowed in full name field
                  </p>

                  {/* Full Name and Date of Birth */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900"
                        placeholder="dd-mm-yyyy"
                      />
                    </div>
                  </div>

                  {/* Email and Mobile */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Mobile Number *</label>
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Entering Pincode will autofill City and State
                    </p>
                  </div>

                  {/* Pincode and City */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Pincode *</label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* State and Country */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">State</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* PAN Number */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">PAN Number</label>
                    <input
                      type="text"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value)}
                      className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* PAN Warning */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="font-bold text-amber-800">
                      Please note that if you do not provide your PAN Number, you will not be able to claim 50% tax exemption u/s 80G in India
                    </p>
                  </div>

                  {/* Disclaimer Paragraphs */}
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      By proceeding, you agree to our terms of service and privacy policy. All donations are processed securely through encrypted channels... <Link href="#" className="text-[#6D8BA3] hover:underline">Read More</Link>
                    </p>
                    <p className="text-sm text-gray-500">
                      JeevKutumb Foundation is authorized to issue 80G receipts for tax exemption. Your donation will be used for the intended charitable purposes... <Link href="#" className="text-[#6D8BA3] hover:underline">Read More</Link>
                    </p>
                  </div>

                  {/* Declaration Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="declaration"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-4 h-4 text-[#6D8BA3] border-gray-300 rounded focus:ring-[#6D8BA3] mt-1"
                    />
                    <label htmlFor="declaration" className="text-sm text-gray-700 leading-relaxed">
                      I hereby declare that I am a citizen of India, making this donation out of my own funds. The information provided is accurate and complete... <Link href="#" className="text-[#6D8BA3] hover:underline">Read More</Link>
                    </label>
                  </div>

                  {/* Payment Methods Strip */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <div className="flex justify-center items-center space-x-6 mb-4">
                      {/* RuPay Logo */}
                      <div className="w-16 h-10 bg-white rounded border flex items-center justify-center p-1">
                        <svg viewBox="0 0 200 60" className="w-full h-full">
                          <rect width="200" height="60" fill="#0066CC"/>
                          <text x="100" y="35" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">RuPay</text>
                        </svg>
                      </div>

                      {/* UPI Logo */}
                      <div className="w-16 h-10 bg-white rounded border flex items-center justify-center p-1">
                        <svg viewBox="0 0 100 60" className="w-full h-full">
                          <rect width="100" height="60" fill="#FF6600"/>
                          <text x="50" y="25" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">UPI</text>
                          <text x="50" y="40" fontFamily="Arial, sans-serif" fontSize="6" fill="white" textAnchor="middle">UNIFIED PAYMENTS</text>
                          <circle cx="15" cy="15" r="8" fill="white"/>
                          <circle cx="85" cy="45" r="8" fill="white"/>
                        </svg>
                      </div>

                      {/* VISA Logo */}
                      <div className="w-16 h-10 bg-white rounded border flex items-center justify-center p-1">
                        <svg viewBox="0 0 100 32" className="w-full h-full">
                          <rect width="100" height="32" fill="white"/>
                          <path d="M37.5 8.5L32.1 23.5h-4.8L24.1 13.2c-.3-.8-.6-1.1-1.5-1.4-1.5-.5-3.9-.9-6-.2v-.1L17.5 8.5h8.8c1.1 0 2.1.7 2.4 1.9l2.2 11.6L36.3 8.5h5.2zM67.8 23.5h-4.9L67 8.5h4.5c1 0 1.9.6 2.3 1.5l4.1 13.5h-4.6l-.8-2.1H67L67.8 23.5zm1.7-5.4h3.4l-1.7-4.4L69.5 18.1zM58.1 12.9c0-1.3-1.3-2.7-4.1-2.7-1.8 0-3.8.6-3.8 2s1.4 1.9 2.5 2.3c1.8.6 2.1.9 2.1 1.4s-.8 1.1-2.1 1.1c-1.8 0-2.8-.8-2.8-.8l-.5 2.9s1.2.5 3.1.5c2.8 0 4.4-1.4 4.4-3.1 0-1-.6-1.8-2.7-2.4-1.3-.4-2.1-.7-2.1-1.2s.6-1 1.9-1c1.1 0 2.2.4 2.2.4l.5-2.9s-1.1-.4-2.6-.4c-2.7 0-4.4 1.5-4.4 3.6 0 2.7 3.7 2.8 3.7 4.2 0 .5-.4.9-1.3.9-.9 0-2.2-.4-2.2-.4l-.5 3s1 .4 2.8.4c2.6 0 4.3-1.3 4.3-3.1-.1-1.7-3.9-3-3.9-4.4z" fill="#1A1F71"/>
                        </svg>
                      </div>

                      {/* Mastercard Logo */}
                      <div className="w-16 h-10 bg-white rounded border flex items-center justify-center p-1">
                        <svg viewBox="0 0 100 60" className="w-full h-full">
                          <circle cx="35" cy="30" r="20" fill="#FF5F00"/>
                          <circle cx="65" cy="30" r="20" fill="#EB001B"/>
                          <path d="M50 15c-3.3 2.4-5.5 6.1-5.5 10.5s2.2 8.1 5.5 10.5c3.3-2.4 5.5-6.1 5.5-10.5S53.3 17.4 50 15z" fill="#FF5F00"/>
                          <text x="50" y="50" fontFamily="Arial, sans-serif" fontSize="8" fill="#000" textAnchor="middle">mastercard</text>
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">We accept all major payment methods</p>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: '#F5C518' }}
                  >
                    Continue To Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}