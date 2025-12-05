'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DeploymentTimestamp from '@/components/DeploymentTimestamp'

interface SavedQuote {
  id: string
  type: string
  provider: string
  monthlyPremium: number
  annualPremium: number
  savedAt: string
  personalInfo: any
  insuranceDetails: any
}

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(currentUser))
    
    // Load saved quotes
    const quotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]')
    const userQuotes = quotes.filter((q: SavedQuote) => {
      const userData = JSON.parse(currentUser)
      return q.personalInfo?.email === userData.email
    })
    setSavedQuotes(userQuotes)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('isLoggedIn')
    router.push('/')
  }

  const handleRequote = (quote: SavedQuote) => {
    // Restore the quote data to sessionStorage
    sessionStorage.setItem('personalInfo', JSON.stringify(quote.personalInfo))
    sessionStorage.setItem('insuranceDetails', JSON.stringify(quote.insuranceDetails))
    sessionStorage.setItem('insuranceType', quote.type)
    router.push('/quote/compare')
  }

  const handleDeleteQuote = (quoteId: string) => {
    const quotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]')
    const updatedQuotes = quotes.filter((q: SavedQuote) => q.id !== quoteId)
    localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes))
    setSavedQuotes(updatedQuotes.filter((q: SavedQuote) => {
      return q.personalInfo?.email === user?.email
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🚀</span>
              <h1 className="text-2xl font-bold text-purple-400">RateRocket</h1>
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="text-purple-200 hover:text-purple-400">Home</Link>
              <button
                onClick={handleLogout}
                className="text-purple-200 hover:text-purple-400"
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
          <h1 className="text-4xl font-bold text-white mb-2">
            👤 My Account
          </h1>
          <p className="text-xl text-purple-200 mb-4">
            Welcome back, {user?.name || 'User'}!
          </p>
          <DeploymentTimestamp />
        </div>

        {/* Account Info */}
        <div className="bg-slate-800 rounded-xl p-8 mb-8 border-2 border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-purple-200 text-sm mb-1">Name</p>
              <p className="text-white text-lg font-semibold">{user?.name}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Email</p>
              <p className="text-white text-lg font-semibold">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Saved Quotes */}
        <div className="bg-slate-800 rounded-xl p-8 border-2 border-purple-500/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Saved Quotes</h2>
            <Link
              href="/quote/personal-info?type=bundle"
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              + New Quote
            </Link>
          </div>

          {savedQuotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-purple-200 text-lg mb-4">No saved quotes yet</p>
              <p className="text-purple-300 text-sm mb-6">
                Get started by comparing insurance quotes
              </p>
              <Link
                href="/quote/personal-info?type=bundle"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-500 hover:to-pink-500 transition inline-block"
              >
                Get Your First Quote
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-slate-700 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{quote.provider}</h3>
                      <span className="px-2 py-1 bg-purple-600/30 text-purple-200 text-xs rounded">
                        {quote.type === 'bundle' ? 'Bundle' : quote.type === 'auto' ? 'Auto' : 'Home'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteQuote(quote.id)}
                      className="text-red-400 hover:text-red-300 text-xl"
                      title="Delete quote"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-purple-200 text-sm">Monthly Premium:</span>
                      <span className="text-white font-semibold">
                        ${quote.monthlyPremium.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200 text-sm">Annual Premium:</span>
                      <span className="text-white font-semibold">
                        ${quote.annualPremium.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-purple-300">
                      <span>Saved:</span>
                      <span>{new Date(quote.savedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRequote(quote)}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    🔄 Requote
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
