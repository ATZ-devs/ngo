import Link from "next/link";
import Image from "next/image";

export default function CorporatePartnershipsPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[300px] flex items-center bg-[#6D8BA3]">
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full border-2 border-white/20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-10 bottom-10 w-64 h-64 rounded-full border border-white/10"></div>
        <div className="section-container relative z-10 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-white mb-4" style={{ fontFamily: 'var(--font-playfair-display)' }}>
            Corporate Partnerships
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Partner with us to create lasting community impact through CSR initiatives.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="flex-1 py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8 bg-white flex items-center">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-12">
              <div className="flex justify-center mb-6">
                <Image
                  src="/assets/handshake.png"
                  alt="Partnership"
                  width={64}
                  height={64}
                  className="opacity-70"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Interest!</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We appreciate your interest in partnering with JeevKutumb Foundation. At this time, we are not actively seeking new corporate partnerships, but we are always open to meaningful collaborations in the future.
              </p>
              <p className="text-gray-600">
                Please feel free to reach out to us if you have a specific proposal or would like to be notified when partnership opportunities become available.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate#donation-form"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#5a7a96] text-white font-semibold rounded-full text-lg hover:bg-[#4a6a86] transition-all duration-200 shadow-lg"
              >
                Support Us
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
