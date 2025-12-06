'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(currentUser))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('isLoggedIn')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen space-bg relative">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl rocket-glow">🚀</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                RateRocket
              </h1>
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="text-purple-200 hover:text-purple-400 transition">Home</Link>
              <button
                onClick={handleLogout}
                className="text-purple-200 hover:text-purple-400 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            👤 My Account
          </h1>
          <p className="text-xl text-purple-200">
            Welcome back, {user?.name || 'User'}!
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">👤</div>
            <div>
              <h2 className="text-2xl font-bold text-white">Profile</h2>
              <p className="text-purple-300">Your personal information</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-purple-200 text-sm mb-1">Full Name</p>
              <p className="text-white text-lg font-semibold">John Doe</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Email</p>
              <p className="text-white text-lg font-semibold">{user?.email || 'user@raterocket.com'}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Phone</p>
              <p className="text-white text-lg font-semibold">(416) 555-0123</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Date of Birth</p>
              <p className="text-white text-lg font-semibold">January 15, 1985</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Address</p>
              <p className="text-white text-lg font-semibold">123 Main Street, Toronto, ON M5H 2N2</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">License Number</p>
              <p className="text-white text-lg font-semibold">D1234-56789-12345</p>
            </div>
          </div>
          <button className="mt-6 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold transition">
            ✏️ Edit Profile
          </button>
        </div>

        {/* Cars Card */}
        <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🚗</div>
              <div>
                <h2 className="text-2xl font-bold text-white">My Vehicles</h2>
                <p className="text-purple-300">Manage your insured vehicles</p>
              </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition">
              + Add Vehicle
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">2020 Honda Civic</h3>
                  <p className="text-purple-300 text-sm">VIN: 19XFC2F59LE123456</p>
                </div>
                <span className="text-3xl">🚗</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">Year:</span>
                  <span className="text-white font-semibold">2020</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">Make/Model:</span>
                  <span className="text-white font-semibold">Honda Civic</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">Value:</span>
                  <span className="text-white font-semibold">$25,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">Usage:</span>
                  <span className="text-white font-semibold">Personal</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition text-sm">
                  🔄 Re-quote
                </button>
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition text-sm">
                  ✏️ Edit
                </button>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">2018 Toyota Camry</h3>
                  <p className="text-purple-300 text-sm">VIN: 4T1B11HK5JU123456</p>
                </div>
                <span className="text-3xl">🚙</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">Year:</span>
                  <span className="text-white font-semibold">2018</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">Make/Model:</span>
                  <span className="text-white font-semibold">Toyota Camry</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">Value:</span>
                  <span className="text-white font-semibold">$18,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 text-sm">Usage:</span>
                  <span className="text-white font-semibold">Personal</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition text-sm">
                  🔄 Re-quote
                </button>
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition text-sm">
                  ✏️ Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* House Details Card */}
        <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🏠</div>
              <div>
                <h2 className="text-2xl font-bold text-white">Property Details</h2>
                <p className="text-purple-300">Manage your home insurance</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/60 border border-purple-500/30 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-purple-200 text-sm mb-1">Property Address</p>
                <p className="text-white text-lg font-semibold">123 Main Street, Toronto, ON M5H 2N2</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm mb-1">Property Type</p>
                <p className="text-white text-lg font-semibold">Single Family Home</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm mb-1">Property Value</p>
                <p className="text-white text-lg font-semibold">$750,000</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm mb-1">Year Built</p>
                <p className="text-white text-lg font-semibold">2010</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm mb-1">Square Footage</p>
                <p className="text-white text-lg font-semibold">2,500 sq ft</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm mb-1">Current Policy</p>
                <p className="text-white text-lg font-semibold">Active - Renews March 15, 2025</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link
                href="/quote/personal-info?type=bundle"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-3 rounded-lg font-semibold transition text-center text-sm"
              >
                🔄 Re-quote
              </Link>
              <Link
                href="/quote/personal-info?type=home"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold transition text-center text-sm"
              >
                🏠 Property Quote
              </Link>
              <Link
                href="/quote/personal-info?type=bundle"
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg font-semibold transition text-center text-sm"
              >
                🔗 Bundle Quote
              </Link>
              <Link
                href="/mortgage"
                className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold transition text-center text-sm"
              >
                💰 Refinance
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-500/20">
              <button className="w-full bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-3 rounded-lg font-semibold transition">
                📅 Renew Policy
              </button>
            </div>
          </div>
        </div>

        {/* Extra Drivers Card */}
        <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">👥</div>
              <div>
                <h2 className="text-2xl font-bold text-white">Additional Drivers</h2>
                <p className="text-purple-300">Manage drivers on your policy</p>
              </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition">
              + Add Driver
            </button>
          </div>
          <div className="bg-slate-800/60 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-start gap-6">
              <div className="text-4xl">👩</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-4">Mary Jane</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-purple-200 text-sm mb-1">Date of Birth</p>
                    <p className="text-white font-semibold">May 1, 2000</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm mb-1">Relationship</p>
                    <p className="text-white font-semibold">Wife</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm mb-1">License Number</p>
                    <p className="text-white font-semibold">D9876-54321-98765</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition text-sm">
                    ✏️ Edit
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition text-sm">
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/quote/personal-info?type=bundle"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-4 rounded-lg font-semibold transition text-center"
            >
              🚀 Get New Quote
            </Link>
            <Link
              href="/quote/compare"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-lg font-semibold transition text-center"
            >
              📊 Compare Quotes
            </Link>
            <Link
              href="/mortgage"
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-4 rounded-lg font-semibold transition text-center"
            >
              🏠 Mortgage
            </Link>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-4 rounded-lg font-semibold transition">
              📄 View Documents
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950/90 backdrop-blur-md border-t border-purple-500/20 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-300 flex items-center justify-center gap-2 mb-2">
            <span>🌌</span> &copy; 2025 RateRocket. All rights reserved. <span>🚀</span>
          </p>
          <p className="text-purple-400 text-sm">
            vibe coded by @ravicharavi 🤍
          </p>
        </div>
      </footer>
    </div>
  )
}
