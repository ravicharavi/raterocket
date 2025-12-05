import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">🚀 RateRocket</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition">Benefits</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition">FAQ</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-blue-600"> Insurance Bundle</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Compare car and home insurance quotes from top Canadian providers. 
            Bundle and save with RateRocket - your trusted insurance comparison platform.
          </p>
        </div>

        {/* Insurance Type Selection CTA */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              What type of insurance do you need?
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Select your insurance type to get started. Bundle both and save up to 25%!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Auto Insurance */}
              <Link 
                href="/quote/personal-info?type=auto"
                className="group relative bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Auto Insurance</h3>
                  <p className="text-gray-600 mb-4">Protect your vehicle with comprehensive coverage</p>
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold inline-block group-hover:bg-blue-700 transition">
                    Get Auto Quote
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Save More
                </div>
              </Link>

              {/* Home Insurance */}
              <Link 
                href="/quote/personal-info?type=home"
                className="group relative bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-8 hover:border-indigo-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Home Insurance</h3>
                  <p className="text-gray-600 mb-4">Secure your home and belongings</p>
                  <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold inline-block group-hover:bg-indigo-700 transition">
                    Get Home Quote
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Save More
                </div>
              </Link>

              {/* Bundle - Featured */}
              <Link 
                href="/quote/personal-info?type=bundle"
                className="group relative bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-green-400 rounded-xl p-8 hover:border-green-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bundle & Save</h3>
                  <p className="text-green-50 mb-4">Auto + Home together</p>
                  <div className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold inline-block group-hover:bg-green-50 transition">
                    Get Bundle Quote
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  BEST VALUE
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                  Save up to 25%
                </div>
              </Link>
            </div>

            {/* Bundle Savings Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mt-8">
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl">💰</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Bundle and Save Big!</h3>
                  <p className="text-gray-700">
                    When you bundle your auto and home insurance together, you can save an average of <span className="font-bold text-green-600">$400-$600 per year</span>. 
                    That&apos;s money back in your pocket while getting comprehensive coverage for both!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
            <p className="text-gray-600">Get quotes in minutes, not hours</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Save Money</h3>
            <p className="text-gray-600">Compare rates and bundle to save</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-2">Trusted Partners</h3>
            <p className="text-gray-600">Top Canadian insurance providers</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Info</h3>
              <p className="text-gray-600">Share basic personal and property details</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-gray-600">We match you with top insurance providers</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare Quotes</h3>
              <p className="text-gray-600">View side-by-side bundle quote comparisons</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save & Choose</h3>
              <p className="text-gray-600">Select the best bundle for your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose RateRocket?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-3">Bundle Discounts</h3>
              <p className="text-blue-100">Save up to 25% when you bundle your car and home insurance together.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-3">Canadian Focused</h3>
              <p className="text-blue-100">Designed specifically for Canadian provinces and insurance regulations.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-3">No Obligation</h3>
              <p className="text-blue-100">Get quotes for free with no commitment required.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-3">Expert Support</h3>
              <p className="text-blue-100">Our team helps you understand your options and find the best coverage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Savings CTA Section */}
      <section className="bg-gradient-to-br from-green-500 to-emerald-600 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Save Up to 25% with Bundle Insurance</h2>
          <p className="text-xl text-green-50 mb-8">
            Canadians who bundle their auto and home insurance save an average of $500 per year. 
            Get comprehensive coverage for both while keeping more money in your pocket!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/quote/personal-info?type=bundle"
              className="bg-white text-green-600 px-10 py-5 rounded-lg text-lg font-bold hover:bg-green-50 transition shadow-lg hover:shadow-xl"
            >
              Get Bundle Quote Now
            </Link>
            <Link 
              href="#how-it-works"
              className="bg-green-600/20 backdrop-blur-sm text-white border-2 border-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-green-600/30 transition"
            >
              Learn How It Works
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">$400-$600</div>
              <div className="text-green-100">Average Annual Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25%</div>
              <div className="text-green-100">Maximum Bundle Discount</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1 Policy</div>
              <div className="text-green-100">One Bill, One Renewal Date</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🚀 RateRocket</h3>
              <p className="text-gray-400">Your trusted insurance comparison platform in Canada.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Insurance Guide</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 RateRocket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
