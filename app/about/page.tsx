import Link from "next/link";

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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
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

            {/* Middle Column - Team Photo Placeholder */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm font-medium">Team Member Photo</p>
                  <p className="text-xs">(Placeholder)</p>
                </div>
              </div>
            </div>

            {/* Right Column - Team Photo Placeholder */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm font-medium">Team Member Photo</p>
                  <p className="text-xs">(Placeholder)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}