"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

async function loadRazorpaySdk(): Promise<boolean> {
  if (window.Razorpay) {
    return true;
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function DonatePage() {
  const [citizenship, setCitizenship] = useState("indian");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    donationAmount: "500",
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const countryCode = citizenship === "indian" ? "IN" : "US";
      const amountMajor = Number(formData.donationAmount);

      if (!amountMajor || amountMajor <= 0) {
        throw new Error("Please enter a valid donation amount.");
      }

      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donorName: formData.fullName,
          donorEmail: formData.email,
          amountMajor,
          countryCode,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to start payment.");
      }

      if (data.provider === "stripe") {
        window.location.href = data.checkoutUrl as string;
        return;
      }

      const sdkLoaded = await loadRazorpaySdk();
      if (!sdkLoaded || !window.Razorpay) {
        throw new Error("Razorpay SDK failed to load.");
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amountMinor,
        currency: data.currency,
        name: "NGO Donation",
        description: "Donation payment",
        order_id: data.orderId,
        prefill: {
          name: data.donorName,
          email: data.donorEmail,
          contact: formData.mobile,
        },
        theme: {
          color: "#6D8BA3",
        },
      });

      rzp.open();
      setSubmitMessage("Payment initiated. You will receive your receipt by email after payment verification.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center">
        {/* Full background image */}
        <Image
          src="/assets/MultipleHands.png"
          alt="Diverse hands stacked together"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#6D8BA3]/70" />

        {/* Decorative Circles */}
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full border-2 border-white/20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-20 top-20 w-64 h-64 rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-10 bottom-10 w-32 h-32 rounded-full border border-white/15"></div>

        <div className="section-container relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-serif leading-tight text-white mb-8" style={{ fontFamily: 'var(--font-playfair-display)' }}>
              Help people<br />Save Tax
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
        </div>
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
                  Providing medicines to those who cannot afford basic treatment, organising blood donation and medical check-up camps, conducting health awareness programmes, and organising vaccination drives where needed.
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
                  Providing essential learning materials such as stationery, books, and school supplies to students in need, supporting school fee payments for children from financially constrained backgrounds, and offering scholarships to deserving and committed students.
                </p>
              </div>
            </div>

            {/* Right Column - 60% width (3/5) Donation Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>

                  {/* Donation Amount */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Donation Amount *</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={formData.donationAmount}
                      onChange={(e) => handleInputChange("donationAmount", e.target.value)}
                      className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

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
                    disabled={isSubmitting}
                    className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: '#F5C518' }}
                  >
                    {isSubmitting ? "Processing..." : "Continue To Payment"}
                  </button>

                  {submitMessage ? (
                    <p className="text-sm text-gray-700">{submitMessage}</p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}