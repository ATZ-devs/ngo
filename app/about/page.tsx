export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="healthcare-gradient section-padding">
        <div className="section-container">
          <div className="text-center">
            <h1 className="heading-xl mb-6 text-gray-900">About Us</h1>
            <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed">
              JeevKutumb Foundation is a dedicated organization working towards creating
              lasting positive change in communities through comprehensive healthcare,
              education, and social welfare programs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-lg mb-6 text-brand">Our Mission</h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    At JeevKutumb Foundation, our mission is to create a world where every individual
                    has access to quality healthcare, education, and opportunities for growth. We believe
                    that meaningful change begins with compassionate action and community involvement.
                  </p>
                  <p>
                    We are committed to addressing the fundamental challenges facing underserved
                    communities by providing comprehensive programs that focus on healthcare access,
                    educational empowerment, skill development, and social welfare initiatives.
                  </p>
                  <p>
                    Our approach is holistic, sustainable, and community-driven. We work closely with
                    local communities to understand their unique needs and develop tailored solutions
                    that create lasting impact.
                  </p>
                </div>

                {/* Mission Points */}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Healthcare for All</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Quality Education</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Community Empowerment</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Sustainable Development</span>
                  </div>
                </div>
              </div>

              {/* Mission Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-teal-100 to-sky-100 rounded-2xl p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-teal-600 rounded-full flex items-center justify-center">
                    {/* Tree of Life Illustration */}
                    <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V9H21ZM3 9H9V6.5L3 7V9ZM15 10H21V12H15V10ZM3 10H9V12H3V10ZM9 13V15.5L3 15V13H9ZM15 13H21V15L15 15.5V13ZM7 18C7 16.9 7.9 16 9 16S11 16.9 11 18H7ZM13 18C13 16.9 13.9 16 15 16S17 16.9 17 18H13Z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">The Tree of Life</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our logo represents growth, interconnectedness, and the flourishing of life
                    through collective care and support. Every branch symbolizes a life we touch,
                    every leaf represents hope we nurture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6 text-gray-900">Our Team</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Meet the dedicated individuals working tirelessly to create positive change
              and build stronger, healthier communities across the region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member Placeholders - These will be replaced with actual team data */}
            {[
              { name: "Leadership Team", role: "Founders & Directors" },
              { name: "Medical Team", role: "Healthcare Professionals" },
              { name: "Education Team", role: "Program Coordinators" },
              { name: "Field Team", role: "Community Outreach" },
              { name: "Support Team", role: "Operations & Admin" },
              { name: "Volunteer Team", role: "Community Volunteers" }
            ].map((team, index) => (
              <div key={index} className="card-program text-center">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{team.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{team.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Dedicated professionals working together to implement our programs
                    and create meaningful impact in communities.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6 text-gray-900">Our Values</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              These core values guide everything we do and shape the way we serve our communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compassion</h3>
              <p className="text-gray-600">We approach every individual with empathy, kindness, and genuine care.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-sky-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">We maintain the highest standards of honesty and transparency in all our work.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">We believe in working together with communities to create sustainable change.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p className="text-gray-600">We focus on creating measurable, lasting change that transforms lives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="section-padding bg-teal-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-6 text-gray-900">Get In Touch</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Ready to join our mission or learn more about our programs? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-testimonial">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Email Us</h3>
              </div>
              <p className="text-gray-600 mb-3">Send us a message anytime</p>
              <a href="mailto:Jeevkutumbfoundation@gmail.com" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                Jeevkutumbfoundation@gmail.com
              </a>
            </div>

            <div className="card-testimonial">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Call Us</h3>
              </div>
              <p className="text-gray-600 mb-3">Speak with our team directly</p>
              <a href="tel:+919821075418" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                +91 98210 75418
              </a>
            </div>

            <div className="card-testimonial">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Follow Us</h3>
              </div>
              <p className="text-gray-600 mb-3">Stay connected on social media</p>
              <div className="flex space-x-3">
                <a href="https://x.com/jeevkutumb?s=21" className="text-teal-600 hover:text-teal-700 transition-colors">Twitter</a>
                <span className="text-gray-400">•</span>
                <a href="https://www.instagram.com/jeevkutumbfoundation" className="text-teal-600 hover:text-teal-700 transition-colors">Instagram</a>
                <span className="text-gray-400">•</span>
                <a href="https://www.threads.com/@jeevkutumbfoundation" className="text-teal-600 hover:text-teal-700 transition-colors">Threads</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}