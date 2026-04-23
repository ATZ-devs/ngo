import Link from "next/link";
import Image from "next/image";

export default function VolunteeringPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[300px] flex items-center bg-[#6D8BA3]">
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full border-2 border-white/20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-10 bottom-10 w-64 h-64 rounded-full border border-white/10"></div>
        <div className="section-container relative z-10 py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-white mb-4" style={{ fontFamily: 'var(--font-playfair-display)' }}>
            Volunteering &amp; Internships
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Be a part of our journey to create meaningful change in communities.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12">
              <div className="flex justify-center mb-6">
                <Image
                  src="/assets/please.png"
                  alt="Thank you"
                  width={64}
                  height={64}
                  className="opacity-70"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Interest!</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We truly appreciate your willingness to volunteer or intern with JeevKutumb Foundation. At the moment, we are not accepting new volunteers or interns, but we encourage you to check back soon as opportunities may open up in the future.
              </p>
              <p className="text-gray-600">
                In the meantime, you can support our mission by making a donation or spreading the word about our programs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#5a7a96] text-white font-semibold rounded-full text-lg hover:bg-[#4a6a86] transition-all duration-200 shadow-lg"
              >
                Donate Instead
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
