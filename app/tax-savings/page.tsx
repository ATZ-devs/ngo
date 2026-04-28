import Link from "next/link";

export default function TaxSavingsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[300px] flex items-center bg-[#6D8BA3]">
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full border-2 border-white/20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-10 bottom-10 w-64 h-64 rounded-full border border-white/10"></div>
        <div className="section-container relative z-10 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-white mb-4" style={{ fontFamily: 'var(--font-playfair-display)' }}>
            How You Can Save Tax
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Learn about the tax benefits available when you donate to JeevKutumb Foundation.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Donations made to <strong>JeevKutumb Foundation</strong> are eligible for tax benefits under <strong>Section 80G of the Income Tax Act, 1961</strong>.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Eligible donors may claim a deduction on the donated amount while filing their Income Tax Return, subject to applicable provisions and limits.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                A valid donation receipt will be issued for this purpose.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
                <p className="text-amber-800 font-semibold text-lg">
                  <strong>Note:</strong> Tax benefits are subject to prevailing laws. Donors are advised to consult their tax advisor for details.
                </p>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/donate#donation-form"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#5a7a96] text-white font-semibold rounded-full text-lg hover:bg-[#4a6a86] transition-all duration-200 shadow-lg"
              >
                Donate Now
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
