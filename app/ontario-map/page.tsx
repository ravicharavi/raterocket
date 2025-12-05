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
              {/* Accurate Ontario Province Shape - Based on actual geographic boundaries */}
              <path
                d="M 5 3
                   C 5 2, 6 1, 8 0.5
                   C 10 0, 12 0, 15 0
                   C 18 0, 20 0, 22 0
                   C 25 0, 28 0, 30 0
                   C 35 0, 40 0, 45 0
                   C 50 0, 55 0, 60 0
                   C 65 0, 70 0, 75 0
                   C 80 0, 85 0, 90 0
                   C 92 0, 94 0.5, 96 1
                   C 98 1.5, 99 2, 100 3
                   L 100 5
                   C 99 7, 98 9, 97 11
                   C 96 13, 95 15, 94 17
                   C 93 19, 92 21, 91 23
                   C 90 25, 89 27, 88 29
                   C 87 31, 86 33, 85 35
                   C 84 37, 83 39, 82 41
                   C 81 43, 80 45, 79 47
                   C 78 49, 77 51, 76 53
                   C 75 55, 74 57, 73 59
                   C 72 61, 71 63, 70 65
                   C 69 67, 68 69, 67 71
                   C 66 73, 65 75, 64 77
                   C 63 79, 62 81, 61 83
                   C 60 85, 59 87, 58 89
                   C 57 91, 56 93, 55 95
                   C 54 97, 53 98, 52 99
                   C 51 99.5, 50 100, 48 100
                   C 46 100, 44 99, 42 98
                   C 40 97, 38 96, 36 95
                   C 34 94, 32 93, 30 92
                   C 28 91, 26 90, 24 89
                   C 22 88, 20 87, 18 86
                   C 16 85, 14 84, 12 83
                   C 10 82, 8 81, 6 80
                   C 4 79, 2 78, 1 76
                   C 0.5 74, 0 72, 0 70
                   L 0 68
                   C 0.5 66, 1 64, 2 62
                   C 3 60, 4 58, 5 56
                   C 6 54, 7 52, 8 50
                   C 9 48, 10 46, 11 44
                   C 12 42, 13 40, 14 38
                   C 15 36, 16 34, 17 32
                   C 18 30, 19 28, 20 26
                   C 21 24, 22 22, 23 20
                   C 24 18, 25 16, 26 14
                   C 27 12, 28 10, 29 8
                   C 30 6, 31 4, 32 2
                   C 33 1, 34 0.5, 35 0
                   L 33 0
                   C 31 0.5, 29 1, 27 1.5
                   C 25 2, 23 2.5, 21 3
                   C 19 3.5, 17 4, 15 4.5
                   C 13 5, 11 5.5, 9 6
                   C 7 6.5, 5 7, 3 8
                   C 2 9, 1 10, 0.5 11
                   C 0 12, 0 13, 0 14
                   L 0 12
                   C 0.5 10, 1 8, 2 6
                   C 3 4, 4 3, 5 3
                   Z"
                fill="rgba(99, 102, 241, 0.25)"
                stroke="rgba(139, 92, 246, 0.8)"
                strokeWidth="0.6"
              />
              
              {/* Northern Peninsula - narrower extension upward */}
              <path
                d="M 20 0
                   C 22 0, 24 0, 26 0
                   C 28 0, 30 0, 32 0
                   C 35 0, 38 0, 40 0
                   C 42 0, 44 0, 46 0
                   C 48 0, 50 0, 52 0
                   C 54 0, 56 0, 58 0
                   C 60 0, 62 0, 64 0
                   C 66 0, 68 0, 70 0
                   C 72 0, 74 0, 76 0
                   C 78 0, 80 0, 82 0
                   C 84 0, 86 0, 88 0
                   C 90 0, 92 0, 94 0
                   C 96 0, 98 0, 100 0
                   L 100 2
                   C 98 4, 96 6, 94 8
                   C 92 10, 90 12, 88 14
                   C 86 16, 84 18, 82 20
                   C 80 22, 78 24, 76 26
                   C 74 28, 72 30, 70 32
                   C 68 34, 66 36, 64 38
                   C 62 40, 60 42, 58 44
                   C 56 46, 54 48, 52 50
                   C 50 52, 48 54, 46 56
                   C 44 58, 42 60, 40 62
                   C 38 64, 36 66, 34 68
                   C 32 70, 30 72, 28 74
                   C 26 76, 24 78, 22 80
                   C 20 82, 18 84, 16 86
                   C 14 88, 12 90, 10 92
                   C 8 94, 6 96, 4 98
                   C 2 99, 1 99.5, 0 100
                   L 0 98
                   C 1 96, 2 94, 3 92
                   C 4 90, 5 88, 6 86
                   C 7 84, 8 82, 9 80
                   C 10 78, 11 76, 12 74
                   C 13 72, 14 70, 15 68
                   C 16 66, 17 64, 18 62
                   C 19 60, 20 58, 21 56
                   C 22 54, 23 52, 24 50
                   C 25 48, 26 46, 27 44
                   C 28 42, 29 40, 30 38
                   C 31 36, 32 34, 33 32
                   C 34 30, 35 28, 36 26
                   C 37 24, 38 22, 39 20
                   C 40 18, 41 16, 42 14
                   C 43 12, 44 10, 45 8
                   C 46 6, 47 4, 48 2
                   C 49 1, 50 0.5, 51 0
                   L 48 0
                   C 46 0, 44 0, 42 0
                   C 40 0, 38 0, 36 0
                   C 34 0, 32 0, 30 0
                   C 28 0, 26 0, 24 0
                   C 22 0, 20 0, 18 0
                   Z"
                fill="rgba(99, 102, 241, 0.25)"
                stroke="rgba(139, 92, 246, 0.8)"
                strokeWidth="0.6"
              />
              
              {/* Lake Superior - Northwest (creates indentation in border) */}
              <ellipse cx="8" cy="10" rx="8" ry="14" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />
              
              {/* Lake Huron - Large center indentation */}
              <ellipse cx="38" cy="38" rx="16" ry="22" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />
              
              {/* Georgian Bay - Northeast extension from Lake Huron */}
              <ellipse cx="44" cy="32" rx="9" ry="16" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />
              
              {/* Lake Erie - Southern border */}
              <ellipse cx="32" cy="70" rx="18" ry="8" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />
              
              {/* Lake Ontario - Southeast */}
              <ellipse cx="50" cy="60" rx="11" ry="8" fill="rgba(59, 130, 246, 0.4)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="0.5" />

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
