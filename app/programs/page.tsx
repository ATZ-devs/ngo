import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ProgramsPage() {
  notFound();
  const programs = [
    {
      id: "healthcare",
      title: "Healthcare Initiative",
      description: "Providing essential medical services, health education, and preventive care to underserved communities.",
      icon: "🏥",
      image: "/assets/Healthcare.png",
      color: "from-sky-400 to-teal-500",
      impact: "2,500+ Lives Impacted",
      features: [
        "Free medical camps and checkups",
        "Health education and awareness programs",
        "Preventive care and vaccination drives",
        "Medicine distribution to needy families"
      ]
    },
    {
      id: "education",
      title: "Education Program",
      description: "Quality education programs, scholarship opportunities, and learning resources for children and adults.",
      icon: "📚",
      image: "/assets/Education.png",
      color: "from-blue-400 to-indigo-500",
      impact: "1,200+ Students Educated",
      features: [
        "Scholarships for underprivileged students",
        "Adult literacy programs",
        "Digital learning initiatives",
        "Educational infrastructure development"
      ]
    },
    {
      id: "skill-development",
      title: "Skill Development",
      description: "Training programs to enhance employability and entrepreneurship skills for sustainable livelihoods.",
      icon: "🛠️",
      image: "/assets/Skill Development.png",
      color: "from-emerald-400 to-green-500",
      impact: "800+ People Trained",
      features: [
        "Vocational training and certification",
        "Entrepreneurship development programs",
        "Digital literacy training",
        "Job placement assistance"
      ]
    },
    {
      id: "women-empowerment",
      title: "Women Empowerment",
      description: "Empowering women through skill development, leadership training, and economic opportunities.",
      icon: "💪",
      image: "/assets/Women Development.png",
      color: "from-pink-400 to-rose-500",
      impact: "600+ Women Empowered",
      features: [
        "Self-Help Group formation",
        "Microfinance and entrepreneurship",
        "Leadership and confidence building",
        "Legal awareness and rights education"
      ]
    },
    {
      id: "child-welfare",
      title: "Child Welfare",
      description: "Protecting children's rights and providing care, education, and development opportunities.",
      icon: "👶",
      color: "from-purple-400 to-violet-500",
      impact: "400+ Children Supported",
      features: [
        "Child protection and safety programs",
        "Nutritional support and healthcare",
        "Educational support and scholarships",
        "Child rights awareness campaigns"
      ]
    },
    {
      id: "senior-citizen-care",
      title: "Senior Citizen Care",
      description: "Healthcare, social support, and dignity programs for elderly members of our communities.",
      icon: "👴",
      image: "/assets/Senior Citizen Care.png",
      color: "from-gray-400 to-slate-500",
      impact: "300+ Seniors Cared For",
      features: [
        "Regular health checkups and care",
        "Social engagement activities",
        "Home care and support services",
        "Pension and benefits assistance"
      ]
    },
    {
      id: "poverty-relief",
      title: "Poverty Relief",
      description: "Direct assistance programs to help families meet basic needs and break the cycle of poverty.",
      icon: "🤝",
      image: "/assets/Poverty Relief.png",
      color: "from-teal-400 to-cyan-500",
      impact: "1,000+ Families Assisted",
      features: [
        "Food security and distribution",
        "Emergency financial assistance",
        "Livelihood generation programs",
        "Basic necessities support"
      ]
    },
    {
      id: "disaster-relief",
      title: "Disaster Relief",
      description: "Emergency response and rehabilitation programs for communities affected by natural disasters.",
      icon: "🆘",
      color: "from-red-400 to-pink-500",
      impact: "Emergency Response Ready",
      features: [
        "Emergency rescue and relief operations",
        "Temporary shelter and accommodation",
        "Food and medical aid distribution",
        "Rehabilitation and rebuilding support"
      ]
    },
    {
      id: "environmental-protection",
      title: "Environmental Protection",
      description: "Conservation initiatives, awareness programs, and sustainable development projects.",
      icon: "🌱",
      image: "/assets/Environmental Protection.png",
      color: "from-green-400 to-emerald-500",
      impact: "Green Initiatives Active",
      features: [
        "Tree plantation and conservation",
        "Waste management programs",
        "Environmental awareness campaigns",
        "Sustainable development projects"
      ]
    },
    {
      id: "mental-health-awareness",
      title: "Mental Health Awareness",
      description: "Mental health support, counseling services, and awareness programs for community wellbeing.",
      icon: "🧠",
      image: "/assets/Mental Health Awareness.png",
      color: "from-indigo-400 to-blue-500",
      impact: "Mental Wellness Support",
      features: [
        "Counseling and therapy services",
        "Mental health awareness workshops",
        "Community support groups",
        "Crisis intervention and support"
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="section-container text-center">
          <div className="animate-fadeInUp">
            <h1 className="heading-xl text-white mb-6">
              What We Do
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-50 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive programs address critical needs across healthcare, education,
              empowerment, and community development. Every initiative is designed to create
              lasting positive impact in the lives of those we serve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/donate" className="btn-donate">
                Support Our Programs
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6 text-gray-900">Our Impact Areas</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Through these 11 specialized programs, we work to address the most pressing
              challenges facing communities today.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {programs.map((program, index) => (
              <div key={program.id} className="card-program group">
                <div className={`h-48 bg-gradient-to-br ${program.color} flex items-center justify-center relative overflow-hidden`}>
                  {program.image ? (
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">{program.icon}</div>
                      <h3 className="text-xl font-bold">{program.title}</h3>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{program.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="mb-4">
                    <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {program.impact}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-teal-600 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      href={`/${program.id === 'mental-health-awareness' ? 'mental-health' : program.id.replace('-', '-')}`}
                      className="btn-outline"
                    >
                      Learn More
                    </Link>
                    <Link
                      href={`/donate?program=${program.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Support This
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6 text-gray-900">Our Collective Impact</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Across all our programs, we&apos;re creating measurable change in communities
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="card-stat">
              <div className="text-4xl font-bold text-teal-600 mb-2">6,500+</div>
              <div className="text-gray-700 font-semibold">Total Beneficiaries</div>
            </div>
            <div className="card-stat">
              <div className="text-4xl font-bold text-sky-600 mb-2">11</div>
              <div className="text-gray-700 font-semibold">Active Programs</div>
            </div>
            <div className="card-stat">
              <div className="text-4xl font-bold text-emerald-600 mb-2">25+</div>
              <div className="text-gray-700 font-semibold">Communities Served</div>
            </div>
            <div className="card-stat">
              <div className="text-4xl font-bold text-orange-600 mb-2">3+</div>
              <div className="text-gray-700 font-semibold">Years of Service</div>
            </div>
          </div>

          {/* Program Categories Quick Navigation */}
          <div className="bg-teal-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Our Programs</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Each program represents our commitment to holistic community development.
              Choose an area that resonates with you to learn more and get involved.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {programs.slice(0, 6).map((program) => (
                <Link
                  key={program.id}
                  href={`/${program.id === 'mental-health-awareness' ? 'mental-health' : program.id}`}
                  className="bg-white text-teal-700 px-4 py-2 rounded-full font-medium hover:bg-teal-600 hover:text-white transition-colors border border-teal-200 hover:border-teal-600"
                >
                  {program.icon} {program.title}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              + 5 more specialized programs
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Involved */}
      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6 text-gray-900">How You Can Help</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              There are many ways to support our programs and create positive change
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-program text-center">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Make a Donation</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Support specific programs or contribute to our general fund.
                  All donations are tax-deductible under Section 80G.
                </p>
                <Link href="/donate" className="btn-primary">
                  Donate Now
                </Link>
              </div>
            </div>

            <div className="card-program text-center">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-sky-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Volunteer Your Time</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Join our team of dedicated volunteers. Share your skills,
                  time, and passion to make a direct impact in communities.
                </p>
                <Link href="/volunteering" className="btn-secondary">
                  Join as Volunteer
                </Link>
              </div>
            </div>

            <div className="card-program text-center">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Corporate Partnership</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Partner with us for CSR initiatives, employee volunteering,
                  or collaborative programs that create lasting community impact.
                </p>
                <Link href="/corporate-partnerships" className="btn-outline">
                  Explore Partnership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}