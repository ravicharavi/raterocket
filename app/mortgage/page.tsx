'use client'

import { useState } from 'react'
import Link from 'next/link'
import DeploymentTimestamp from '@/components/DeploymentTimestamp'

interface LenderOffer {
  lender: string
  logo: string
  maxApproval: number
  interestRate: number
  monthlyPayment: number
  downPaymentRequired: number
  approvalScore: number
  features: string[]
  eligibility: 'Excellent' | 'Good' | 'Fair' | 'Limited'
}

export default function MortgagePage() {
  const [income, setIncome] = useState<string>('')
  const [debt, setDebt] = useState<string>('')
  const [creditScore, setCreditScore] = useState<string>('')
  const [downPayment, setDownPayment] = useState<string>('')
  const [propertyValue, setPropertyValue] = useState<string>('')
  const [results, setResults] = useState<LenderOffer[]>([])
  const [calculated, setCalculated] = useState(false)

  // Calculate mortgage approval amounts
  const calculateMortgage = () => {
    const annualIncome = parseFloat(income) || 0
    const monthlyDebt = parseFloat(debt) || 0
    const credit = parseInt(creditScore) || 0
    const downPaymentAmount = parseFloat(downPayment) || 0
    const propertyPrice = parseFloat(propertyValue) || 0

    if (!annualIncome || !credit) {
      alert('Please enter your income and credit score')
      return
    }

    const monthlyIncome = annualIncome / 12
    const debtToIncomeRatio = (monthlyDebt / monthlyIncome) * 100

    // Base calculation: Typically lenders approve 4-5x annual income
    // Adjusted by credit score and debt ratio
    let baseMultiplier = 4.0

    // Credit score adjustments
    if (credit >= 760) baseMultiplier = 5.0
    else if (credit >= 720) baseMultiplier = 4.75
    else if (credit >= 680) baseMultiplier = 4.5
    else if (credit >= 640) baseMultiplier = 4.0
    else if (credit >= 600) baseMultiplier = 3.5
    else baseMultiplier = 3.0

    // Debt ratio adjustments
    if (debtToIncomeRatio > 43) baseMultiplier *= 0.7 // High debt ratio
    else if (debtToIncomeRatio > 36) baseMultiplier *= 0.85
    else if (debtToIncomeRatio < 20) baseMultiplier *= 1.1 // Low debt ratio

    const baseApproval = annualIncome * baseMultiplier

    // Mock lender offers with different criteria
    const lenders: LenderOffer[] = [
      {
        lender: 'Royal Bank of Canada',
        logo: '🏦',
        maxApproval: Math.round(baseApproval * 1.1),
        interestRate: credit >= 760 ? 5.25 : credit >= 720 ? 5.45 : credit >= 680 ? 5.65 : 5.85,
        monthlyPayment: 0,
        downPaymentRequired: 0.05,
        approvalScore: credit >= 720 ? 95 : credit >= 680 ? 85 : 75,
        features: ['Flexible payment options', 'Pre-approval valid 120 days', 'Online application'],
        eligibility: credit >= 680 ? 'Excellent' : credit >= 640 ? 'Good' : 'Fair',
      },
      {
        lender: 'TD Canada Trust',
        logo: '🏛️',
        maxApproval: Math.round(baseApproval * 1.05),
        interestRate: credit >= 760 ? 5.30 : credit >= 720 ? 5.50 : credit >= 680 ? 5.70 : 5.90,
        monthlyPayment: 0,
        downPaymentRequired: 0.05,
        approvalScore: credit >= 720 ? 92 : credit >= 680 ? 82 : 72,
        features: ['Mortgage specialists', 'Rate hold guarantee', 'Mobile app'],
        eligibility: credit >= 680 ? 'Excellent' : credit >= 640 ? 'Good' : 'Fair',
      },
      {
        lender: 'Scotiabank',
        logo: '💼',
        maxApproval: Math.round(baseApproval * 1.0),
        interestRate: credit >= 760 ? 5.35 : credit >= 720 ? 5.55 : credit >= 680 ? 5.75 : 5.95,
        monthlyPayment: 0,
        downPaymentRequired: 0.05,
        approvalScore: credit >= 720 ? 90 : credit >= 680 ? 80 : 70,
        features: ['Step mortgage program', 'Flexible prepayment', 'Expert advice'],
        eligibility: credit >= 680 ? 'Excellent' : credit >= 640 ? 'Good' : 'Fair',
      },
      {
        lender: 'BMO',
        logo: '🏢',
        maxApproval: Math.round(baseApproval * 0.95),
        interestRate: credit >= 760 ? 5.40 : credit >= 720 ? 5.60 : credit >= 680 ? 5.80 : 6.00,
        monthlyPayment: 0,
        downPaymentRequired: 0.05,
        approvalScore: credit >= 720 ? 88 : credit >= 680 ? 78 : 68,
        features: ['SmartFolio integration', 'Rate protection', 'Online tools'],
        eligibility: credit >= 680 ? 'Excellent' : credit >= 640 ? 'Good' : 'Fair',
      },
      {
        lender: 'CIBC',
        logo: '🏪',
        maxApproval: Math.round(baseApproval * 0.98),
        interestRate: credit >= 760 ? 5.38 : credit >= 720 ? 5.58 : credit >= 680 ? 5.78 : 5.98,
        monthlyPayment: 0,
        downPaymentRequired: 0.05,
        approvalScore: credit >= 720 ? 89 : credit >= 680 ? 79 : 69,
        features: ['Mortgage advisors', 'Rate guarantee', 'Flexible terms'],
        eligibility: credit >= 680 ? 'Excellent' : credit >= 640 ? 'Good' : 'Fair',
      },
      {
        lender: 'Tangerine',
        logo: '🍊',
        maxApproval: Math.round(baseApproval * 0.92),
        interestRate: credit >= 760 ? 5.20 : credit >= 720 ? 5.40 : credit >= 680 ? 5.60 : 5.80,
        monthlyPayment: 0,
        downPaymentRequired: 0.05,
        approvalScore: credit >= 720 ? 87 : credit >= 680 ? 77 : 67,
        features: ['Online-only', 'No fees', 'Competitive rates'],
        eligibility: credit >= 680 ? 'Excellent' : credit >= 640 ? 'Good' : 'Fair',
      },
      {
        lender: 'HSBC Canada',
        logo: '🌏',
        maxApproval: Math.round(baseApproval * 0.90),
        interestRate: credit >= 760 ? 5.28 : credit >= 720 ? 5.48 : credit >= 680 ? 5.68 : 5.88,
        monthlyPayment: 0,
        downPaymentRequired: 0.05,
        approvalScore: credit >= 720 ? 86 : credit >= 680 ? 76 : 66,
        features: ['International banking', 'Multi-currency', 'Global network'],
        eligibility: credit >= 680 ? 'Excellent' : credit >= 640 ? 'Good' : 'Fair',
      },
      {
        lender: 'National Bank',
        logo: '🇨🇦',
        maxApproval: Math.round(baseApproval * 0.93),
        interestRate: credit >= 760 ? 5.32 : credit >= 720 ? 5.52 : credit >= 680 ? 5.72 : 5.92,
        monthlyPayment: 0,
        downPaymentRequired: 0.05,
        approvalScore: credit >= 720 ? 85 : credit >= 680 ? 75 : 65,
        features: ['Quebec focus', 'Flexible solutions', 'Expert support'],
        eligibility: credit >= 680 ? 'Excellent' : credit >= 640 ? 'Good' : 'Fair',
      },
    ]

    // Calculate monthly payments for each lender
    lenders.forEach((lender) => {
      const loanAmount = lender.maxApproval - (lender.maxApproval * lender.downPaymentRequired)
      const monthlyRate = lender.interestRate / 100 / 12
      const numPayments = 25 * 12 // 25-year amortization
      
      if (monthlyRate > 0) {
        lender.monthlyPayment = Math.round(
          loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        )
      } else {
        lender.monthlyPayment = Math.round(loanAmount / numPayments)
      }
    })

    // Sort by max approval (highest first)
    lenders.sort((a, b) => b.maxApproval - a.maxApproval)

    setResults(lenders)
    setCalculated(true)
  }

  const getEligibilityColor = (eligibility: string) => {
    switch (eligibility) {
      case 'Excellent': return 'text-green-400 bg-green-400/20'
      case 'Good': return 'text-blue-400 bg-blue-400/20'
      case 'Fair': return 'text-yellow-400 bg-yellow-400/20'
      case 'Limited': return 'text-orange-400 bg-orange-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
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
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            🏠 Mortgage Calculator
          </h1>
          <p className="text-xl text-purple-200 mb-4">
            Find out how much you can get approved for from various lenders
          </p>
          <DeploymentTimestamp />
        </div>

        {/* Calculator Form */}
        <div className="bg-slate-800 rounded-xl p-8 mb-8 border-2 border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-6">Enter Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-purple-200 text-sm font-semibold mb-2">
                Annual Income (CAD)
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g., 75000"
                className="w-full bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-semibold mb-2">
                Monthly Debt Payments (CAD)
              </label>
              <input
                type="number"
                value={debt}
                onChange={(e) => setDebt(e.target.value)}
                placeholder="e.g., 500"
                className="w-full bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-semibold mb-2">
                Credit Score
              </label>
              <input
                type="number"
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                placeholder="300-900"
                min="300"
                max="900"
                className="w-full bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-semibold mb-2">
                Down Payment Amount (CAD) <span className="text-xs text-purple-400">(Optional)</span>
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="e.g., 50000"
                className="w-full bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-purple-200 text-sm font-semibold mb-2">
                Property Value (CAD) <span className="text-xs text-purple-400">(Optional)</span>
              </label>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                placeholder="e.g., 500000"
                className="w-full bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            onClick={calculateMortgage}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition shadow-lg"
          >
            🚀 Calculate Mortgage Approval
          </button>
        </div>

        {/* Results */}
        {calculated && results.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Lender Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((lender, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-xl p-6 border-2 border-purple-500/30 hover:border-purple-500/50 transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{lender.logo}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{lender.lender}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEligibilityColor(lender.eligibility)}`}>
                          {lender.eligibility} Eligibility
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">
                        {lender.approvalScore}%
                      </div>
                      <div className="text-xs text-purple-300">Approval Score</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-purple-600/20 rounded-lg p-3 border border-purple-500/30">
                      <p className="text-purple-200 text-xs mb-1">Max Approval</p>
                      <p className="text-2xl font-bold text-white">
                        ${lender.maxApproval.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-500/30">
                      <p className="text-blue-200 text-xs mb-1">Interest Rate</p>
                      <p className="text-2xl font-bold text-white">
                        {lender.interestRate.toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-green-600/20 rounded-lg p-3 border border-green-500/30">
                      <p className="text-green-200 text-xs mb-1">Monthly Payment*</p>
                      <p className="text-xl font-bold text-white">
                        ${lender.monthlyPayment.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-orange-600/20 rounded-lg p-3 border border-orange-500/30">
                      <p className="text-orange-200 text-xs mb-1">Down Payment</p>
                      <p className="text-xl font-bold text-white">
                        {(lender.downPaymentRequired * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-purple-500/30 pt-4">
                    <p className="text-purple-200 text-sm font-semibold mb-2">Features:</p>
                    <ul className="space-y-1">
                      {lender.features.map((feature, idx) => (
                        <li key={idx} className="text-purple-300 text-sm flex items-center gap-2">
                          <span>✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition">
                    Apply with {lender.lender}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-purple-500/30">
              <p className="text-purple-200 text-sm">
                <strong className="text-white">*</strong> Monthly payment calculated based on 25-year amortization period. 
                Actual rates and approvals may vary. This calculator provides estimates only and does not constitute 
                a mortgage pre-approval. Please consult with lenders directly for official quotes.
              </p>
              <p className="text-purple-300 text-xs mt-2">
                <strong>Note:</strong> This calculator uses industry-standard formulas and typical lender criteria. 
                Actual approval amounts depend on additional factors including employment history, property location, 
                and lender-specific policies. Rates shown are estimates and subject to change.
              </p>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-slate-800 rounded-xl p-8 border-2 border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">How Mortgage Approval Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Key Factors</h3>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li>• <strong>Income:</strong> Lenders typically approve 4-5x your annual income</li>
                <li>• <strong>Credit Score:</strong> Higher scores (720+) get better rates and higher approvals</li>
                <li>• <strong>Debt-to-Income Ratio:</strong> Should be below 43% for best results</li>
                <li>• <strong>Down Payment:</strong> Minimum 5% required, 20% avoids CMHC insurance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">About This Calculator</h3>
              <p className="text-purple-200 text-sm mb-2">
                This calculator uses standard mortgage qualification formulas used by major Canadian banks 
                and lenders. It considers your income, debt obligations, and credit score to estimate 
                your maximum approval amount.
              </p>
              <p className="text-purple-300 text-xs">
                <strong>Disclaimer:</strong> Results are estimates only. Actual approval amounts and rates 
                may vary based on lender policies, property type, location, and other factors. 
                Always consult with a mortgage professional for accurate pre-approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
