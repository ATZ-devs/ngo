import Link from "next/link";
import Image from "next/image";

export default function EnvironmentalProtectionPage() {
  const initiatives = [
    "Organising beach clean-up drives",
    "Conducting tree plantation activities",
    "Spreading awareness about cleanliness and responsible waste disposal",
    "Encouraging simple, everyday practices that reduce environmental impact",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <Image
          src="/assets/Environmental Protection.png"
          alt="Environmental Protection Initiative"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#5a7a96]/70" />
        <div className="section-container relative z-10 py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight" style={{ fontFamily: 'var(--font-playfair-display)' }}>
            Environmental Protection
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-gray-900 mb-8">Our Environmental Protection Program</h2>
            <ul className="space-y-4">
              {initiatives.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-lg text-gray-700 leading-relaxed">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#5a7a96] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#5a7a96] text-white section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-6">Support Our Environmental Protection Mission</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto">
            Your donation can help us protect and preserve our environment.
          </p>
          <Link href="/donate" className="inline-flex items-center px-6 py-3 sm:px-10 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-[#5a7a96] font-semibold rounded-full transition-all duration-200 text-base sm:text-lg">
            DONATE FOR ENVIRONMENT
          </Link>
        </div>
      </section>
    </div>
  );
}