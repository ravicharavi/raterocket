'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DeploymentTimestamp from '@/components/DeploymentTimestamp'

interface Quote {
  id: string
  provider: string
  logo: string
  monthlyPremium: number
  annualPremium: number
  bundleDiscount: number
  carCoverage: string
  homeCoverage: string
  deductible: number
  rating: number
  features: string[]
  savings: number
}

export default function CompareQuotesPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)

  useEffect(() => {
    // Check if required data exists
    const personalInfo = sessionStorage.getItem('personalInfo')
    const insuranceDetails = sessionStorage.getItem('insuranceDetails')
    
    if (!personalInfo || !insuranceDetails) {
      router.push('/quote/personal-info')
      return
    }

    // Simulate API call to get quotes
    setTimeout(() => {
      const mockQuotes: Quote[] = [
        {
          id: '1',
          provider: 'SecureShield Insurance',
          logo: '🛡️',
          monthlyPremium: 245,
          annualPremium: 2940,
          bundleDiscount: 15,
          carCoverage: 'Comprehensive',
          homeCoverage: 'Full Coverage',
          deductible: 1000,
          rating: 4.8,
          features: ['24/7 Claims Support', 'Multi-Policy Discount', 'Roadside Assistance', 'Home Security Discount'],
          savings: 520,
        },
        {
          id: '2',
          provider: 'CanadaProtect',
          logo: '🇨🇦',
          monthlyPremium: 268,
          annualPremium: 3216,
          bundleDiscount: 12,
          carCoverage: 'Comprehensive',
          homeCoverage: 'Full Coverage',
          deductible: 1500,
          rating: 4.6,
          features: ['Bundle Savings', 'Flexible Payment Plans', 'Online Claims', 'Loyalty Rewards'],
          savings: 438,
        },
        {
          id: '3',
          provider: 'PremierGuard Insurance',
          logo: '⭐',
          monthlyPremium: 289,
          annualPremium: 3468,
          bundleDiscount: 10,
          carCoverage: 'Comprehensive',
          homeCoverage: 'Full Coverage',
          deductible: 2000,
          rating: 4.5,
          features: ['Premium Support', 'Bundle Discount', 'Fast Claims Processing', 'Mobile App'],
          savings: 385,
        },
        {
          id: '4',
          provider: 'ValueCover Insurance',
          logo: '💰',
          monthlyPremium: 225,
          annualPremium: 2700,
          bundleDiscount: 18,
          carCoverage: 'Standard',
          homeCoverage: 'Standard',
          deductible: 1000,
          rating: 4.4,
          features: ['Affordable Rates', 'Bundle Savings', 'Easy Online Management', 'Quick Quotes'],
          savings: 593,
        },
        {
          id: '5',
          provider: 'TrustGuard Insurance',
          logo: '🔒',
          monthlyPremium: 275,
          annualPremium: 3300,
          bundleDiscount: 13,
          carCoverage: 'Comprehensive',
          homeCoverage: 'Full Coverage',
          deductible: 1250,
          rating: 4.7,
          features: ['Trusted Provider', 'Bundle Discount', 'Comprehensive Coverage', 'Customer Support'],
          savings: 493,
        },
      ]
      
      // Sort by annual premium
      mockQuotes.sort((a, b) => a.annualPremium - b.annualPremium)
      setQuotes(mockQuotes)
      setLoading(false)
    }, 2000)
  }, [router])

  const handleSelectQuote = (quoteId: string) => {
    setSelectedQuote(quoteId)
    // In a real app, this would redirect to the provider's signup page
    alert('Redirecting to provider signup page...')
  }

  const handleSaveQuote = (quote: Quote) => {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      // Redirect to login if not logged in
      router.push('/login?redirect=/quote/compare')
      return
    }

    setQuoteToSave(quote)
    setShowSaveModal(true)
  }

  const confirmSaveQuote = () => {
    if (!quoteToSave) return

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const personalInfo = JSON.parse(sessionStorage.getItem('personalInfo') || '{}')
    const insuranceDetails = JSON.parse(sessionStorage.getItem('insuranceDetails') || '{}')
    const insuranceType = sessionStorage.getItem('insuranceType') || 'bundle'

    const savedQuote = {
      id: Date.now().toString(),
      type: insuranceType,
      provider: quoteToSave.provider,
      monthlyPremium: quoteToSave.monthlyPremium,
      annualPremium: quoteToSave.annualPremium,
      savedAt: new Date().toISOString(),
      personalInfo: { ...personalInfo, email: currentUser.email },
      insuranceDetails
    }

    const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]')
    savedQuotes.push(savedQuote)
    localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes))

    setShowSaveModal(false)
    setQuoteToSave(null)
    alert('Quote saved successfully! View it in your account.')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Finding the best bundle quotes for you...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">🚀 RateRocket</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-4 text-right">
          <DeploymentTimestamp className="text-gray-500 text-xs" />
        </div>
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                ✓
              </div>
              <span className="ml-3 text-gray-500">Personal Information</span>
            </div>
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            <div className="flex items-center">
              <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                ✓
              </div>
              <span className="ml-3 text-gray-500">Insurance Details</span>
            </div>
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            <div className="flex items-center">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-3 font-semibold text-blue-600">Compare Quotes</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Bundle Insurance Quotes
          </h1>
          <p className="text-xl text-gray-600">
            Compare rates from top Canadian insurance providers. All quotes include car and home insurance bundle discounts.
          </p>
        </div>

        {/* Best Value Badge */}
        {quotes.length > 0 && (
          <div className="mb-6 text-center">
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              💰 Best Value: Save ${quotes[0].savings.toLocaleString()} annually with {quotes[0].provider}
            </span>
          </div>
        )}

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {quotes.map((quote, index) => (
            <div
              key={quote.id}
              className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all ${
                index === 0 ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
              } ${selectedQuote === quote.id ? 'ring-4 ring-blue-300' : ''}`}
            >
              {index === 0 && (
                <div className="bg-green-500 text-white text-center py-2 rounded-t-lg -mx-6 -mt-6 mb-4 font-semibold">
                  ⭐ Best Price
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-4xl mr-3">{quote.logo}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{quote.provider}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-gray-600">{quote.rating} Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    ${quote.monthlyPremium}
                    <span className="text-lg text-gray-500">/mo</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    ${quote.annualPremium.toLocaleString()}/year
                  </div>
                </div>
              </div>

              {/* Bundle Discount Badge */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-900">Bundle Discount</span>
                  <span className="text-lg font-bold text-blue-600">{quote.bundleDiscount}% OFF</span>
                </div>
                <div className="text-xs text-blue-700 mt-1">
                  Save ${quote.savings.toLocaleString()} per year vs. separate policies
                </div>
              </div>

              {/* Coverage Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Car Coverage</div>
                  <div className="font-semibold text-gray-900">{quote.carCoverage}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Home Coverage</div>
                  <div className="font-semibold text-gray-900">{quote.homeCoverage}</div>
                </div>
              </div>

              {/* Deductible */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Deductible</div>
                <div className="font-semibold text-gray-900">${quote.deductible.toLocaleString()}</div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-700 mb-2">Key Features:</div>
                <ul className="space-y-1">
                  {quote.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectQuote(quote.id)}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  index === 0
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {index === 0 ? 'Select Best Deal' : 'Select This Quote'}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Provider</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Monthly</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Annual</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Bundle Discount</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Savings</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{quote.logo}</span>
                        <span className="font-medium">{quote.provider}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-semibold">${quote.monthlyPremium}</td>
                    <td className="text-right py-4 px-4">${quote.annualPremium.toLocaleString()}</td>
                    <td className="text-right py-4 px-4 text-blue-600 font-semibold">{quote.bundleDiscount}%</td>
                    <td className="text-right py-4 px-4 text-green-600 font-semibold">${quote.savings.toLocaleString()}</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-yellow-400">★</span> {quote.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">💡 What&apos;s Next?</h3>
          <p className="text-gray-700 mb-4">
            Once you select a quote, you&apos;ll be connected directly with the insurance provider to complete your application. 
            All quotes are estimates and final pricing may vary based on additional factors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <span className="text-2xl mr-2">🔒</span>
              <div>
                <div className="font-semibold">Secure & Private</div>
                <div className="text-sm text-gray-600">Your information is protected</div>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-2">⚡</span>
              <div>
                <div className="font-semibold">Quick Process</div>
                <div className="text-sm text-gray-600">Get approved in minutes</div>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-2">💰</span>
              <div>
                <div className="font-semibold">Save Money</div>
                <div className="text-sm text-gray-600">Best bundle rates guaranteed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Over Button */}
        <div className="mt-8 text-center">
          <Link
            href="/quote/personal-info"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Start Over with New Information
          </Link>
        </div>
      </div>
    </div>
  )
}
