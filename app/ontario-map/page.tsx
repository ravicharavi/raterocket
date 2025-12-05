'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CityData {
  name: string
  x: number
  y: number
  premium: number
  region: string
}

export default function OntarioMapPage() {
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null)
  const [zoom, setZoom] = useState(1)

  // Premium data from rates.ca (2025 data in CAD per year)
  // Source: https://rates.ca/insurance-quotes/auto/ontario
  const cities: CityData[] = [
    { name: 'Brampton', x: 42, y: 58, premium: 3848, region: 'GTA' },
    { name: 'Scarborough', x: 48, y: 55, premium: 3643, region: 'GTA' },
    { name: 'North York', x: 47, y: 56, premium: 3570, region: 'GTA' },
    { name: 'Mississauga', x: 43, y: 57, premium: 3498, region: 'GTA' },
    { name: 'Etobicoke', x: 44, y: 56, premium: 3490, region: 'GTA' },
    { name: 'Markham', x: 47, y: 57, premium: 3477, region: 'GTA' },
    { name: 'Vaughan', x: 45, y: 56, premium: 3317, region: 'GTA' },
    { name: 'Oshawa', x: 50, y: 54, premium: 3075, region: 'Durham Region' },
    { name: 'Toronto', x: 47, y: 56, premium: 2800, region: 'GTA' },
    { name: 'London', x: 38, y: 62, premium: 2550, region: 'Southwestern Ontario' },
    { name: 'Ottawa', x: 55, y: 42, premium: 1780, region: 'Eastern Ontario' },
    { name: 'Kingston', x: 52, y: 48, premium: 1750, region: 'Eastern Ontario' },
    { name: 'Brockville', x: 54, y: 46, premium: 1756, region: 'Eastern Ontario' },
  ]

  // Calculate premium range for color coding
  const premiums = cities.map(c => c.premium)
  const minPremium = Math.min(...premiums)
  const maxPremium = Math.max(...premiums)
  const range = maxPremium - minPremium

  // Get color based on premium (green = low, red = high)
  const getColor = (premium: number): string => {
    const ratio = (premium - minPremium) / range
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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const handleResetZoom = () => {
    setZoom(1)
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
            <Link href="/" className="text-purple-200 hover:text-purple-400">Home</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Ontario Auto Insurance Premium Map
          </h1>
          <p className="text-purple-200">
            Hover over cities to see average annual rates. Data from{' '}
            <a 
              href="https://rates.ca/insurance-quotes/auto/ontario" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-purple-400 underline"
            >
              rates.ca
            </a>
          </p>
          <p className="text-purple-300 text-sm mt-2">
            Last updated: December 5th, 2:00 PM
          </p>
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
                  const color = getColor(city.premium)
                  const isHovered = hoveredCity?.name === city.name
                  
                  return (
                    <g key={index}>
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isHovered ? 3 : 2}
                        fill={color}
                        stroke="white"
                        strokeWidth={isHovered ? 0.5 : 0.3}
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

            {/* Hover Info */}
            {hoveredCity && (
              <div className="absolute top-4 right-4 bg-slate-900 border border-purple-500 rounded-lg p-4 min-w-[250px]">
                <h3 className="text-xl font-bold text-white mb-2">{hoveredCity.name}</h3>
                <p className="text-purple-300 text-sm mb-2">{hoveredCity.region}</p>
                <p className="text-2xl font-bold text-white">
                  ${hoveredCity.premium.toLocaleString()}/year
                </p>
              </div>
            )}
          </div>
        </div>

        {/* City List */}
        <div className="bg-slate-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Cities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities
              .sort((a, b) => a.premium - b.premium)
              .map((city, index) => {
                const color = getColor(city.premium)
                return (
                  <div
                    key={index}
                    className="bg-slate-700 rounded-lg p-4 cursor-pointer"
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
                    <p className="text-purple-300 text-sm mb-1">{city.region}</p>
                    <p className="text-xl font-bold text-white">
                      ${city.premium.toLocaleString()}/year
                    </p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
