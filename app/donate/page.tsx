"use client";

import Link from "next/link";
import { useState } from "react";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [selectedProgram, setSelectedProgram] = useState("general");

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const programs = [
    { id: "general", name: "General Fund", description: "Support all our programs" },
    { id: "healthcare", name: "Healthcare Initiative", description: "Medical services & health education" },
    { id: "education", name: "Education Program", description: "Scholarships & learning resources" },
    { id: "emergency", name: "Emergency Relief", description: "Disaster response & immediate aid" },
    { id: "women", name: "Women Empowerment", description: "Skill development for women" },
    { id: "child", name: "Child Welfare", description: "Child care & protection programs" }
  ];

  const handleDonate = () => {
    const finalAmount = customAmount || selectedAmount;
    // In a real implementation, this would integrate with Stripe/Razorpay
    alert(`Thank you for your ${donationType === 'monthly' ? 'monthly' : ''} donation of ₹${finalAmount} to ${programs.find(p => p.id === selectedProgram)?.name}! This would redirect to payment gateway.`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="heading-xl mb-8 text-gray-900">Help People Save Tax</h1>
            <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed mb-8">
              Make a meaningful impact while saving on taxes. Donations to JeevKutumb Foundation
              are eligible for tax deduction under Section 80G of the Income Tax Act.
              Join thousands of donors in creating positive change.
            </p>

            <div className="inline-flex items-center bg-red-100 text-red-800 px-6 py-3 rounded-full font-semibold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 113.138-3.138z" />
              </svg>
              80G Tax Exemption Certified
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Donation Form */}
              <div className="card-program">
                <div className="bg-teal-600 text-white p-6">
                  <h2 className="text-2xl font-bold mb-2">Choose Your Impact</h2>
                  <p className="text-teal-100">Select amount and program to support</p>
                </div>

                <div className="p-6 space-y-6">

                  {/* Donation Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Donation Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setDonationType("one-time")}
                        className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                          donationType === "one-time"
                            ? "bg-teal-600 text-white border-teal-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-teal-300"
                        }`}
                      >
                        One-time
                      </button>
                      <button
                        onClick={() => setDonationType("monthly")}
                        className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                          donationType === "monthly"
                            ? "bg-teal-600 text-white border-teal-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-teal-300"
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Amount {donationType === "monthly" && "(per month)"}
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                          className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                            selectedAmount === amount && !customAmount
                              ? "bg-teal-600 text-white border-teal-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-teal-300"
                          }`}
                        >
                          ₹{amount.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(0);
                        }}
                        className="form-input pl-8"
                        min="100"
                      />
                    </div>
                  </div>

                  {/* Program Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Choose Program to Support</label>
                    <div className="space-y-2">
                      {programs.map((program) => (
                        <label key={program.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="program"
                            value={program.id}
                            checked={selectedProgram === program.id}
                            onChange={(e) => setSelectedProgram(e.target.value)}
                            className="text-teal-600 focus:ring-teal-500 mr-3"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{program.name}</div>
                            <div className="text-sm text-gray-600">{program.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Donate Button */}
                  <button
                    onClick={handleDonate}
                    disabled={!selectedAmount && !customAmount}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                      selectedAmount || customAmount
                        ? "btn-donate cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {donationType === "monthly" ? "Start Monthly Donation" : "Donate Now"}
                    {(selectedAmount || customAmount) && ` ₹${(customAmount || selectedAmount).toLocaleString()}`}
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    Secure payment powered by Razorpay & Stripe • Your donation is encrypted and secure
                  </p>
                </div>
              </div>

              {/* Impact Information */}
              <div className="space-y-6">
                <div className="card-program">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Impact</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-600 font-bold">₹500</span>
                        </div>
                        <p className="text-gray-700">Provides basic medical kit for one family</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                          <span className="text-sky-600 font-bold">₹1K</span>
                        </div>
                        <p className="text-gray-700">Sponsors one child&apos;s education for a month</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 font-bold">₹2.5K</span>
                        </div>
                        <p className="text-gray-700">Supports skill development training for one person</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-bold">₹5K</span>
                        </div>
                        <p className="text-gray-700">Funds complete health checkup for 5 individuals</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-program border-2 border-red-100 bg-red-50">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-red-800">Tax Benefits</h3>
                    <div className="space-y-3 text-red-700">
                      <p className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <strong>80G Tax Deduction</strong> - Save up to 50% in taxes
                      </p>
                      <p className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Instant digital receipt with 80G certificate
                      </p>
                      <p className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Example: Donate ₹10,000, Save ₹5,000 in tax
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">Need help or have questions?</p>
                  <div className="space-y-2">
                    <Link href="/contact" className="btn-secondary block">
                      Contact Our Team
                    </Link>
                    <a href="tel:+919821075418" className="btn-outline block">
                      Call: +91 98210 75418
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-6 text-gray-900">Why Donate with Us?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Transparency</h3>
              <p className="text-gray-600">Every rupee is accounted for. Regular impact reports and financial transparency.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-sky-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Impact</h3>
              <p className="text-gray-600">Your donation directly reaches beneficiaries. No middlemen, maximum impact.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tax Benefits</h3>
              <p className="text-gray-600">Section 80G certified. Get immediate tax receipts and save money while helping others.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}