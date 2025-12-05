import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen space-bg relative">
      {/* Floating Planets Background */}
      <div className="absolute top-20 right-10 w-96 h-96 planet opacity-30"></div>
      <div className="absolute bottom-40 left-20 w-64 h-64 planet opacity-20"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 planet opacity-25"></div>

      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-3xl rocket-glow">🚀</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                RateRocket
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-purple-200 hover:text-purple-400 transition">How It Works</a>
              <a href="#benefits" className="text-purple-200 hover:text-purple-400 transition">Benefits</a>
              <Link href="/ontario-map" className="text-purple-200 hover:text-purple-400 transition">Auto Map</Link>
              <Link href="/insuramap" className="text-purple-200 hover:text-purple-400 transition">InsuraMap 2.0</Link>
              <a href="#faq" className="text-purple-200 hover:text-purple-400 transition">FAQ</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <span className="text-6xl">👨‍🚀</span>
            <span className="text-6xl">🌌</span>
            <span className="text-6xl">🪐</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Launch Into
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"> Savings</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Compare car and home insurance quotes from top Canadian providers. 
            Bundle and save with RateRocket - your trusted insurance comparison platform.
          </p>
          <div className="flex justify-center gap-2 text-2xl mb-8">
            <span className="animate-bounce">🚀</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>⭐</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌠</span>
          </div>
        </div>

        {/* Insurance Type Selection CTA */}
        <div className="mt-12 max-w-5xl mx-auto relative z-10">
          <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-6">
              <span className="text-4xl mb-4 block">🛸</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What type of insurance do you need?
              </h2>
              <p className="text-purple-200 mb-8">
                Select your insurance type to get started. Bundle both and save up to 25%!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Auto Insurance */}
              <Link 
                href="/quote/personal-info?type=auto"
                className="group relative bg-gradient-to-br from-blue-900/80 to-indigo-900/80 border-2 border-blue-500/50 rounded-xl p-8 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Auto Insurance</h3>
                  <p className="text-blue-200 mb-4">Protect your vehicle with comprehensive coverage</p>
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold inline-block group-hover:bg-blue-500 transition shadow-lg">
                    Get Auto Quote
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Save More
                </div>
              </Link>

              {/* Home Insurance */}
              <Link 
                href="/quote/personal-info?type=home"
                className="group relative bg-gradient-to-br from-purple-900/80 to-pink-900/80 border-2 border-purple-500/50 rounded-xl p-8 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Home Insurance</h3>
                  <p className="text-purple-200 mb-4">Secure your home and belongings</p>
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold inline-block group-hover:bg-purple-500 transition shadow-lg">
                    Get Home Quote
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Save More
                </div>
              </Link>

              {/* Bundle - Featured */}
              <Link 
                href="/quote/personal-info?type=bundle"
                className="group relative bg-gradient-to-br from-yellow-500 via-orange-500 to-pink-500 border-4 border-yellow-400 rounded-xl p-8 hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bundle & Save</h3>
                  <p className="text-yellow-50 mb-4">Auto + Home together</p>
                  <div className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold inline-block group-hover:bg-yellow-50 transition shadow-lg">
                    Get Bundle Quote
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  🌟 BEST VALUE
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                  Save up to 25%
                </div>
                <div className="absolute -bottom-2 -right-2 text-3xl opacity-50">🪐</div>
              </Link>
            </div>

            {/* Bundle Savings Message */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 rounded-xl p-6 mt-8 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl">👨‍🚀</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-1">🚀 Bundle and Save Big!</h3>
                  <p className="text-yellow-100">
                    When you bundle your auto and home insurance together, you can save an average of <span className="font-bold text-yellow-300">$400-$600 per year</span>. 
                    That&apos;s money back in your pocket while getting comprehensive coverage for both!
                  </p>
                </div>
                <div className="text-4xl">🌌</div>
              </div>
            </div>

            {/* Secondary Products Section */}
            <div className="mt-12 pt-8 border-t border-purple-500/30">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Explore More Products
                </h3>
                <p className="text-purple-200 text-sm">
                  Additional financial products to help you save and protect what matters most
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {/* Mortgage */}
                <Link 
                  href="/quote/personal-info?type=mortgage"
                  className="group bg-slate-800/60 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400 hover:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm text-center"
                >
                  <div className="text-3xl mb-2">🏠</div>
                  <h4 className="text-sm font-semibold text-white mb-1">Mortgage</h4>
                  <p className="text-xs text-purple-300">Compare rates</p>
                </Link>

                {/* Credit Card */}
                <Link 
                  href="/quote/personal-info?type=credit-card"
                  className="group bg-slate-800/60 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400 hover:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm text-center"
                >
                  <div className="text-3xl mb-2">💳</div>
                  <h4 className="text-sm font-semibold text-white mb-1">Credit Card</h4>
                  <p className="text-xs text-purple-300">Find the best card</p>
                </Link>

                {/* Business Insurance */}
                <Link 
                  href="/quote/personal-info?type=business"
                  className="group bg-slate-800/60 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400 hover:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm text-center"
                >
                  <div className="text-3xl mb-2">🏢</div>
                  <h4 className="text-sm font-semibold text-white mb-1">Business</h4>
                  <p className="text-xs text-purple-300">Protect your business</p>
                </Link>

                {/* Travel Insurance */}
                <Link 
                  href="/quote/personal-info?type=travel"
                  className="group bg-slate-800/60 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400 hover:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm text-center"
                >
                  <div className="text-3xl mb-2">✈️</div>
                  <h4 className="text-sm font-semibold text-white mb-1">Travel</h4>
                  <p className="text-xs text-purple-300">Travel with peace</p>
                </Link>

                {/* Life Insurance */}
                <Link 
                  href="/quote/personal-info?type=life"
                  className="group bg-slate-800/60 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400 hover:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm text-center"
                >
                  <div className="text-3xl mb-2">🛡️</div>
                  <h4 className="text-sm font-semibold text-white mb-1">Life</h4>
                  <p className="text-xs text-purple-300">Protect your family</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10">
          <div className="text-center p-6 bg-slate-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl shadow-lg hover:shadow-purple-500/50 transition">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Fast & Easy</h3>
            <p className="text-purple-200">Get quotes in minutes, not hours</p>
          </div>
          <div className="text-center p-6 bg-slate-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl shadow-lg hover:shadow-purple-500/50 transition">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Save Money</h3>
            <p className="text-purple-200">Compare rates and bundle to save</p>
          </div>
          <div className="text-center p-6 bg-slate-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl shadow-lg hover:shadow-purple-500/50 transition">
            <div className="text-4xl mb-4">🛸</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Trusted Partners</h3>
            <p className="text-purple-200">Top Canadian insurance providers</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-slate-900/60 backdrop-blur-sm py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="text-5xl">🌠</span>
          </div>
          <h2 className="text-4xl font-bold text-center mb-12 text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <div className="text-3xl mb-2">👨‍🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Enter Your Info</h3>
              <p className="text-purple-200">Share basic personal and property details</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <div className="text-3xl mb-2">🪐</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Get Matched</h3>
              <p className="text-purple-200">We match you with top insurance providers</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <div className="text-3xl mb-2">🌌</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Compare Quotes</h3>
              <p className="text-purple-200">View side-by-side bundle quote comparisons</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Save & Choose</h3>
              <p className="text-purple-200">Select the best bundle for your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-pink-900/80 py-20 text-white relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="text-5xl">🛸</span>
          </div>
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose RateRocket?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:bg-purple-500/30 transition">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-2xl font-semibold mb-3">Bundle Discounts</h3>
              <p className="text-purple-100">Save up to 25% when you bundle your car and home insurance together.</p>
            </div>
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:bg-purple-500/30 transition">
              <div className="text-3xl mb-2">🇨🇦</div>
              <h3 className="text-2xl font-semibold mb-3">Canadian Focused</h3>
              <p className="text-purple-100">Designed specifically for Canadian provinces and insurance regulations.</p>
            </div>
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:bg-purple-500/30 transition">
              <div className="text-3xl mb-2">🌠</div>
              <h3 className="text-2xl font-semibold mb-3">No Obligation</h3>
              <p className="text-purple-100">Get quotes for free with no commitment required.</p>
            </div>
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:bg-purple-500/30 transition">
              <div className="text-3xl mb-2">👨‍🚀</div>
              <h3 className="text-2xl font-semibold mb-3">Expert Support</h3>
              <p className="text-purple-100">Our team helps you understand your options and find the best coverage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Savings CTA Section */}
      <section className="bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-pink-500/20 py-20 text-white relative z-10 backdrop-blur-sm border-t border-yellow-400/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <span className="text-5xl">🚀</span>
            <span className="text-5xl">⭐</span>
            <span className="text-5xl">🌌</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
            Save Up to 25% with Bundle Insurance
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Canadians who bundle their auto and home insurance save an average of $500 per year. 
            Get comprehensive coverage for both while keeping more money in your pocket!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/quote/personal-info?type=bundle"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-5 rounded-lg text-lg font-bold hover:from-yellow-300 hover:to-orange-400 transition shadow-lg hover:shadow-2xl hover:shadow-yellow-500/50"
            >
              🚀 Get Bundle Quote Now
            </Link>
            <Link 
              href="#how-it-works"
              className="bg-purple-600/30 backdrop-blur-sm text-white border-2 border-purple-400 px-10 py-5 rounded-lg text-lg font-semibold hover:bg-purple-600/50 transition"
            >
              Learn How It Works
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold mb-2 text-yellow-300">$400-$600</div>
              <div className="text-purple-200">Average Annual Savings</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold mb-2 text-yellow-300">25%</div>
              <div className="text-purple-200">Maximum Bundle Discount</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold mb-2 text-yellow-300">1 Policy</div>
              <div className="text-purple-200">One Bill, One Renewal Date</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/90 backdrop-blur-md border-t border-purple-500/20 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl rocket-glow">🚀</span>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  RateRocket
                </h3>
              </div>
              <p className="text-purple-300">Your trusted insurance comparison platform in Canada. 🪐</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-purple-300">
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>🛸</span> About Us</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>📡</span> Contact</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>🔒</span> Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-purple-300">
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>📚</span> Insurance Guide</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>❓</span> FAQ</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>📝</span> Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-purple-300">
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>📜</span> Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>🔐</span> Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>⚠️</span> Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-500/20 text-center text-purple-300">
            <p className="flex items-center justify-center gap-2">
              <span>🌌</span> &copy; 2024 RateRocket. All rights reserved. <span>🚀</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
