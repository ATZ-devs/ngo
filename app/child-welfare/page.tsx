import Link from "next/link";

export default function ChildWelfarePage() {
  const initiatives = [
    "Providing food and clothing to children in need, including those in orphanages and public schools",
    "Supporting access to education through basic learning materials and school-related support",
    "Supporting children who lack access to basic necessities",
    "Speaking up against child labour and child trafficking",
    "Creating awareness within communities about child rights and protection",
    "Engaging with children through small activities and support where needed",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#5a7a96] section-padding">
        <div className="section-container">
          <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight" style={{ fontFamily: 'var(--font-playfair-display)' }}>
            Child Welfare
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section text-gray-900 mb-8">Our Child Welfare Program</h2>
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
          <h2 className="heading-md text-white mb-6">Support Our Child Welfare Mission</h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Your donation can help us protect and nurture children in need.
          </p>
          <Link href="/donate" className="inline-flex items-center px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-[#5a7a96] font-semibold rounded-full transition-all duration-200 text-lg">
            DONATE FOR CHILD WELFARE
          </Link>
        </div>
      </section>
    </div>
  );
}