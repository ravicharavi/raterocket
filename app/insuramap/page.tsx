'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CityData {
  name: string
  x: number
  y: number
  homePremium: number
  climateRiskScore: number
  floodRisk: 'Low' | 'Medium' | 'High' | 'Very High'
  claimsHistory: 'Low' | 'Medium' | 'High'
  region: string
  factors: string[]
}

export default function InsuraMapPage() {
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null)
  const [zoom, setZoom] = useState(1)
  const [viewMode, setViewMode] = useState<'premium' | 'climate'>('premium')

  // Home insurance data with climate risk scores and factors
  // Premiums in CAD per year, Climate Risk Score 0-100 (higher = more risk)
  const cities: CityData[] = [
    { 
      name: 'Toronto', 
      x: 47, y: 56, 
      homePremium: 1850, 
      climateRiskScore: 65,
      floodRisk: 'High',
      claimsHistory: 'High',
      region: 'GTA',
      factors: ['Urban density', 'Severe weather events', 'High claim frequency', 'Flood risk']
    },
    { 
      name: 'Mississauga', 
      x: 43, y: 57, 
      homePremium: 1720, 
      climateRiskScore: 58,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'GTA',
      factors: ['Wind damage', 'Water damage claims', 'Urban area']
    },
    { 
      name: 'Brampton', 
      x: 42, y: 58, 
      homePremium: 1680, 
      climateRiskScore: 55,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'GTA',
      factors: ['Basement flooding', 'Severe storms']
    },
    { 
      name: 'Ottawa', 
      x: 55, y: 42, 
      homePremium: 1420, 
      climateRiskScore: 45,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Eastern Ontario',
      factors: ['Lower risk area', 'Stable climate']
    },
    { 
      name: 'Hamilton', 
      x: 40, y: 61, 
      homePremium: 1580, 
      climateRiskScore: 52,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Golden Horseshoe',
      factors: ['Lake effect weather', 'Wind damage']
    },
    { 
      name: 'London', 
      x: 38, y: 62, 
      homePremium: 1350, 
      climateRiskScore: 42,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Southwestern Ontario',
      factors: ['Lower risk', 'Fewer severe events']
    },
    { 
      name: 'Windsor', 
      x: 32, y: 68, 
      homePremium: 1520, 
      climateRiskScore: 48,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Southwestern Ontario',
      factors: ['Severe storms', 'Wind damage']
    },
    { 
      name: 'Kingston', 
      x: 52, y: 48, 
      homePremium: 1380, 
      climateRiskScore: 40,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Eastern Ontario',
      factors: ['Lower risk area']
    },
    { 
      name: 'Thunder Bay', 
      x: 15, y: 25, 
      homePremium: 1280, 
      climateRiskScore: 35,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Northwestern Ontario',
      factors: ['Low risk', 'Stable climate']
    },
    { 
      name: 'Sudbury', 
      x: 28, y: 28, 
      homePremium: 1320, 
      climateRiskScore: 38,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Northeastern Ontario',
      factors: ['Lower risk']
    },
    { 
      name: 'Barrie', 
      x: 45, y: 51, 
      homePremium: 1620, 
      climateRiskScore: 50,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Simcoe County',
      factors: ['Lake effect', 'Severe weather']
    },
    { 
      name: 'Oshawa', 
      x: 50, y: 54, 
      homePremium: 1750, 
      climateRiskScore: 60,
      floodRisk: 'High',
      claimsHistory: 'High',
      region: 'Durham Region',
      factors: ['High flood risk', 'Severe storms', 'High claims']
    },
    { 
      name: 'Burlington', 
      x: 42, y: 60, 
      homePremium: 1650, 
      climateRiskScore: 54,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Halton Region',
      factors: ['Lake effect', 'Wind damage']
    },
  ]

  // Calculate ranges for color coding
  const homePremiums = cities.map(c => c.homePremium)
  const minPremium = Math.min(...homePremiums)
  const maxPremium = Math.max(...homePremiums)
  const premiumRange = maxPremium - minPremium

  const climateScores = cities.map(c => c.climateRiskScore)
  const minClimate = Math.min(...climateScores)
  const maxClimate = Math.max(...climateScores)
  const climateRange = maxClimate - minClimate

  // Get color based on premium or climate risk
  const getColor = (city: CityData): string => {
    if (viewMode === 'premium') {
      const ratio = (city.homePremium - minPremium) / premiumRange
      if (ratio < 0.33) {
        const greenRatio = ratio / 0.33
        return `rgb(${Math.round(34 + greenRatio * 200)}, ${Math.round(197 + greenRatio * 58)}, ${Math.round(94)})`
      } else if (ratio < 0.66) {
        const yellowRatio = (ratio - 0.33) / 0.33
        return `rgb(${Math.round(234 - yellowRatio * 34)}, ${Math.round(179 + yellowRatio * 76)}, ${Math.round(8)})`
      } else {
        const redRatio = (ratio - 0.66) / 0.34
        return `rgb(${Math.round(200 + redRatio * 55)}, ${Math.round(30 + redRatio * 30)}, ${Math.round(30)})`
      }
    } else {
      // Climate risk: green = low risk, red = high risk
      const ratio = (city.climateRiskScore - minClimate) / climateRange
      if (ratio < 0.33) {
        const greenRatio = ratio / 0.33
        return `rgb(${Math.round(34 + greenRatio * 200)}, ${Math.round(197 + greenRatio * 58)}, ${Math.round(94)})`
      } else if (ratio < 0.66) {
        const yellowRatio = (ratio - 0.33) / 0.33
        return `rgb(${Math.round(234 - yellowRatio * 34)}, ${Math.round(179 + yellowRatio * 76)}, ${Math.round(8)})`
      } else {
        const redRatio = (ratio - 0.66) / 0.34
        return `rgb(${Math.round(200 + redRatio * 55)}, ${Math.round(30 + redRatio * 30)}, ${Math.round(30)})`
      }
    }
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const handleResetZoom = () => {
    setZoom(1)
  }

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'Low': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'High': return 'text-orange-400'
      case 'Very High': return 'text-red-400'
      default: return 'text-gray-400'
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
              <Link href="/ontario-map" className="text-purple-200 hover:text-purple-400">Auto Map</Link>
              <Link href="/" className="text-purple-200 hover:text-purple-400">Home</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            🏠 InsuraMap 2.0
          </h1>
          <p className="text-xl text-purple-200 mb-4">
            Home Insurance Premiums & Climate Risk Analysis
          </p>
          <p className="text-purple-300 text-sm">
            Last updated: December 5th, 2:00 PM
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-slate-800 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-purple-200 font-semibold">View Mode:</span>
              <button
                onClick={() => setViewMode('premium')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  viewMode === 'premium'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-purple-200 hover:bg-slate-600'
                }`}
              >
                💰 Premium
              </button>
              <button
                onClick={() => setViewMode('climate')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  viewMode === 'climate'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-purple-200 hover:bg-slate-600'
                }`}
              >
                🌡️ Climate Risk
              </button>
            </div>
            <div className="text-purple-300 text-sm">
              {viewMode === 'premium' 
                ? '🟢 Low Premium → 🔴 High Premium'
                : '🟢 Low Risk → 🔴 High Risk'}
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="bg-slate-800 rounded-xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-purple-200 font-semibold">🔍 Zoom:</span>
            <span className="text-purple-300 font-bold">{(zoom * 100).toFixed(0)}%</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleZoomOut}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              disabled={zoom <= 0.5}
            >
              ➖ Zoom Out
            </button>
            <button
              onClick={handleResetZoom}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              🔄 Reset
            </button>
            <button
              onClick={handleZoomIn}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              disabled={zoom >= 3}
            >
              ➕ Zoom In
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-slate-800 rounded-xl p-8 mb-8">
          <div className="relative overflow-hidden" style={{ height: '600px', width: '100%' }}>
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
                width: '100%',
                height: '100%',
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                style={{ minHeight: '600px' }}
              >
                {cities.map((city, index) => {
                  const color = getColor(city)
                  const isHovered = hoveredCity?.name === city.name
                  
                  return (
                    <g key={index}>
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isHovered ? 3.5 : 2.5}
                        fill={color}
                        stroke="white"
                        strokeWidth={isHovered ? 0.6 : 0.4}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredCity(city)}
                        onMouseLeave={() => setHoveredCity(null)}
                      />
                      <text
                        x={city.x}
                        y={city.y - 4}
                        fill="white"
                        fontSize="2"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                      >
                        {city.name}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Detailed Hover Info */}
            {hoveredCity && (
              <div className="absolute top-4 right-4 bg-slate-900 border-2 border-purple-500 rounded-xl p-6 min-w-[320px] max-w-[400px]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🏠</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{hoveredCity.name}</h3>
                    <p className="text-purple-300 text-sm">{hoveredCity.region}</p>
                  </div>
                </div>

                {/* Premium */}
                <div className="bg-purple-600/20 rounded-lg p-4 mb-4 border border-purple-500/30">
                  <p className="text-purple-200 text-sm mb-1">Average Annual Premium</p>
                  <p className="text-3xl font-bold text-white">
                    ${hoveredCity.homePremium.toLocaleString()}
                  </p>
                  <p className="text-purple-300 text-xs mt-1">per year</p>
                </div>

                {/* Climate Risk Score */}
                <div className="bg-blue-600/20 rounded-lg p-4 mb-4 border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-blue-200 text-sm">Climate Risk Score</p>
                    <span className={`text-2xl font-bold ${getRiskColor(hoveredCity.floodRisk)}`}>
                      {hoveredCity.climateRiskScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${hoveredCity.climateRiskScore}%` }}
                    />
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200 text-sm">Flood Risk:</span>
                    <span className={`font-semibold ${getRiskColor(hoveredCity.floodRisk)}`}>
                      {hoveredCity.floodRisk}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200 text-sm">Claims History:</span>
                    <span className={`font-semibold ${getRiskColor(hoveredCity.claimsHistory)}`}>
                      {hoveredCity.claimsHistory}
                    </span>
                  </div>
                </div>

                {/* Key Factors */}
                <div className="border-t border-purple-500/30 pt-4">
                  <p className="text-purple-200 text-sm font-semibold mb-2">Key Pricing Factors:</p>
                  <ul className="space-y-1">
                    {hoveredCity.factors.map((factor, idx) => (
                      <li key={idx} className="text-purple-300 text-xs flex items-center gap-2">
                        <span>•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* City List with Details */}
        <div className="bg-slate-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Cities & Risk Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities
              .sort((a, b) => a.homePremium - b.homePremium)
              .map((city, index) => {
                const color = getColor(city)
                return (
                  <div
                    key={index}
                    className="bg-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-600 transition"
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-white">{city.name}</h3>
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                    <p className="text-purple-300 text-sm mb-2">{city.region}</p>
                    <div className="space-y-1 mb-2">
                      <p className="text-xl font-bold text-white">
                        ${city.homePremium.toLocaleString()}/year
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-300">Climate Risk:</span>
                        <span className={`font-semibold ${getRiskColor(city.floodRisk)}`}>
                          {city.climateRiskScore}/100
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className={`px-2 py-1 rounded ${getRiskColor(city.floodRisk)} bg-opacity-20`}>
                        {city.floodRisk} Flood
                      </span>
                      <span className={`px-2 py-1 rounded ${getRiskColor(city.claimsHistory)} bg-opacity-20`}>
                        {city.claimsHistory} Claims
                      </span>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
