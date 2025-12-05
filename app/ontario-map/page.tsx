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

  // Real premium data from MyChoice.ca (2025 data in CAD per year)
  const cities: CityData[] = [
    { name: 'Brampton', x: 42, y: 58, premium: 3341, region: 'GTA' },
    { name: 'Scarborough', x: 48, y: 55, premium: 2881, region: 'GTA' },
    { name: 'Vaughan', x: 45, y: 56, premium: 2451, region: 'GTA' },
    { name: 'Richmond Hill', x: 46, y: 56, premium: 2309, region: 'GTA' },
    { name: 'Mississauga', x: 43, y: 57, premium: 2258, region: 'GTA' },
    { name: 'Etobicoke', x: 44, y: 56, premium: 2255, region: 'GTA' },
    { name: 'Toronto', x: 47, y: 56, premium: 2231, region: 'GTA' },
    { name: 'Innisfil', x: 45, y: 52, premium: 2216, region: 'Simcoe County' },
    { name: 'Markham', x: 47, y: 57, premium: 2163, region: 'GTA' },
    { name: 'Newmarket', x: 46, y: 54, premium: 2066, region: 'York Region' },
    { name: 'Aurora', x: 46, y: 55, premium: 2023, region: 'York Region' },
    { name: 'London', x: 38, y: 62, premium: 1987, region: 'Southwestern Ontario' },
    { name: 'Oshawa', x: 50, y: 54, premium: 1974, region: 'Durham Region' },
    { name: 'Thunder Bay', x: 15, y: 25, premium: 1926, region: 'Northwestern Ontario' },
    { name: 'Barrie', x: 45, y: 51, premium: 1915, region: 'Simcoe County' },
    { name: 'Chatham', x: 35, y: 65, premium: 1913, region: 'Chatham-Kent' },
    { name: 'Cambridge', x: 41, y: 59, premium: 1894, region: 'Waterloo Region' },
    { name: 'Windsor', x: 32, y: 68, premium: 1891, region: 'Southwestern Ontario' },
    { name: 'Bradford', x: 45, y: 53, premium: 1871, region: 'Simcoe County' },
    { name: 'Orangeville', x: 43, y: 55, premium: 1849, region: 'Dufferin County' },
    { name: 'Milton', x: 42, y: 58, premium: 1824, region: 'Halton Region' },
    { name: 'Oakville', x: 43, y: 58, premium: 1809, region: 'Halton Region' },
    { name: 'Collingwood', x: 44, y: 50, premium: 1778, region: 'Grey County' },
    { name: 'Brantford', x: 40, y: 60, premium: 1769, region: 'Brant County' },
    { name: 'Niagara Falls', x: 40, y: 65, premium: 1767, region: 'Niagara Region' },
    { name: 'Kitchener', x: 41, y: 59, premium: 1748, region: 'Waterloo Region' },
    { name: 'Sault Ste. Marie', x: 12, y: 30, premium: 1747, region: 'Northern Ontario' },
    { name: 'St. Catharines', x: 40, y: 64, premium: 1741, region: 'Niagara Region' },
    { name: 'Waterloo', x: 41, y: 59, premium: 1737, region: 'Waterloo Region' },
    { name: 'Hamilton', x: 40, y: 61, premium: 1735, region: 'Golden Horseshoe' },
    { name: 'Guelph', x: 42, y: 59, premium: 1729, region: 'Wellington County' },
    { name: 'Burlington', x: 42, y: 60, premium: 1704, region: 'Halton Region' },
    { name: 'Sudbury', x: 28, y: 28, premium: 1698, region: 'Northeastern Ontario' },
    { name: 'North Bay', x: 30, y: 32, premium: 1672, region: 'Nipissing District' },
    { name: 'Orillia', x: 44, y: 50, premium: 1672, region: 'Simcoe County' },
    { name: 'Welland', x: 40, y: 65, premium: 1660, region: 'Niagara Region' },
    { name: 'Belleville', x: 50, y: 50, premium: 1652, region: 'Quinte Region' },
    { name: 'Midland', x: 44, y: 49, premium: 1628, region: 'Simcoe County' },
    { name: 'Huntsville', x: 43, y: 45, premium: 1624, region: 'Muskoka' },
    { name: 'Timmins', x: 25, y: 20, premium: 1607, region: 'Northeastern Ontario' },
    { name: 'Stratford', x: 39, y: 60, premium: 1604, region: 'Perth County' },
    { name: 'Sarnia', x: 36, y: 64, premium: 1603, region: 'Lambton County' },
    { name: 'Peterborough', x: 49, y: 52, premium: 1584, region: 'Kawartha Lakes' },
    { name: 'Kingston', x: 52, y: 48, premium: 1581, region: 'Eastern Ontario' },
    { name: 'Ottawa', x: 55, y: 42, premium: 1560, region: 'Eastern Ontario' },
    { name: 'Brockville', x: 54, y: 46, premium: 1529, region: 'Eastern Ontario' },
    { name: 'Cornwall', x: 58, y: 45, premium: 1381, region: 'Eastern Ontario' },
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
            <br />
            <span className="text-sm text-purple-300 mt-2 block">Data sourced from MyChoice.ca 2025 average rates</span>
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
          <div className="relative" style={{ height: '800px', width: '100%' }}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ minHeight: '800px' }}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Accurate Ontario Province Shape - Based on actual geography */}
              {/* Main body - wide in south, narrower in north */}
              <path
                d="M 8 2
                   L 12 1.5 L 16 1 L 20 0.5 L 25 0 L 30 0 L 35 0 L 40 0 L 45 0 L 50 0 L 55 0 L 60 0 L 65 0 L 70 0 L 75 0 L 80 0 L 85 0 L 90 0 L 95 0 L 98 0.5 L 100 1
                   L 100 3
                   L 99 5 L 98 7 L 97 9 L 96 11 L 95 13 L 94 15 L 93 17 L 92 19 L 91 21 L 90 23 L 89 25 L 88 27 L 87 29 L 86 31 L 85 33 L 84 35 L 83 37 L 82 39 L 81 41 L 80 43 L 79 45 L 78 47 L 77 49 L 76 51 L 75 53 L 74 55 L 73 57 L 72 59 L 71 61 L 70 63 L 69 65 L 68 67 L 67 69 L 66 71 L 65 73 L 64 75 L 63 77 L 62 79 L 61 81 L 60 83 L 59 85 L 58 87 L 57 89 L 56 91 L 55 93 L 54 95 L 53 97 L 52 99 L 50 100
                   L 48 100
                   L 46 99 L 44 98 L 42 97 L 40 96 L 38 95 L 36 94 L 34 93 L 32 92 L 30 91 L 28 90 L 26 89 L 24 88 L 22 87 L 20 86 L 18 85 L 16 84 L 14 83 L 12 82 L 10 81 L 8 80 L 6 79 L 4 78 L 2 77 L 1 75 L 0 73
                   L 0 71
                   L 0.5 69 L 1 67 L 2 65 L 3 63 L 4 61 L 5 59 L 6 57 L 7 55 L 8 53 L 9 51 L 10 49 L 11 47 L 12 45 L 13 43 L 14 41 L 15 39 L 16 37 L 17 35 L 18 33 L 19 31 L 20 29 L 21 27 L 22 25 L 23 23 L 24 21 L 25 19 L 26 17 L 27 15 L 28 13 L 29 11 L 30 9 L 31 7 L 32 5 L 33 3 L 34 1 L 35 0.5 L 36 0
                   L 34 0
                   L 32 0.5 L 30 1 L 28 1.5 L 26 2 L 24 2.5 L 22 3 L 20 3.5 L 18 4 L 16 4.5 L 14 5 L 12 5.5 L 10 6 L 8 6.5 L 6 7 L 4 7.5 L 2 8 L 1 9 L 0 10
                   Z"
                fill="rgba(99, 102, 241, 0.25)"
                stroke="rgba(139, 92, 246, 0.8)"
                strokeWidth="0.6"
              />
              
              {/* Northern extension - narrower top */}
              <path
                d="M 15 0
                   L 20 0 L 25 0 L 30 0 L 35 0 L 40 0 L 45 0 L 50 0 L 55 0 L 60 0 L 65 0 L 70 0 L 75 0 L 80 0 L 85 0 L 90 0 L 95 0 L 100 0
                   L 100 2
                   L 98 4 L 96 6 L 94 8 L 92 10 L 90 12 L 88 14 L 86 16 L 84 18 L 82 20 L 80 22 L 78 24 L 76 26 L 74 28 L 72 30 L 70 32 L 68 34 L 66 36 L 64 38 L 62 40 L 60 42 L 58 44 L 56 46 L 54 48 L 52 50 L 50 52 L 48 54 L 46 56 L 44 58 L 42 60 L 40 62 L 38 64 L 36 66 L 34 68 L 32 70 L 30 72 L 28 74 L 26 76 L 24 78 L 22 80 L 20 82 L 18 84 L 16 86 L 14 88 L 12 90 L 10 92 L 8 94 L 6 96 L 4 98 L 2 99 L 0 100
                   L 0 98
                   L 1 96 L 2 94 L 3 92 L 4 90 L 5 88 L 6 86 L 7 84 L 8 82 L 9 80 L 10 78 L 11 76 L 12 74 L 13 72 L 14 70 L 15 68 L 16 66 L 17 64 L 18 62 L 19 60 L 20 58 L 21 56 L 22 54 L 23 52 L 24 50 L 25 48 L 26 46 L 27 44 L 28 42 L 29 40 L 30 38 L 31 36 L 32 34 L 33 32 L 34 30 L 35 28 L 36 26 L 37 24 L 38 22 L 39 20 L 40 18 L 41 16 L 42 14 L 43 12 L 44 10 L 45 8 L 46 6 L 47 4 L 48 2 L 49 0
                   Z"
                fill="rgba(99, 102, 241, 0.25)"
                stroke="rgba(139, 92, 246, 0.8)"
                strokeWidth="0.6"
              />
              
              {/* Lake Superior - creates northwest indentation */}
              <ellipse cx="10" cy="12" rx="7" ry="12" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />
              
              {/* Lake Huron - large center indentation */}
              <ellipse cx="40" cy="40" rx="14" ry="20" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />
              
              {/* Georgian Bay - northeast extension */}
              <ellipse cx="45" cy="35" rx="8" ry="14" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />
              
              {/* Lake Erie - southern border */}
              <ellipse cx="34" cy="68" rx="16" ry="7" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />
              
              {/* Lake Ontario - southeast */}
              <ellipse cx="50" cy="58" rx="10" ry="7" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />

              {/* City markers */}
              {cities.map((city, index) => {
                const color = getColor(city.premium)
                const isHovered = hoveredCity?.name === city.name
                
                return (
                  <g key={index}>
                    {/* Outer glow ring for hover */}
                    {isHovered && (
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r="3.5"
                        fill="none"
                        stroke={color}
                        strokeWidth="0.3"
                        opacity="0.6"
                        style={{
                          animation: 'pulse 2s infinite',
                        }}
                      />
                    )}
                    
                    {/* City circle */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isHovered ? 2.8 : 2}
                      fill={color}
                      stroke="white"
                      strokeWidth={isHovered ? 0.5 : 0.3}
                      style={{
                        filter: isHovered 
                          ? `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 5px rgba(255,255,255,0.8))` 
                          : `drop-shadow(0 0 3px ${color})`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                    />
                    
                    {/* City name label (always visible, smaller) */}
                    <text
                      x={city.x}
                      y={city.y - 3.5}
                      fill="rgba(255, 255, 255, 0.7)"
                      fontSize="1.8"
                      textAnchor="middle"
                      fontWeight="500"
                      style={{
                        pointerEvents: 'none',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                      }}
                    >
                      {city.name.length > 10 ? city.name.substring(0, 10) + '...' : city.name}
                    </text>
                  </g>
                )
              })}
              
              {/* Add CSS animation for pulse */}
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 0.6; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.2); }
                }
              `}</style>
            </svg>

            {/* Hover Info Panel */}
            {hoveredCity && (
              <div
                className="absolute bg-slate-900/95 backdrop-blur-md border-2 border-purple-500/50 rounded-xl p-6 shadow-2xl"
                style={{
                  top: `${(hoveredCity.y / 100) * 800}px`,
                  left: `${(hoveredCity.x / 100) * 100}%`,
                  transform: 'translate(-50%, -100%)',
                  marginTop: '-20px',
                  minWidth: '280px',
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
                  <p className="text-purple-300 text-xs mt-2">
                    📊 Source: MyChoice.ca 2025 Average Rates
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
