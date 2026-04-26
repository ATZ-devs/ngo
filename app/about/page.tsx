import Image from "next/image";

export default function About() {
  return (
    <div className="bg-white">
      {/* About Us Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-start">
            {/* Left Column - 60% width (3/5) */}
            <div className="lg:col-span-3 space-y-12">
              {/* About Us Title */}
              <div>
                <h1 className="heading-section text-gray-900 text-left mb-4">About Us</h1>
                <div className="w-20 h-1 bg-gray-800 mb-8"></div>
                <p className="text-lg text-gray-700 leading-relaxed font-serif">
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
              <div className="bg-[#6D8BA3] rounded-2xl p-6 sm:p-12 h-64 sm:h-96 flex flex-col items-center justify-center text-center">
                {/* Handshake Icon */}
                <Image
                  src="/assets/handshake.png"
                  alt="Handshake"
                  width={80}
                  height={80}
                  className="mb-6 invert"
                />
                <h3 className="text-2xl font-medium text-white">Help Someone</h3>
              </div>
            </div>
          </div>

          {/* Full Width Mission Paragraph */}
          <div className="mt-12">
            <p className="text-lg text-gray-700 leading-relaxed font-serif max-w-6xl mx-auto">
              At Jeevkutumb Foundation, our mission is to uplift and empower communities through sustainable, inclusive, and impactful initiatives. We work across key areas - including education, healthcare, women empowerment, elderly care, animal welfare, and environmental protection - with the belief that real change begins at the grassroots level. Guided by over three decades of hands-on service by our founding members, we strive to bring dignity, opportunity, and support to the most vulnerable. Through compassion, collaboration, and action, we aim to build a world where every individual, regardless of their background, has the chance to lead a life of purpose and well-being. Jeevkutumb is not just a foundation - it is a family committed to serving humanity.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-[#6D8BA3] section-padding">
        <div className="section-container">
          {/* Section Title */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4" style={{ fontFamily: 'var(--font-playfair-display)' }}>Our Team</h2>
          </div>

          {/* Director Card */}
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Photo — whole image, no cropping */}
              <div className="w-full sm:w-56 flex-shrink-0 overflow-hidden">
                <Image
                  src="/assets/Director.png"
                  alt="Mr. Rajendra Soni - Director, JeevKutumb Foundation"
                  width={400}
                  height={500}
                  className="w-full h-auto"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col justify-center p-6 sm:p-8 space-y-3">
                <div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair-display)' }}>
                    Mr. Rajendra Soni
                  </h3>
                  <p className="text-white/60 text-sm font-medium tracking-wide uppercase mt-1">Director, JeevKutumb Foundation</p>
                </div>
                <div className="w-10 h-0.5 bg-white/40"></div>
                <p className="text-white/85 leading-relaxed">
                  A Mumbai-based businessman with over 30 years of dedicated involvement in social work, leading and supporting initiatives focused on community development and social welfare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}