import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Foundation Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/image.png"
                  alt="JeevKutumb Foundation Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">JeevKutumb Foundation</h3>
                <p className="text-gray-300 text-sm">Hope Begins With Us</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Dedicated to creating lasting positive change through healthcare, education,
              skill development, women empowerment, and comprehensive social welfare programs.
              Join our mission to build stronger, healthier communities.
            </p>
            <p className="text-sm text-gray-400">
              &quot;The best way to find yourself is to lose yourself in the service of others.&quot; - Mahatma Gandhi
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-[#5a7a96] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-[#5a7a96] transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/healthcare" className="hover:text-[#5a7a96] transition-colors">
                  Healthcare Initiative
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-[#5a7a96] transition-colors">
                  Donate Now
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="hover:text-[#5a7a96] transition-colors">
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-[#5a7a96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:Jeevkutumbfoundation@gmail.com" className="hover:text-[#5a7a96] transition-colors">
                  Jeevkutumbfoundation@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-[#5a7a96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919821075418" className="hover:text-[#5a7a96] transition-colors">
                  +91 9821075418
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-gray-300">Follow Us</h5>
              <div className="flex space-x-4">
                <a
                  href="https://x.com/jeevkutumb?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#5a7a96] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/jeevkutumbfoundation?igsh=MW45aTllZ2FybDM3dw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#5a7a96] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.threads.net/@jeevkutumbfoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#5a7a96] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 192 192">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.35 61.6848C97.3879 61.6848 97.4258 61.6848 97.4637 61.6848C105.994 61.746 113.027 64.3065 118.525 69.2772C123.508 73.7684 126.26 79.6667 126.727 86.865C118.171 85.8383 108.88 85.8998 101.168 88.9883C89.181 93.1557 82.68 101.05 82.68 110.994C82.68 126.207 94.430 138.134 110.065 138.134C118.244 138.134 125.637 135.617 131.572 131.045C137.618 126.382 141.537 119.683 142.613 111.809C144.334 108.114 145.207 104.05 145.207 99.6667C145.207 94.509 144.161 91.818 141.537 88.9883ZM110.065 123.317C102.171 123.317 97.4969 118.445 97.4969 110.994C97.4969 107.47 99.0615 102.856 106.404 100.174C109.267 99.1905 113.058 98.7247 117.018 98.7247C119.896 98.7247 122.938 99.0547 125.887 99.6982C124.613 113.618 118.805 123.317 110.065 123.317Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 JeevKutumb Foundation. All rights reserved. |
              <span className="ml-1">Donations are tax-deductible under section 80G</span>
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <Link href="/privacy" className="hover:text-[#5a7a96] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#5a7a96] transition-colors">
                Terms of Service
              </Link>
              <Link href="/transparency" className="hover:text-[#5a7a96] transition-colors">
                Transparency
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}