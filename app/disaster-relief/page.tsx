import Link from "next/link";
import Image from "next/image";

export default function DisasterReliefPage() {
  const initiatives = [
    "Providing food and basic supplies in disaster-affected areas",
    "Distributing essential items such as water, clothing, and daily-use materials",
    "Offering immediate support to affected communities wherever possible",
    "Assisting in relief efforts based on the needs of the situation",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <Image
          src="/assets/Disaster Relief.png"
          alt="Disaster Relief"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#5a7a96]/70" />
        <div className="section-container relative z-10 py-20">
          <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight" style={{ fontFamily: 'var(--font-playfair-display)' }}>
            Disaster Relief
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-gray-900 mb-8">Our Disaster Relief Program</h2>
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
          <h2 className="heading-md text-white mb-6">Support Our Disaster Relief Mission</h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Your donation can help us provide immediate relief during disasters.
          </p>
          <Link href="/donate" className="inline-flex items-center px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-[#5a7a96] font-semibold rounded-full transition-all duration-200 text-lg">
            DONATE FOR DISASTER RELIEF
          </Link>
        </div>
      </section>
    </div>
  );
}