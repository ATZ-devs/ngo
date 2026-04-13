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
                  width={40}
                  height={40}
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
              &quot;The sole meaning of life is to serve humanity.&quot; - Leo Tolstoy
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
                <Link href="/contact" className="hover:text-[#5a7a96] transition-colors">
                  Contact Us
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.186.408-2.26 1.33-3.022.812-.67 1.927-1.073 3.222-1.166 1.077-.076 2.072.007 2.975.247.002-.643-.034-1.257-.108-1.838-.222-1.726-.882-2.453-1.705-2.685-.444-.126-.958-.132-1.487-.019-.592.127-1.089.39-1.36.722l-1.677-1.39c.609-.735 1.516-1.267 2.614-1.503.88-.189 1.782-.183 2.606.019 1.652.403 2.853 1.69 3.192 4.322.083.645.123 1.347.119 2.103.459.24.888.52 1.282.842 1.172.958 1.923 2.28 2.175 3.828.342 2.097-.1 4.478-2.122 6.458-1.839 1.802-4.142 2.63-7.434 2.654zM8.894 16.343c.04.692.397 1.154.989 1.538.653.423 1.503.617 2.403.571 1.08-.058 1.904-.462 2.518-1.225.534-.665.893-1.504 1.074-2.505-.647-.181-1.343-.28-2.085-.239-1.837.132-3.533.692-4.9 1.86z"/>
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