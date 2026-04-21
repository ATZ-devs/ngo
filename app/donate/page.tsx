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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-fill city and state based on pincode
    if (field === "pincode" && value.length === 6 && /^\d{6}$/.test(value)) {
      fetch(`https://api.postalpincode.in/pincode/${value}`)
        .then(res => res.json())
        .then(data => {
          if (data?.[0]?.Status === "Success" && data[0].PostOffice?.length > 0) {
            const postOffice = data[0].PostOffice[0];
            setFormData(prev => ({
              ...prev,
              city: postOffice.District || prev.city,
              state: postOffice.State || prev.state
            }));
          }
        })
        .catch(() => {
          // Silently fail - user can manually enter city/state
        });
    }
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
      console.error("Donation error:", error);
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
                href="/tax-savings"
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
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair-display)' }}>
                Our <span className="text-[#6D8BA3] italic">Programs</span>
              </h2>

              <div className="space-y-5">
                {/* Healthcare */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Healthcare</h3>
                    <p className="text-sm text-gray-600">Free medical camps, health awareness drives, and medicine distribution for underserved communities.</p>
                  </div>
                </div>

                {/* Education */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Education</h3>
                    <p className="text-sm text-gray-600">Scholarships, learning materials, and school fee support for underprivileged students.</p>
                  </div>
                </div>

                {/* Skill Development */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Skill Development</h3>
                    <p className="text-sm text-gray-600">Vocational training and digital literacy programs for sustainable livelihoods.</p>
                  </div>
                </div>

                {/* Women Empowerment */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 11.33V8h3V4h-8v4h3v3.33C7.26 12.11 5 14.84 5 18h14c0-3.16-2.26-5.89-6-6.67zM7.08 16c.56-1.71 2.21-3 4.92-3s4.36 1.29 4.92 3H7.08z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Women Empowerment</h3>
                    <p className="text-sm text-gray-600">Self-help groups, microfinance, and leadership training for women.</p>
                  </div>
                </div>

                {/* Child Welfare */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Child Welfare</h3>
                    <p className="text-sm text-gray-600">Child protection, nutritional support, and educational programs.</p>
                  </div>
                </div>

                {/* Senior Citizen Care */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Senior Citizen Care</h3>
                    <p className="text-sm text-gray-600">Health checkups, social engagement, and home care services for the elderly.</p>
                  </div>
                </div>

                {/* Poverty Relief */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Poverty Relief</h3>
                    <p className="text-sm text-gray-600">Food security, emergency assistance, and livelihood generation for families in need.</p>
                  </div>
                </div>

                {/* Disaster Relief */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Disaster Relief</h3>
                    <p className="text-sm text-gray-600">Emergency rescue, shelter, food, and medical aid during natural disasters.</p>
                  </div>
                </div>

                {/* Environmental Protection */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c9 0 13-10 13-10C18.64 6.43 12 9 12 9c3-4 9-3.29 9-3.29C17.45 4.55 13 5 9 9.3L7 7c0-2 1-4 6-6C5 1 2 7 3 11c0 0 1-4 8-4 0 0-2 2.86-2 6 0 0 1-5 7-8 0 0 0 3-2 5s-8 2-8 2c1.5 3.67 6.5 4 6.5 4z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Environmental Protection</h3>
                    <p className="text-sm text-gray-600">Tree plantation, waste management, and sustainability initiatives.</p>
                  </div>
                </div>

                {/* Mental Health Awareness */}
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#6D8BA3] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mental Health Awareness</h3>
                    <p className="text-sm text-gray-600">Counseling services, awareness workshops, and community support groups.</p>
                  </div>
                </div>
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
                    <label className="block text-sm text-gray-500 mb-2">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
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
                      <label className="block text-sm text-gray-500 mb-2">City *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* State and Country */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">State *</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                        required
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

                  {citizenship === "indian" && (
                    <>
                      {/* PAN Number */}
                      <div>
                        <label className="block text-sm text-gray-500 mb-2">PAN Number</label>
                        <input
                          type="text"
                          value={formData.panNumber}
                          onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                          className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-[#6D8BA3] focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                        />
                      </div>

                      {/* PAN Warning */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="font-bold text-amber-800">
                          Please note that if you do not provide your PAN Number, you will not be able to claim 50% tax exemption u/s 80G in India
                        </p>
                      </div>
                    </>
                  )}

                  {/* Indian Citizen Declaration */}
                  {citizenship === "indian" && (
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="declaration"
                        defaultChecked
                        className="w-4 h-4 text-[#6D8BA3] border-gray-300 rounded focus:ring-[#6D8BA3] mt-1 flex-shrink-0"
                      />
                      <label htmlFor="declaration" className="text-sm text-gray-700 leading-relaxed">
                        I hereby declare that I am a citizen of India, making this donation out of my own funds. The information provided above is correct to the best of my knowledge. I know that all further communications will be done on contact details provided above.
                      </label>
                    </div>
                  )}

                  {/* Payment Methods Strip */}
                  <div className="bg-[#fdf8ec] border border-yellow-200 rounded-lg px-6 py-5 text-center">
                    <div className="flex justify-center items-center gap-3 mb-3">
                      <div className="w-20 h-12 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-2">
                        <Image src="/assets/rupay-logo.png" alt="RuPay" width={64} height={64} unoptimized className="object-contain w-full h-full" />
                      </div>
                      <div className="w-20 h-12 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-2">
                        <Image src="/assets/upi-logo.png" alt="UPI" width={64} height={64} unoptimized className="object-contain w-full h-full" />
                      </div>
                      <div className="w-20 h-12 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-2">
                        <Image src="/assets/visa-logo.png" alt="Visa" width={64} height={64} unoptimized className="object-contain w-full h-full" />
                      </div>
                      <div className="w-20 h-12 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center p-2">
                        <Image src="/assets/Mastercard/mastercard-logo.png" alt="Mastercard" width={64} height={64} unoptimized className="object-contain w-full h-full" />
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