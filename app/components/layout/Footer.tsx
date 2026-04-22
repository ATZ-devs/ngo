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
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo-icon.png"
                  alt="JeevKutumb Foundation Logo"
                  fill
                  sizes="40px"
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
              &quot;Be kind whenever possible. It is always possible.&quot; - Dalai Lama
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
                <Link href="/healthcare" className="hover:text-[#5a7a96] transition-colors">
                  Healthcare Initiative
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-[#5a7a96] transition-colors">
                  Donate Now
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
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
                <a href="tel:+917710075418" className="hover:text-[#5a7a96] transition-colors">
                  +91 77100 75418
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                    <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.23c8.249.053 14.474 2.452 18.502 7.13 2.932 3.405 4.893 8.11 5.864 14.05-7.314-1.244-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 10.646 125.202 1.205 97.07 1L96.99 1h-.04C68.748 1.205 47.17 10.683 32.853 28.24 20.007 43.949 13.396 66.678 13.171 95.982v.04l-.001.04c.226 29.303 6.837 52.032 19.682 67.74C47.17 181.317 68.748 190.795 96.95 191h.04l.04-.001c24.596-.174 41.826-6.624 55.965-20.887 18.774-18.902 18.213-42.545 12.027-57.114-4.432-10.321-12.6-18.618-23.485-23.01ZM98.44 142.228c-10.424.574-21.24-4.074-21.82-14.189-.426-7.989 5.671-16.91 24.377-17.984 2.138-.123 4.243-.184 6.318-.184 6.604 0 12.798.606 18.423 1.772-2.096 26.108-16.968 29.916-27.298 30.585Z"/>
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
              © {new Date().getFullYear()} JeevKutumb Foundation. All rights reserved. |
              <span className="ml-1">Donations are tax-deductible under section 80G</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}