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
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [recommendedCards, setRecommendedCards] = useState<CreditCard[]>([])

  const questions = [
    {
      id: 1,
      question: "What's your primary spending category? 💳",
      options: [
        { value: 'travel', label: '✈️ Travel & Vacations', emoji: '✈️' },
        { value: 'groceries', label: '🛒 Groceries & Daily Needs', emoji: '🛒' },
        { value: 'gas', label: '⛽ Gas & Transportation', emoji: '⛽' },
        { value: 'dining', label: '🍽️ Dining & Entertainment', emoji: '🍽️' },
        { value: 'shopping', label: '🛍️ Shopping & Retail', emoji: '🛍️' },
      ]
    },
    {
      id: 2,
      question: "How much do you typically spend per month? 💰",
      options: [
        { value: 'low', label: 'Less than $500', emoji: '💵' },
        { value: 'medium', label: '$500 - $2,000', emoji: '💸' },
        { value: 'high', label: '$2,000 - $5,000', emoji: '💳' },
        { value: 'very-high', label: 'More than $5,000', emoji: '🏦' },
      ]
    },
    {
      id: 3,
      question: "What matters most to you? 🎯",
      options: [
        { value: 'cashback', label: '💰 Cashback Rewards', emoji: '💰' },
        { value: 'points', label: '✈️ Travel Points/Miles', emoji: '✈️' },
        { value: 'low-fee', label: '💵 No Annual Fee', emoji: '💵' },
        { value: 'premium', label: '⭐ Premium Benefits', emoji: '⭐' },
      ]
    },
    {
      id: 4,
      question: "What's your credit score range? 📊",
      options: [
        { value: 'excellent', label: '750+ (Excellent)', emoji: '🌟' },
        { value: 'good', label: '700-749 (Good)', emoji: '👍' },
        { value: 'fair', label: '650-699 (Fair)', emoji: '📈' },
        { value: 'building', label: 'Below 650 (Building)', emoji: '🔨' },
      ]
    },
    {
      id: 5,
      question: "How do you prefer to redeem rewards? 🎁",
      options: [
        { value: 'statement', label: '💳 Statement Credit', emoji: '💳' },
        { value: 'travel', label: '✈️ Travel Bookings', emoji: '✈️' },
        { value: 'gift-cards', label: '🎟️ Gift Cards', emoji: '🎟️' },
        { value: 'merchandise', label: '🛍️ Merchandise', emoji: '🛍️' },
      ]
    },
  ]

  const allCards: CreditCard[] = [
    {
      name: 'Cashback Mastercard',
      bank: 'RBC',
      logo: '🏦',
      annualFee: 0,
      rewards: '2% on groceries, 1% on everything else',
      cashback: 'Up to 2%',
      apr: '19.99%',
      features: ['No Annual Fee', 'Welcome Bonus', 'Cashback', 'Mobile App'],
      bestFor: 'Groceries & Daily Spending',
      rating: 4.5,
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Travel Rewards Card',
      bank: 'TD',
      logo: '✈️',
      annualFee: 120,
      rewards: '3x points on travel, 1x on everything',
      cashback: 'Travel Points',
      apr: '19.99%',
      features: ['Travel Insurance', 'Lounge Access', 'No FX Fees', 'Points Transfer'],
      bestFor: 'Frequent Travelers',
      rating: 4.7,
      color: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Gas & Groceries Card',
      bank: 'CIBC',
      logo: '⛽',
      annualFee: 0,
      rewards: '4% on gas, 2% on groceries',
      cashback: 'Up to 4%',
      apr: '20.99%',
      features: ['No Annual Fee', 'Gas Rewards', 'Grocery Rewards', 'Easy Approval'],
      bestFor: 'Gas & Groceries',
      rating: 4.4,
      color: 'from-green-600 to-emerald-600'
    },
    {
      name: 'Dining Rewards Card',
      bank: 'Scotiabank',
      logo: '🍽️',
      annualFee: 99,
      rewards: '5x on dining, 2x on entertainment',
      cashback: 'Scene Points',
      apr: '19.99%',
      features: ['Dining Rewards', 'Entertainment', 'Scene Points', 'Movie Tickets'],
      bestFor: 'Foodies & Entertainment',
      rating: 4.6,
      color: 'from-orange-600 to-red-600'
    },
    {
      name: 'Premium Rewards Card',
      bank: 'American Express',
      logo: '⭐',
      annualFee: 699,
      rewards: 'Comprehensive rewards program',
      cashback: 'Points',
      apr: 'N/A',
      features: ['Premium Benefits', 'Concierge', 'Travel Credits', 'Lounge Access'],
      bestFor: 'High Spenders',
      rating: 4.8,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'Student Card',
      bank: 'BMO',
      logo: '🎓',
      annualFee: 0,
      rewards: '1% cashback on all purchases',
      cashback: '1%',
      apr: '19.99%',
      features: ['No Annual Fee', 'Student Friendly', 'Easy Approval', 'Credit Building'],
      bestFor: 'Students',
      rating: 4.3,
      color: 'from-indigo-600 to-purple-600'
    },
    {
      name: 'Shopping Rewards Card',
      bank: 'PC Financial',
      logo: '🛍️',
      annualFee: 0,
      rewards: 'PC Optimum Points',
      cashback: 'Points',
      apr: '19.99%',
      features: ['No Annual Fee', 'PC Points', 'Grocery Rewards', 'Shopping Benefits'],
      bestFor: 'Shoppers',
      rating: 4.5,
      color: 'from-pink-600 to-rose-600'
    },
    {
      name: 'Secured Card',
      bank: 'Capital One',
      logo: '🔒',
      annualFee: 59,
      rewards: 'Credit Building',
      cashback: '1%',
      apr: '19.99%',
      features: ['Credit Building', 'Secured Option', 'Reports to Bureaus', 'Low Requirements'],
      bestFor: 'Building Credit',
      rating: 4.2,
      color: 'from-gray-600 to-slate-600'
    },
  ]

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentStep]: value }
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate recommendations based on answers
      calculateRecommendations(newAnswers)
      setShowResults(true)
    }
  }

  const calculateRecommendations = (userAnswers: Record<number, string>) => {
    let recommended: CreditCard[] = []

    const spendingCategory = userAnswers[0]
    const spendingAmount = userAnswers[1]
    const priority = userAnswers[2]
    const creditScore = userAnswers[3]

    // Logic to match cards based on answers
    if (spendingCategory === 'groceries') {
      recommended.push(allCards.find(c => c.name === 'Cashback Mastercard')!)
      recommended.push(allCards.find(c => c.name === 'Shopping Rewards Card')!)
    }
    if (spendingCategory === 'travel') {
      recommended.push(allCards.find(c => c.name === 'Travel Rewards Card')!)
      recommended.push(allCards.find(c => c.name === 'Premium Rewards Card')!)
    }
    if (spendingCategory === 'gas') {
      recommended.push(allCards.find(c => c.name === 'Gas & Groceries Card')!)
    }
    if (spendingCategory === 'dining') {
      recommended.push(allCards.find(c => c.name === 'Dining Rewards Card')!)
    }
    if (spendingCategory === 'shopping') {
      recommended.push(allCards.find(c => c.name === 'Shopping Rewards Card')!)
    }

    if (priority === 'low-fee') {
      recommended = recommended.filter(c => c.annualFee === 0)
    }
    if (priority === 'cashback') {
      recommended = recommended.filter(c => c.cashback.includes('%'))
    }
    if (priority === 'points') {
      recommended = recommended.filter(c => c.cashback.includes('Points'))
    }

    if (creditScore === 'building' || creditScore === 'fair') {
      recommended.push(allCards.find(c => c.name === 'Student Card')!)
      recommended.push(allCards.find(c => c.name === 'Secured Card')!)
    }

    // Remove duplicates and limit to 4
    recommended = Array.from(new Set(recommended)).slice(0, 4)

    // If no matches, show popular cards
    if (recommended.length === 0) {
      recommended = [allCards[0], allCards[1], allCards[2], allCards[3]]
    }

    setRecommendedCards(recommended)
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
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-purple-200 hover:text-purple-400 transition">Home</Link>
              <Link href="/account" className="text-purple-200 hover:text-purple-400 transition">My Account</Link>
            </div>
          </div>
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
                Answer a few quick questions and we'll match you with the best cards!
              </p>
              <div className="flex justify-center gap-2 mb-8">
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
              <p className="text-purple-300 text-sm">
                Question {currentStep + 1} of {questions.length}
              </p>
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
                        {option.label.replace(option.emoji + ' ', '')}
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
              <p className="text-xl text-purple-200 mb-6">
                Based on your answers, here are the credit cards that make sense for you
              </p>
              <button
                onClick={resetQuiz}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                🔄 Take Quiz Again
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                        <p className="text-purple-200 text-sm mb-1">Cashback/Rewards</p>
                        <p className="text-white text-xl font-bold">{card.cashback}</p>
                      </div>
                      <div>
                        <p className="text-purple-200 text-sm mb-1">APR</p>
                        <p className="text-white text-xl font-bold">{card.apr}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-purple-200 text-sm mb-2">Best For:</p>
                      <p className="text-white font-semibold">{card.bestFor}</p>
                    </div>

                    <div className="mb-6">
                      <p className="text-purple-200 text-sm mb-2">Key Features:</p>
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

                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-lg font-bold transition">
                        🚀 Apply Now
                      </button>
                      <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                        📖 Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
              <p className="text-yellow-200 text-sm">
                <strong>💡 Tip:</strong> These recommendations are based on your quiz answers. 
                Always review the full terms and conditions before applying. 
                Credit card approval is subject to the issuer's criteria.
              </p>
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

