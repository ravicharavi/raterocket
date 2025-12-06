'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CreditCard {
  name: string
  bank: string
  logo: string
  annualFee: number
  rewards: string
  cashback: string
  apr: string
  features: string[]
  bestFor: string
  rating: number
  color: string
}

export default function CreditCardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsMenuOpen, setProductsMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [recommendedCards, setRecommendedCards] = useState<CreditCard[]>([])

  const questions = [
    {
      id: 1,
      question: 'What do you spend most on?',
      options: [
        { value: 'groceries', label: 'Groceries', emoji: '🛒' },
        { value: 'travel', label: 'Travel', emoji: '✈️' },
        { value: 'gas', label: 'Gas', emoji: '⛽' },
        { value: 'dining', label: 'Dining', emoji: '🍽️' },
      ]
    },
    {
      id: 2,
      question: 'What matters most?',
      options: [
        { value: 'cashback', label: 'Cashback', emoji: '💰' },
        { value: 'no-fee', label: 'No Annual Fee', emoji: '💵' },
        { value: 'travel', label: 'Travel Rewards', emoji: '✈️' },
      ]
    },
  ]

  const allCards: CreditCard[] = [
    {
      name: 'Cashback Mastercard',
      bank: 'RBC',
      logo: '🏦',
      annualFee: 0,
      rewards: '2% groceries, 1% everything',
      cashback: 'Up to 2%',
      apr: '19.99%',
      features: ['No Fee', 'Cashback', 'Easy Approval'],
      bestFor: 'Groceries',
      rating: 4.5,
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Travel Rewards',
      bank: 'TD',
      logo: '✈️',
      annualFee: 120,
      rewards: '3x travel points',
      cashback: 'Travel Points',
      apr: '19.99%',
      features: ['Travel Insurance', 'Lounge Access', 'No FX Fees'],
      bestFor: 'Travelers',
      rating: 4.7,
      color: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Gas & Groceries',
      bank: 'CIBC',
      logo: '⛽',
      annualFee: 0,
      rewards: '4% gas, 2% groceries',
      cashback: 'Up to 4%',
      apr: '20.99%',
      features: ['No Fee', 'Gas Rewards', 'Easy Approval'],
      bestFor: 'Gas & Groceries',
      rating: 4.4,
      color: 'from-green-600 to-emerald-600'
    },
    {
      name: 'Dining Rewards',
      bank: 'Scotiabank',
      logo: '🍽️',
      annualFee: 99,
      rewards: '5x dining, 2x entertainment',
      cashback: 'Scene Points',
      apr: '19.99%',
      features: ['Dining Rewards', 'Entertainment', 'Scene Points'],
      bestFor: 'Foodies',
      rating: 4.6,
      color: 'from-orange-600 to-red-600'
    },
  ]

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentStep]: value }
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateRecommendations(newAnswers)
      setShowResults(true)
    }
  }

  const calculateRecommendations = (userAnswers: Record<number, string>) => {
    let recommended: CreditCard[] = []

    const spendingCategory = userAnswers[0]
    const priority = userAnswers[1]

    if (spendingCategory === 'groceries') {
      recommended.push(allCards.find(c => c.name === 'Cashback Mastercard')!)
      recommended.push(allCards.find(c => c.name === 'Gas & Groceries')!)
    }
    if (spendingCategory === 'travel') {
      recommended.push(allCards.find(c => c.name === 'Travel Rewards')!)
    }
    if (spendingCategory === 'gas') {
      recommended.push(allCards.find(c => c.name === 'Gas & Groceries')!)
    }
    if (spendingCategory === 'dining') {
      recommended.push(allCards.find(c => c.name === 'Dining Rewards')!)
    }

    if (priority === 'no-fee') {
      recommended = recommended.filter(c => c.annualFee === 0)
    }
    if (priority === 'cashback') {
      recommended = recommended.filter(c => c.cashback.includes('%'))
    }

    if (recommended.length === 0) {
      recommended = [allCards[0], allCards[1]]
    }

    setRecommendedCards(recommended.slice(0, 3))
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setRecommendedCards([])
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
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-purple-200 hover:text-purple-400 transition">Home</Link>
              
              {/* Products Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setProductsMenuOpen(true)}
                onMouseLeave={() => setProductsMenuOpen(false)}
              >
                <button className="text-purple-200 hover:text-purple-400 transition flex items-center gap-1 py-2">
                  Products
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {productsMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-slate-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-xl py-2 z-50">
                    <Link 
                      href="/mortgage" 
                      onClick={() => setProductsMenuOpen(false)}
                      className="block px-5 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-purple-400 transition cursor-pointer"
                    >
                      🏠 Mortgage
                    </Link>
                    <Link 
                      href="/credit-card" 
                      onClick={() => setProductsMenuOpen(false)}
                      className="block px-5 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-purple-400 transition cursor-pointer"
                    >
                      💳 Credit Card
                    </Link>
                    <Link 
                      href="/ontario-map" 
                      onClick={() => setProductsMenuOpen(false)}
                      className="block px-5 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-purple-400 transition cursor-pointer"
                    >
                      🗺️ Auto Map
                    </Link>
                    <Link 
                      href="/insuramap" 
                      onClick={() => setProductsMenuOpen(false)}
                      className="block px-5 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-purple-400 transition cursor-pointer"
                    >
                      🏠 InsuraMap 2.0
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/account" className="text-purple-200 hover:text-purple-400 transition">My Account</Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-purple-200 hover:text-purple-400 p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-purple-500/20 py-4">
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-purple-200 hover:text-purple-400 transition px-4 py-2"
                >
                  Home
                </Link>
                <Link 
                  href="/account" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-purple-200 hover:text-purple-400 transition px-4 py-2"
                >
                  My Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showResults ? (
          <>
            {/* Quiz Header */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">💳</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Find Your Perfect Credit Card
              </h1>
              <p className="text-xl text-purple-200 mb-6">
                Answer 2 quick questions
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index <= currentStep
                        ? 'bg-purple-500 w-8'
                        : 'bg-purple-500/30 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quiz Question */}
            <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                {questions[currentStep].question}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="bg-gradient-to-br from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 border-2 border-purple-500/50 rounded-xl p-6 text-left transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl group-hover:scale-110 transition-transform">
                        {option.emoji}
                      </span>
                      <span className="text-white font-semibold text-lg">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Your Perfect Matches!
              </h1>
              <button
                onClick={resetQuiz}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                🔄 Try Again
              </button>
            </div>

            {/* Recommended Cards */}
            <div className="space-y-6">
              {recommendedCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{card.logo}</span>
                        <div>
                          <h3 className="text-2xl font-bold">{card.name}</h3>
                          <p className="text-white/80">{card.bank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{card.rating}</div>
                        <div className="text-yellow-300">⭐</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-purple-200 text-sm mb-1">Annual Fee</p>
                        <p className="text-white text-xl font-bold">
                          {card.annualFee === 0 ? 'FREE' : `$${card.annualFee}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-purple-200 text-sm mb-1">Rewards</p>
                        <p className="text-white text-xl font-bold">{card.rewards}</p>
                      </div>
                      <div>
                        <p className="text-purple-200 text-sm mb-1">Cashback</p>
                        <p className="text-white text-xl font-bold">{card.cashback}</p>
                      </div>
                      <div>
                        <p className="text-purple-200 text-sm mb-1">APR</p>
                        <p className="text-white text-xl font-bold">{card.apr}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-purple-200 text-sm mb-2">Best For: {card.bestFor}</p>
                      <div className="flex flex-wrap gap-2">
                        {card.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-lg font-bold transition">
                      🚀 Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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
