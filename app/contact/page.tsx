"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiry_type: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiry_type: "general"
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "volunteer", label: "Volunteer Opportunities" },
    { value: "partnership", label: "Partnership/Collaboration" },
    { value: "donation", label: "Donation Related" },
    { value: "program", label: "Program Information" },
    { value: "media", label: "Media/Press Inquiry" }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="healthcare-gradient section-padding">
        <div className="section-container">
          <div className="text-center">
            <h1 className="heading-xl mb-6 text-gray-900">Get In Touch</h1>
            <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed">
              Have questions about our programs? Want to volunteer or partner with us?
              Ready to make a donation? We&apos;d love to hear from you and help you get involved.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-md mb-6 text-gray-900">Contact Information</h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Reach out to us through any of these channels. Our team is here to answer your questions
                  and help you join our mission to create positive change.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="card-testimonial">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Address</h3>
                      <p className="text-gray-600 mb-3">Send us a message anytime - we typically respond within 24 hours</p>
                      <a
                        href="mailto:Jeevkutumbfoundation@gmail.com"
                        className="text-teal-600 font-medium hover:text-teal-700 transition-colors text-lg"
                      >
                        Jeevkutumbfoundation@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-testimonial">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Number</h3>
                      <p className="text-gray-600 mb-3">Call us directly to speak with our team</p>
                      <a
                        href="tel:+917710075418"
                        className="text-teal-600 font-medium hover:text-teal-700 transition-colors text-lg"
                      >
                        +91 77100 75418
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Available Monday - Saturday, 9 AM - 6 PM</p>
                    </div>
                  </div>
                </div>

                <div className="card-testimonial">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media</h3>
                      <p className="text-gray-600 mb-3">Follow us for updates and connect with our community</p>
                      <div className="flex space-x-4">
                        <a
                          href="https://x.com/jeevkutumb?s=21"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-700 transition-colors font-medium"
                        >
                          Twitter
                        </a>
                        <span className="text-gray-400">•</span>
                        <a
                          href="https://www.instagram.com/jeevkutumbfoundation?igsh=MW45aTllZ2FybDM3dw%3D%3D&utm_source=qr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-700 transition-colors font-medium"
                        >
                          Instagram
                        </a>
                        <span className="text-gray-400">•</span>
                        <a
                          href="https://www.threads.com/@jeevkutumbfoundation?igshid=NTc4MTIwNjQ2YQ=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-700 transition-colors font-medium"
                        >
                          Threads
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-teal-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link href="/donate" className="btn-primary text-center">
                    Make a Donation
                  </Link>
                  <Link href="/about" className="btn-secondary text-center">
                    Learn About Us
                  </Link>
                  <Link href="/programs" className="btn-outline text-center">
                    View Programs
                  </Link>
                  <a href="mailto:Jeevkutumbfoundation@gmail.com" className="btn-outline text-center">
                    Send Quick Email
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-program">
              <div className="bg-teal-600 text-white p-6">
                <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-teal-100">Fill out the form below and we&apos;ll get back to you soon</p>
              </div>

              <div className="p-6">
                {submitted && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="text-emerald-800 font-semibold">Message Sent Successfully!</h3>
                        <p className="text-emerald-700 text-sm">We&apos;ll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        name="inquiry_type"
                        value={formData.inquiry_type}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      >
                        {inquiryTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Brief subject of your message"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell us how we can help you or what you'd like to know..."
                      rows={6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                      isSubmitting
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "btn-primary"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                          <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                        </svg>
                        <span>Sending Message...</span>
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    By submitting this form, you agree to our privacy policy. We&apos;ll never share your information.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-6 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Quick answers to common questions about JeevKutumb Foundation and our programs
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How can I volunteer with JeevKutumb Foundation?",
                answer: "We welcome volunteers from all backgrounds! You can help with healthcare camps, educational programs, skill development training, or administrative support. Contact us to discuss opportunities that match your skills and availability."
              },
              {
                question: "Are donations tax-deductible?",
                answer: "Yes! JeevKutumb Foundation is registered under Section 80G of the Income Tax Act. You can claim up to 50% tax deduction on your donations. We provide instant digital receipts with your 80G certificate."
              },
              {
                question: "How do I know my donation is being used effectively?",
                answer: "We maintain complete transparency with regular impact reports, financial statements, and program updates. You'll receive updates showing exactly how your contribution is making a difference in communities."
              },
              {
                question: "Can organizations partner with you?",
                answer: "Absolutely! We collaborate with corporations, NGOs, educational institutions, and healthcare providers. Partnership opportunities include CSR programs, employee volunteering, program sponsorship, and joint initiatives."
              },
              {
                question: "What areas do you currently serve?",
                answer: "We currently operate across multiple regions, focusing on underserved communities. Our programs span healthcare, education, women empowerment, child welfare, and environmental protection. Contact us to learn about specific locations."
              },
              {
                question: "How can I stay updated on your work?",
                answer: "Follow us on social media (Twitter, Instagram, Threads) for regular updates. You can also subscribe to our newsletter through our website or contact us directly for program-specific information."
              }
            ].map((faq, index) => (
              <div key={index} className="card-program">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Have a different question?</p>
            <Link href="/about" className="btn-secondary">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}