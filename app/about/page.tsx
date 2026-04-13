import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="bg-white">
      {/* About Us Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Left Column - 60% width (3/5) */}
            <div className="lg:col-span-3 space-y-12">
              {/* About Us Title */}
              <div>
                <h1 className="heading-section text-gray-900 text-left mb-4">About Us</h1>
                <div className="w-20 h-1 bg-gray-800 mb-8"></div>
                <p className="text-lg text-gray-700 text-center leading-relaxed font-serif">
                  Jeevkutumb Foundation was established in 2025, but its roots trace back over three decades of personal, hands-on involvement in social causes by its founding members. Long before it became a registered entity, the individuals behind Jeevkutumb were actively engaged in blood donation drives across Maharashtra, educational support for underprivileged children, animal welfare initiatives including feeding and caring for stray animals, and disaster relief efforts during emergencies like floods. Their dedication was never tied to recognition - they served because they believed in the power of compassion and community. With the formal launch of Jeevkutumb Foundation, these years of grassroots experience, relationships, and commitment have now been channeled into a structured mission. Today, the Foundation carries forward that same spirit - with greater reach, more resources, and a deeper resolve to create lasting impact in the lives of the people and communities who need it most.
                </p>
              </div>

              {/* Our Mission Subsection */}
              <div>
                <h2 className="heading-section text-gray-900 text-left mb-4">Our Mission</h2>
                <div className="w-20 h-1 bg-gray-800 mb-8"></div>
              </div>
            </div>

            {/* Right Column - 40% width (2/5) */}
            <div className="lg:col-span-2">
              <div className="bg-[#6D8BA3] rounded-2xl p-12 h-96 flex flex-col items-center justify-center text-center">
                {/* Handshake/Helping Hand Icon */}
                <svg className="w-20 h-20 text-white mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-2a2 2 0 112 2m-2 0c0 .276.045.544.129.8M12 12.5v-2a2 2 0 114 0v2m-4 0c0-.276-.045-.544-.129-.8M12 12.5V14m6.5-1.5V14m0-2.5v-2a2 2 0 00-2-2m2 2c0 .276.045.544.129.8M19.5 12.5V14" />
                </svg>
                <h3 className="text-2xl font-medium text-white">Help Someone</h3>
              </div>
            </div>
          </div>

          {/* Full Width Mission Paragraph */}
          <div className="mt-12">
            <p className="text-lg text-gray-700 text-center leading-relaxed font-serif max-w-6xl mx-auto">
              At Jeevkutumb Foundation, our mission is to uplift and empower communities through sustainable, inclusive, and impactful initiatives. We work across key areas - including education, healthcare, women empowerment, elderly care, animal welfare, and environmental protection - with the belief that real change begins at the grassroots level. Guided by over three decades of hands-on service by our founding members, we strive to bring dignity, opportunity, and support to the most vulnerable. Through compassion, collaboration, and action, we aim to build a world where every individual, regardless of their background, has the chance to lead a life of purpose and well-being. Jeevkutumb is not just a foundation - it is a family committed to serving humanity.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-[#6D8BA3] section-padding">
        <div className="section-container">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-white mb-4" style={{ fontFamily: 'var(--font-playfair-display)' }}>Our Team</h2>
          </div>

          {/* Three Column Layout */}
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left Column - Managing Committee Description */}
            <div className="space-y-6">
              <h3 className="heading-md text-white font-bold">Managing Committee</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Jeevkutumb's leadership collective comprising of Regional and Functional Directors who provide strategic direction to organizational objectives.
              </p>
            </div>

            {/* Middle Column - Director Photo */}
            <div className="flex justify-center">
              <div className="w-64 bg-white rounded-xl overflow-hidden">
                <div className="relative w-full h-72">
                  <Image
                    src="/assets/Director.png"
                    alt="Director - JeevKutumb Foundation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-gray-900 font-semibold">Director</h4>
                  <p className="text-gray-500 text-sm">JeevKutumb Foundation</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-white/10 rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}