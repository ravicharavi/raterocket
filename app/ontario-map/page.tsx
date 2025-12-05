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

  // Mock premium data for Ontario cities (in CAD per year)
  const cities: CityData[] = [
    { name: 'Toronto', x: 50, y: 30, premium: 3200, region: 'GTA' },
    { name: 'Mississauga', x: 48, y: 32, premium: 3100, region: 'GTA' },
    { name: 'Brampton', x: 47, y: 31, premium: 3300, region: 'GTA' },
    { name: 'Hamilton', x: 45, y: 35, premium: 2800, region: 'Golden Horseshoe' },
    { name: 'Ottawa', x: 55, y: 25, premium: 2400, region: 'Eastern Ontario' },
    { name: 'London', x: 42, y: 40, premium: 2200, region: 'Southwestern Ontario' },
    { name: 'Kitchener', x: 44, y: 33, premium: 2600, region: 'Waterloo Region' },
    { name: 'Windsor', x: 38, y: 45, premium: 2900, region: 'Southwestern Ontario' },
    { name: 'Oshawa', x: 51, y: 28, premium: 3000, region: 'Durham Region' },
    { name: 'St. Catharines', x: 43, y: 37, premium: 2700, region: 'Niagara Region' },
    { name: 'Barrie', x: 49, y: 22, premium: 2500, region: 'Simcoe County' },
    { name: 'Guelph', x: 45, y: 34, premium: 2400, region: 'Wellington County' },
    { name: 'Cambridge', x: 44, y: 34, premium: 2600, region: 'Waterloo Region' },
    { name: 'Thunder Bay', x: 20, y: 15, premium: 2100, region: 'Northwestern Ontario' },
    { name: 'Sudbury', x: 35, y: 20, premium: 2300, region: 'Northeastern Ontario' },
    { name: 'Kingston', x: 52, y: 30, premium: 2200, region: 'Eastern Ontario' },
    { name: 'Waterloo', x: 44, y: 33, premium: 2500, region: 'Waterloo Region' },
    { name: 'Burlington', x: 46, y: 34, premium: 2800, region: 'Halton Region' },
    { name: 'Oakville', x: 47, y: 33, premium: 2900, region: 'Halton Region' },
    { name: 'Sault Ste. Marie', x: 15, y: 18, premium: 2000, region: 'Northern Ontario' },
    { name: 'Peterborough', x: 50, y: 28, premium: 2300, region: 'Kawartha Lakes' },
    { name: 'Sarnia', x: 40, y: 42, premium: 2400, region: 'Lambton County' },
    { name: 'Belleville', x: 51, y: 29, premium: 2250, region: 'Quinte Region' },
    { name: 'North Bay', x: 32, y: 18, premium: 2100, region: 'Nipissing District' },
    { name: 'Cornwall', x: 58, y: 28, premium: 2150, region: 'Eastern Ontario' },
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
      // Green (lowest third)
      const greenRatio = ratio / 0.33
      return `rgb(${Math.round(34 + greenRatio * 200)}, ${Math.round(197 + greenRatio * 58)}, ${Math.round(94)})`
    } else if (ratio < 0.66) {
      // Yellow (middle third)
      const yellowRatio = (ratio - 0.33) / 0.33
      return `rgb(${Math.round(234 - yellowRatio * 34)}, ${Math.round(179 + yellowRatio * 76)}, ${Math.round(8)})`
    } else {
      // Red (highest third)
      const redRatio = (ratio - 0.66) / 0.34
      return `rgb(${Math.round(200 + redRatio * 55)}, ${Math.round(30 + redRatio * 30)}, ${Math.round(30)})`
    }
  }

  return (
    <div className="min-h-screen space-bg relative">
      {/* Floating Planets Background */}
      <div className="absolute top-20 right-10 w-96 h-96 planet opacity-30"></div>
      <div className="absolute bottom-40 left-20 w-64 h-64 planet opacity-20"></div>

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
              <Link href="/ontario-map" className="text-purple-400 font-semibold">Ontario Map</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <span className="text-5xl">🗺️</span>
            <span className="text-5xl">🪐</span>
            <span className="text-5xl">🌌</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ontario Auto Insurance
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"> Premium Map</span>
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Explore auto insurance premiums across Ontario. Hover over cities to see average annual rates.
            <br />
            <span className="text-yellow-300">Green = Lowest Premiums</span> → <span className="text-red-400">Red = Highest Premiums</span>
          </p>
        </div>

        {/* Legend */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📊</span> Premium Range Legend
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-r from-green-500 to-yellow-500"></div>
              <span className="text-purple-200">Low: ${minPremium.toLocaleString()}/year</span>
            </div>
            <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-r from-yellow-500 to-red-500"></div>
              <span className="text-purple-200">High: ${maxPremium.toLocaleString()}/year</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-slate-900/80 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Ontario Map SVG */}
          <div className="relative" style={{ height: '600px', width: '100%' }}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ minHeight: '600px' }}
            >
              {/* Simplified Ontario outline */}
              <path
                d="M 20 15 L 25 12 L 30 10 L 35 8 L 40 7 L 45 8 L 50 10 L 55 12 L 60 15 L 62 18 L 63 22 L 64 28 L 65 35 L 64 40 L 63 45 L 60 48 L 58 50 L 55 52 L 50 53 L 45 52 L 40 50 L 38 48 L 35 45 L 32 40 L 30 35 L 28 30 L 25 25 L 22 20 Z"
                fill="rgba(99, 102, 241, 0.1)"
                stroke="rgba(139, 92, 246, 0.5)"
                strokeWidth="0.5"
              />
              
              {/* Great Lakes representation */}
              <ellipse cx="45" cy="42" rx="8" ry="5" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="0.3" />
              <ellipse cx="38" cy="45" rx="6" ry="4" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="0.3" />

              {/* City markers */}
              {cities.map((city, index) => {
                const color = getColor(city.premium)
                const isHovered = hoveredCity?.name === city.name
                
                return (
                  <g key={index}>
                    {/* City circle */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isHovered ? 2.5 : 1.8}
                      fill={color}
                      stroke="white"
                      strokeWidth={isHovered ? 0.4 : 0.2}
                      style={{
                        filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                    />
                    
                    {/* City label (show on hover) */}
                    {isHovered && (
                      <g>
                        <rect
                          x={city.x + 2}
                          y={city.y - 4}
                          width="20"
                          height="6"
                          fill="rgba(15, 23, 42, 0.95)"
                          stroke={color}
                          strokeWidth="0.3"
                          rx="1"
                        />
                        <text
                          x={city.x + 12}
                          y={city.y - 0.5}
                          fill="white"
                          fontSize="2.5"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {city.name}
                        </text>
                        <text
                          x={city.x + 12}
                          y={city.y + 2}
                          fill={color}
                          fontSize="2"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          ${city.premium.toLocaleString()}/yr
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}
            </svg>

            {/* Hover Info Panel */}
            {hoveredCity && (
              <div
                className="absolute bg-slate-900/95 backdrop-blur-md border-2 border-purple-500/50 rounded-xl p-6 shadow-2xl"
                style={{
                  top: `${(hoveredCity.y / 100) * 600}px`,
                  left: `${(hoveredCity.x / 100) * 100}%`,
                  transform: 'translate(-50%, -100%)',
                  marginTop: '-20px',
                  minWidth: '250px',
                  zIndex: 1000,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">📍</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{hoveredCity.name}</h3>
                    <p className="text-purple-300 text-sm">{hoveredCity.region}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg p-4 border border-purple-400/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-200 text-sm mb-1">Average Annual Premium</p>
                      <p className="text-3xl font-bold text-white">
                        ${hoveredCity.premium.toLocaleString()}
                      </p>
                      <p className="text-purple-300 text-xs mt-1">per year</p>
                    </div>
                    <div className="text-4xl">
                      {hoveredCity.premium <= 2200 ? '🟢' : hoveredCity.premium <= 2800 ? '🟡' : '🔴'}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-500/30">
                  <p className="text-purple-200 text-xs">
                    💡 Premiums vary based on location, driving history, and coverage level
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* City List */}
        <div className="mt-12 bg-slate-900/80 backdrop-blur-md border border-purple-500/30 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🏙️</span> All Ontario Cities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities
              .sort((a, b) => a.premium - b.premium)
              .map((city, index) => {
                const color = getColor(city.premium)
                return (
                  <div
                    key={index}
                    className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-4 hover:border-purple-400/50 transition cursor-pointer"
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{city.name}</h3>
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>
                    <p className="text-purple-300 text-sm mb-1">{city.region}</p>
                    <p className="text-xl font-bold text-white">
                      ${city.premium.toLocaleString()}
                      <span className="text-sm text-purple-300 font-normal">/year</span>
                    </p>
                  </div>
                )
              })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Link
            href="/quote/personal-info?type=auto"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-purple-500 hover:to-blue-500 transition shadow-lg hover:shadow-2xl hover:shadow-purple-500/50"
          >
            🚀 Get Your Auto Insurance Quote
          </Link>
        </div>
      </div>
    </div>
  )
}
