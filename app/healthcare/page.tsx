import Link from "next/link";

export default function HealthcarePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="healthcare-gradient section-padding">
        <div className="section-container">
          <div className="text-center">
            <h1 className="heading-xl mb-8 text-gray-900">Ensuring Healthcare</h1>
            <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed mb-8">
              Quality healthcare is a fundamental right. Our healthcare programs focus on making
              essential medical services accessible to underserved communities, promoting health
              education, and building sustainable healthcare infrastructure.
            </p>

            {/* Healthcare Illustration */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="relative">
                {/* Central Heart with DONATE */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      DONATE
                    </div>
                  </div>
                </div>

                {/* People around the heart */}
                <div className="grid grid-cols-4 gap-4 items-center">
                  {/* Left side people */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-600">Patients</div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-600">Records</div>
                  </div>

                  {/* Right side people */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-600">Research</div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-600">Staff</div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/donate" className="btn-donate text-lg px-10 py-4">
              DONATE FOR HEALTHCARE
            </Link>
          </div>
        </div>
      </section>

      {/* Our Healthcare Program Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-8 text-center text-brand">Our Healthcare Program</h2>

            <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed space-y-6">
              <p>
                At JeevKutumb Foundation, we believe that access to quality healthcare should not be
                a privilege, but a fundamental right for every individual. Our comprehensive healthcare
                program is designed to bridge the gap between healthcare needs and accessibility in
                underserved communities.
              </p>

              <p>
                Through our dedicated healthcare initiatives, we provide essential medical services,
                health education, preventive care, and emergency medical assistance to those who need
                it most. Our approach focuses on creating sustainable healthcare solutions that empower
                communities to maintain better health outcomes.
              </p>

              <p>
                Our healthcare program encompasses a wide range of services including primary healthcare,
                maternal and child health, immunization drives, health camps, telemedicine consultations,
                and chronic disease management. We work closely with certified medical professionals
                and healthcare institutions to ensure the highest quality of care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <h2 className="heading-md mb-12 text-center text-gray-900">Our Healthcare Services</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-program">
              <div className="h-40 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Primary Healthcare</h3>
                <p className="text-gray-600 leading-relaxed">
                  Basic medical consultations, diagnosis, and treatment for common health conditions
                  through our mobile clinics and health centers.
                </p>
              </div>
            </div>

            <div className="card-program">
              <div className="h-40 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Maternal & Child Care</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive care for mothers and children including prenatal care, delivery assistance,
                  and pediatric healthcare services.
                </p>
              </div>
            </div>

            <div className="card-program">
              <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Preventive Medicine</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vaccination drives, health screenings, and preventive care programs to reduce
                  the incidence of preventable diseases.
                </p>
              </div>
            </div>

            <div className="card-program">
              <div className="h-40 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Emergency Care</h3>
                <p className="text-gray-600 leading-relaxed">
                  24/7 emergency medical assistance, ambulance services, and critical care support
                  for medical emergencies and disasters.
                </p>
              </div>
            </div>

            <div className="card-program">
              <div className="h-40 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Health Education</h3>
                <p className="text-gray-600 leading-relaxed">
                  Community health education programs, awareness campaigns, and training sessions
                  on hygiene, nutrition, and disease prevention.
                </p>
              </div>
            </div>

            <div className="card-program">
              <div className="h-40 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Telemedicine</h3>
                <p className="text-gray-600 leading-relaxed">
                  Remote healthcare consultations and digital health services to reach patients
                  in remote areas with limited access to healthcare facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="section-padding bg-teal-50">
        <div className="section-container">
          <h2 className="heading-md mb-12 text-center text-gray-900">Healthcare Impact</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-stat">
              <div className="text-4xl font-bold text-teal-600 mb-2">2,500+</div>
              <div className="text-gray-700 font-semibold">Patients Treated</div>
            </div>
            <div className="card-stat">
              <div className="text-4xl font-bold text-pink-600 mb-2">150+</div>
              <div className="text-gray-700 font-semibold">Health Camps</div>
            </div>
            <div className="card-stat">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-700 font-semibold">Vaccinations</div>
            </div>
            <div className="card-stat">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-700 font-semibold">Emergency Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero-gradient text-white section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-6">
            Support Our Healthcare Mission
          </h2>
          <p className="text-xl mb-8 text-teal-50 max-w-3xl mx-auto">
            Your donation can help us provide life-saving healthcare services to those who need it most.
            Together, we can build healthier communities and save lives. Your contribution is tax-deductible under section 80G.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/donate" className="btn-donate text-lg px-10 py-4">
              DONATE FOR HEALTHCARE
            </Link>
            <Link href="/get-involved" className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-teal-600">
              Become a Volunteer
            </Link>
          </div>

          <div className="mt-8 text-teal-100 text-sm">
            <p>✓ 80G Tax Benefits  •  ✓ Transparent Use of Funds  •  ✓ Regular Impact Reports</p>
          </div>
        </div>
      </section>
    </div>
  );
}