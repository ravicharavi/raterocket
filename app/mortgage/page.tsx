'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MortgagePage() {
  const [income, setIncome] = useState<string>('')
  const [debt, setDebt] = useState<string>('')
  const [creditScore, setCreditScore] = useState<string>('')
  const [downPayment, setDownPayment] = useState<string>('')
  const [propertyValue, setPropertyValue] = useState<string>('')
  const [results, setResults] = useState<any[]>([])
  const [calculated, setCalculated] = useState(false)

  const calculateMortgage = () => {
    const incomeNum = parseFloat(income) || 0
    const debtNum = parseFloat(debt) || 0
    const creditScoreNum = parseInt(creditScore) || 0
    const downPaymentNum = parseFloat(downPayment) || 0
    const propertyValueNum = parseFloat(propertyValue) || 0

    // Calculate debt-to-income ratio
    const monthlyIncome = incomeNum / 12
    const debtToIncomeRatio = (debtNum / monthlyIncome) * 100

    // Determine eligibility based on credit score and DTI
    let eligibility: 'Excellent' | 'Good' | 'Fair' | 'Limited' = 'Limited'
    if (creditScoreNum >= 720 && debtToIncomeRatio < 36) {
      eligibility = 'Excellent'
    } else if (creditScoreNum >= 680 && debtToIncomeRatio < 43) {
      eligibility = 'Good'
    } else if (creditScoreNum >= 620 && debtToIncomeRatio < 50) {
      eligibility = 'Fair'
    }

    // Calculate maximum approval (typically 4-5x annual income)
    const incomeMultiplier = creditScoreNum >= 720 ? 5 : creditScoreNum >= 680 ? 4.5 : 4
    const maxApproval = incomeNum * incomeMultiplier

    // Mock lender offers
    const lenders = [
      {
        lender: 'Royal Bank of Canada',
        logo: '🏦',
        maxApproval: Math.min(maxApproval * 0.95, propertyValueNum || maxApproval),
        interestRate: creditScoreNum >= 720 ? 5.2 : creditScoreNum >= 680 ? 5.5 : 6.0,
        monthlyPayment: 0,
        downPaymentRequired: Math.max(downPaymentNum || propertyValueNum * 0.05, propertyValueNum * 0.05),
        approvalScore: creditScoreNum,
        features: ['Online Application', 'Pre-approval in 24h', 'Flexible Terms'],
        eligibility: eligibility,
      },
      {
        lender: 'TD Canada Trust',
        logo: '🏛️',
        maxApproval: Math.min(maxApproval * 0.92, propertyValueNum || maxApproval),
        interestRate: creditScoreNum >= 720 ? 5.3 : creditScoreNum >= 680 ? 5.6 : 6.1,
        monthlyPayment: 0,
        downPaymentRequired: Math.max(downPaymentNum || propertyValueNum * 0.05, propertyValueNum * 0.05),
        approvalScore: creditScoreNum,
        features: ['Mortgage Specialists', 'Rate Hold Option', 'Portable Mortgages'],
        eligibility: eligibility,
      },
      {
        lender: 'Scotiabank',
        logo: '💼',
        maxApproval: Math.min(maxApproval * 0.90, propertyValueNum || maxApproval),
        interestRate: creditScoreNum >= 720 ? 5.25 : creditScoreNum >= 680 ? 5.55 : 6.05,
        monthlyPayment: 0,
        downPaymentRequired: Math.max(downPaymentNum || propertyValueNum * 0.05, propertyValueNum * 0.05),
        approvalScore: creditScoreNum,
        features: ['Step Mortgage', 'Flexible Payment Options', 'Home Financing Solutions'],
        eligibility: eligibility,
      },
    ]

    // Calculate monthly payments for each lender
    lenders.forEach(lender => {
      const loanAmount = lender.maxApproval - lender.downPaymentRequired
      const monthlyRate = lender.interestRate / 100 / 12
      const numPayments = 25 * 12 // 25 year amortization
      if (monthlyRate > 0) {
        lender.monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      } else {
        lender.monthlyPayment = loanAmount / numPayments
      }
    })

    setResults(lenders)
    setCalculated(true)
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
              <Link href="/ontario-map" className="text-purple-200 hover:text-purple-400 transition">Auto Map</Link>
              <Link href="/insuramap" className="text-purple-200 hover:text-purple-400 transition">InsuraMap 2.0</Link>
              <Link href="/account" className="text-purple-200 hover:text-purple-400 transition">My Account</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mortgage Calculator
          </h1>
          <p className="text-xl text-purple-200 mb-4">
            Find out how much you can get approved for from various lenders
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Enter Your Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-purple-200 mb-2 font-semibold">
                  Annual Income (CAD)
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter annual income"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2 font-semibold">
                  Monthly Debt Payments (CAD)
                </label>
                <input
                  type="number"
                  value={debt}
                  onChange={(e) => setDebt(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter monthly debt"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2 font-semibold">
                  Credit Score
                </label>
                <input
                  type="number"
                  value={creditScore}
                  onChange={(e) => setCreditScore(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter credit score"
                  min="300"
                  max="850"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2 font-semibold">
                  Down Payment Amount (CAD) <span className="text-purple-400 text-sm">(Optional)</span>
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter down payment"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-purple-200 mb-2 font-semibold">
                  Property Value (CAD) <span className="text-purple-400 text-sm">(Optional)</span>
                </label>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter property value"
                />
              </div>
            </div>

            <button
              onClick={calculateMortgage}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              🚀 Calculate Mortgage Approval
            </button>
          </div>

          {calculated && results.length > 0 && (
            <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Lender Offers</h2>
              <div className="space-y-6">
                {results.map((lender, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/60 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{lender.logo}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white">{lender.lender}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lender.eligibility === 'Excellent' ? 'bg-green-500/20 text-green-300' :
                            lender.eligibility === 'Good' ? 'bg-blue-500/20 text-blue-300' :
                            lender.eligibility === 'Fair' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {lender.eligibility} Eligibility
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-purple-300 text-sm mb-1">Max Approval</p>
                        <p className="text-white font-bold text-lg">${lender.maxApproval.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-purple-300 text-sm mb-1">Interest Rate</p>
                        <p className="text-white font-bold text-lg">{lender.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-purple-300 text-sm mb-1">Monthly Payment</p>
                        <p className="text-white font-bold text-lg">${Math.round(lender.monthlyPayment).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-purple-300 text-sm mb-1">Down Payment</p>
                        <p className="text-white font-bold text-lg">${lender.downPaymentRequired.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {lender.features.map((feature: string, idx: number) => (
                          <span key={idx} className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">How Mortgage Approval Works</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Key Factors</h3>
              <ul className="space-y-3 text-purple-200">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong className="text-white">Income:</strong> Lenders typically approve 4-5x your annual income</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong className="text-white">Credit Score:</strong> Higher scores (720+) get better rates and higher approvals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong className="text-white">Debt-to-Income Ratio:</strong> Should be below 43% for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong className="text-white">Down Payment:</strong> Minimum 5% required, 20% avoids CMHC insurance</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">About This Calculator</h3>
              <p className="text-purple-200 leading-relaxed">
                This calculator uses standard mortgage qualification formulas used by major Canadian banks and lenders. It considers your income, debt obligations, and credit score to estimate your maximum approval amount.
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-200 text-sm">
                <strong>Disclaimer:</strong> Results are estimates only. Actual approval amounts and rates may vary based on lender policies, property type, location, and other factors. Always consult with a mortgage professional for accurate pre-approval.
              </p>
            </div>
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

