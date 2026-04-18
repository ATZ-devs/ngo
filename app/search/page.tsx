"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const pages = [
  { title: "Healthcare Initiative", path: "/healthcare", description: "Providing essential medical services, health education, and preventive care to underserved communities.", keywords: "healthcare medical health doctor medicine hospital camp checkup vaccination" },
  { title: "Education Program", path: "/education", description: "Quality education, scholarships, and learning resources for children and adults.", keywords: "education school student scholarship learning books stationery" },
  { title: "Skill Development", path: "/skill-development", description: "Training programs to enhance employability and entrepreneurship skills for sustainable livelihoods.", keywords: "skill training vocational job employment digital literacy" },
  { title: "Women Empowerment", path: "/women-empowerment", description: "Empowering women through skill development, leadership training, and economic opportunities.", keywords: "women empowerment self-help microfinance leadership" },
  { title: "Child Welfare", path: "/child-welfare", description: "Protecting children's rights and providing care, education, and development opportunities.", keywords: "child children welfare protection nutrition" },
  { title: "Senior Citizen Care", path: "/senior-citizen-care", description: "Healthcare, social support, and dignity programs for elderly members of our communities.", keywords: "senior citizen elderly care old age" },
  { title: "Poverty Relief", path: "/poverty-relief", description: "Direct assistance programs to help families meet basic needs and break the cycle of poverty.", keywords: "poverty relief food assistance livelihood" },
  { title: "Disaster Relief", path: "/disaster-relief", description: "Emergency response and rehabilitation programs for communities affected by natural disasters.", keywords: "disaster relief emergency rescue flood earthquake" },
  { title: "Environmental Protection", path: "/environmental-protection", description: "Conservation initiatives, awareness programs, and sustainable development projects.", keywords: "environment protection tree plantation waste green sustainability" },
  { title: "Mental Health Awareness", path: "/mental-health", description: "Mental health support, counseling services, and awareness programs for community wellbeing.", keywords: "mental health counseling therapy wellness awareness" },
  { title: "Donate", path: "/donate", description: "Make a donation to JeevKutumb Foundation and help transform lives. Tax deductible under 80G.", keywords: "donate donation payment 80G tax save contribute" },
  { title: "About Us", path: "/about", description: "Learn about JeevKutumb Foundation, our history, mission, and dedicated team.", keywords: "about us mission team foundation history" },

  { title: "Our Programs", path: "/programs", description: "Explore all programs run by JeevKutumb Foundation across healthcare, education, and social welfare.", keywords: "programs initiatives what we do impact" },
  { title: "How to Save Tax", path: "/tax-savings", description: "Learn how your donation to JeevKutumb Foundation qualifies for tax benefits under Section 80G.", keywords: "tax savings 80G deduction income tax benefit" },
  { title: "Volunteering & Internships", path: "/volunteering", description: "Explore volunteering and internship opportunities at JeevKutumb Foundation.", keywords: "volunteer internship volunteering join" },
  { title: "Corporate Partnerships", path: "/corporate-partnerships", description: "Partner with JeevKutumb Foundation for CSR and employee volunteering initiatives.", keywords: "corporate partnership CSR company business" },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const queryLower = query.toLowerCase();

  const results = query
    ? pages.filter(
        (page) =>
          page.title.toLowerCase().includes(queryLower) ||
          page.description.toLowerCase().includes(queryLower) ||
          page.keywords.toLowerCase().includes(queryLower)
      )
    : [];

  return (
    <div className="bg-white">
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair-display)' }}>
              Search Results
            </h1>
            {query && (
              <p className="text-gray-600 mb-8">
                {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
              </p>
            )}

            {!query && (
              <p className="text-gray-600 mb-8">Please enter a search term to find pages.</p>
            )}

            {query && results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-gray-400">Try searching for something else, or browse our pages below.</p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <Link href="/programs" className="text-[#5a7a96] hover:underline font-medium">Our Programs</Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/donate" className="text-[#5a7a96] hover:underline font-medium">Donate</Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/about" className="text-[#5a7a96] hover:underline font-medium">About Us</Link>

                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-6">
                {results.map((page) => (
                  <Link
                    key={page.path}
                    href={page.path}
                    className="block p-6 rounded-xl border border-gray-200 hover:border-[#5a7a96] hover:shadow-md transition-all duration-200"
                  >
                    <h2 className="text-xl font-semibold text-[#5a7a96] mb-2">{page.title}</h2>
                    <p className="text-gray-600">{page.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="section-padding section-container text-center text-gray-500">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
