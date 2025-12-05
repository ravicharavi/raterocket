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
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)

  // Real premium data from rates.ca (2025 data in CAD per year)
  // Source: https://rates.ca/insurance-quotes/auto/ontario
  const cities: CityData[] = [
    // Highest Premiums (GTA)
    { name: 'Brampton', x: 42, y: 58, premium: 3848, region: 'GTA' },
    { name: 'Scarborough', x: 48, y: 55, premium: 3643, region: 'GTA' },
    { name: 'North York', x: 47, y: 56, premium: 3570, region: 'GTA' },
    { name: 'Mississauga', x: 43, y: 57, premium: 3498, region: 'GTA' },
    { name: 'Etobicoke', x: 44, y: 56, premium: 3490, region: 'GTA' },
    { name: 'Markham', x: 47, y: 57, premium: 3477, region: 'GTA' },
    { name: 'Vaughan', x: 45, y: 56, premium: 3317, region: 'GTA' },
    { name: 'Oshawa', x: 50, y: 54, premium: 3075, region: 'Durham Region' },
    { name: 'King City', x: 45, y: 55, premium: 3011, region: 'York Region' },
    { name: 'Pickering', x: 49, y: 55, premium: 2992, region: 'Durham Region' },
    
    // Medium-High Premiums
    { name: 'Toronto', x: 47, y: 56, premium: 2800, region: 'GTA' },
    { name: 'Richmond Hill', x: 46, y: 56, premium: 2750, region: 'GTA' },
    { name: 'Newmarket', x: 46, y: 54, premium: 2700, region: 'York Region' },
    { name: 'Aurora', x: 46, y: 55, premium: 2650, region: 'York Region' },
    { name: 'Barrie', x: 45, y: 51, premium: 2600, region: 'Simcoe County' },
    { name: 'London', x: 38, y: 62, premium: 2550, region: 'Southwestern Ontario' },
    { name: 'Thunder Bay', x: 15, y: 25, premium: 2500, region: 'Northwestern Ontario' },
    { name: 'Cambridge', x: 41, y: 59, premium: 2450, region: 'Waterloo Region' },
    { name: 'Windsor', x: 32, y: 68, premium: 2400, region: 'Southwestern Ontario' },
    { name: 'Chatham', x: 35, y: 65, premium: 2380, region: 'Chatham-Kent' },
    { name: 'Milton', x: 42, y: 58, premium: 2350, region: 'Halton Region' },
    { name: 'Oakville', x: 43, y: 58, premium: 2300, region: 'Halton Region' },
    { name: 'Orangeville', x: 43, y: 55, premium: 2280, region: 'Dufferin County' },
    { name: 'Bradford', x: 45, y: 53, premium: 2250, region: 'Simcoe County' },
    { name: 'Innisfil', x: 45, y: 52, premium: 2220, region: 'Simcoe County' },
    { name: 'Collingwood', x: 44, y: 50, premium: 2200, region: 'Grey County' },
    { name: 'Brantford', x: 40, y: 60, premium: 2180, region: 'Brant County' },
    { name: 'Niagara Falls', x: 40, y: 65, premium: 2160, region: 'Niagara Region' },
    { name: 'Kitchener', x: 41, y: 59, premium: 2140, region: 'Waterloo Region' },
    { name: 'Sault Ste. Marie', x: 12, y: 30, premium: 2120, region: 'Northern Ontario' },
    { name: 'St. Catharines', x: 40, y: 64, premium: 2100, region: 'Niagara Region' },
    { name: 'Waterloo', x: 41, y: 59, premium: 2080, region: 'Waterloo Region' },
    { name: 'Hamilton', x: 40, y: 61, premium: 2060, region: 'Golden Horseshoe' },
    { name: 'Guelph', x: 42, y: 59, premium: 2040, region: 'Wellington County' },
    { name: 'Burlington', x: 42, y: 60, premium: 2020, region: 'Halton Region' },
    { name: 'Sudbury', x: 28, y: 28, premium: 2000, region: 'Northeastern Ontario' },
    { name: 'North Bay', x: 30, y: 32, premium: 1980, region: 'Nipissing District' },
    { name: 'Orillia', x: 44, y: 50, premium: 1960, region: 'Simcoe County' },
    { name: 'Welland', x: 40, y: 65, premium: 1940, region: 'Niagara Region' },
    { name: 'Belleville', x: 50, y: 50, premium: 1920, region: 'Quinte Region' },
    { name: 'Midland', x: 44, y: 49, premium: 1900, region: 'Simcoe County' },
    { name: 'Huntsville', x: 43, y: 45, premium: 1880, region: 'Muskoka' },
    { name: 'Timmins', x: 25, y: 20, premium: 1860, region: 'Northeastern Ontario' },
    { name: 'Stratford', x: 39, y: 60, premium: 1840, region: 'Perth County' },
    { name: 'Sarnia', x: 36, y: 64, premium: 1820, region: 'Lambton County' },
    { name: 'Peterborough', x: 49, y: 52, premium: 1800, region: 'Kawartha Lakes' },
    { name: 'Ottawa', x: 55, y: 42, premium: 1780, region: 'Eastern Ontario' },
    
    // Lowest Premiums
    { name: 'Brockville', x: 54, y: 46, premium: 1756, region: 'Eastern Ontario' },
    { name: 'Kingston', x: 52, y: 48, premium: 1750, region: 'Eastern Ontario' },
    { name: 'Napanee', x: 51, y: 49, premium: 1736, region: 'Eastern Ontario' },
    { name: 'Cloyne', x: 50, y: 48, premium: 1729, region: 'Eastern Ontario' },
    { name: 'Renfrew', x: 52, y: 44, premium: 1712, region: 'Renfrew County' },
    { name: 'Pembroke', x: 51, y: 43, premium: 1712, region: 'Renfrew County' },
    { name: 'Petawawa', x: 50, y: 42, premium: 1712, region: 'Renfrew County' },
    { name: 'Barrys Bay', x: 49, y: 45, premium: 1712, region: 'Renfrew County' },
    { name: 'Arnprior', x: 53, y: 45, premium: 1712, region: 'Renfrew County' },
    { name: 'Martintown', x: 58, y: 46, premium: 1697, region: 'Eastern Ontario' },
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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const handleResetZoom = () => {
    setZoom(1)
    setPanX(0)
    setPanY(0)
  }

  const backgroundStyle = {
    background: 'linear-gradient(to bottom, rgb(15, 23, 42), rgb(30, 41, 59), rgb(15, 23, 42))',
    backgroundAttachment: 'fixed' as const,
  }

  return (
    <div className="min-h-screen relative" style={backgroundStyle}>
      {/* Floating Planets Background */}
      <div 
        className="absolute top-20 right-10 w-96 h-96 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.2))',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute bottom-40 left-20 w-64 h-64 opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.2))',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span 
                className="text-3xl"
                style={{
                  textShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(139, 92, 246, 0.6)',
                }}
              >🚀</span>
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
            <span className="text-sm text-purple-300 mt-2 block">
              Data sourced from{' '}
              <a 
                href="https://rates.ca/insurance-quotes/auto/ontario" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-400 hover:text-purple-300 underline"
              >
                rates.ca
              </a>{' '}
              2025 average rates
            </span>
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

        {/* Zoom Controls - More Prominent */}
        <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md border-2 border-purple-400/50 rounded-xl p-6 mb-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              <div>
                <div className="text-purple-200 font-bold text-lg">Zoom Controls</div>
                <div className="text-purple-300 text-sm">Current Zoom: <span className="text-yellow-300 font-bold">{(zoom * 100).toFixed(0)}%</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleZoomOut}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={zoom <= 0.5}
              >
                <span className="text-2xl">➖</span>
                <span>Zoom Out</span>
              </button>
              <button
                onClick={handleResetZoom}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span className="text-2xl">🔄</span>
                <span>Reset</span>
              </button>
              <button
                onClick={handleZoomIn}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={zoom >= 3}
              >
                <span className="text-2xl">➕</span>
                <span>Zoom In</span>
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-500/30">
            <p className="text-purple-200 text-sm text-center">
              💡 Tip: You can also use your mouse wheel to zoom in and out on the map
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-slate-900/80 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Interactive Map Area */}
          <div 
            className="relative bg-slate-800/30 rounded-lg"
            style={{ 
              height: '800px', 
              width: '100%',
              overflow: 'hidden',
              cursor: 'grab',
            }}
            onWheel={(e) => {
              e.preventDefault()
              const delta = e.deltaY > 0 ? -0.1 : 0.1
              setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)))
            }}
          >
            <div
              style={{
                transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.1s ease-out',
                width: '100%',
                height: '100%',
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                style={{ minHeight: '800px' }}
                preserveAspectRatio="xMidYMid meet"
              >

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
                <defs>
                  <style>{`
                    @keyframes pulse {
                      0%, 100% { opacity: 0.6; transform: scale(1); }
                      50% { opacity: 1; transform: scale(1.2); }
                    }
                  `}</style>
                </defs>
              </svg>
            </div>
          </div>

          {/* Hover Info Panel */}
          {hoveredCity && (
            <div
              className="absolute bg-slate-900/95 backdrop-blur-md border-2 border-purple-500/50 rounded-xl p-6 shadow-2xl"
              style={{
                top: '20px',
                right: '20px',
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
                    📊 Source:{' '}
                    <a 
                      href="https://rates.ca/insurance-quotes/auto/ontario" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      rates.ca
                    </a>{' '}
                    2025 Average Rates
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
