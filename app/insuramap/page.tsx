'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

interface CityData {
  name: string
  lat: number
  lng: number
  homePremium: number
  climateRiskScore: number
  floodRisk: 'Low' | 'Medium' | 'High' | 'Very High'
  claimsHistory: 'Low' | 'Medium' | 'High'
  region: string
  factors: string[]
}

export default function InsuraMapPage() {
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null)
  const [viewMode, setViewMode] = useState<'premium' | 'climate'>('premium')

  // Home insurance data with actual coordinates for Ontario cities
  const cities: CityData[] = [
    { 
      name: 'Toronto', 
      lat: 43.6532, lng: -79.3832,
      homePremium: 1850, 
      climateRiskScore: 65,
      floodRisk: 'High',
      claimsHistory: 'High',
      region: 'GTA',
      factors: ['Urban density', 'Severe weather events', 'High claim frequency', 'Flood risk']
    },
    { 
      name: 'Mississauga', 
      lat: 43.5890, lng: -79.6441,
      homePremium: 1720, 
      climateRiskScore: 58,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'GTA',
      factors: ['Wind damage', 'Water damage claims', 'Urban area']
    },
    { 
      name: 'Brampton', 
      lat: 43.7315, lng: -79.7624,
      homePremium: 1680, 
      climateRiskScore: 55,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'GTA',
      factors: ['Basement flooding', 'Severe storms']
    },
    { 
      name: 'Ottawa', 
      lat: 45.4215, lng: -75.6972,
      homePremium: 1420, 
      climateRiskScore: 45,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Eastern Ontario',
      factors: ['Lower risk area', 'Stable climate']
    },
    { 
      name: 'Hamilton', 
      lat: 43.2557, lng: -79.8711,
      homePremium: 1580, 
      climateRiskScore: 52,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Golden Horseshoe',
      factors: ['Lake effect weather', 'Wind damage']
    },
    { 
      name: 'London', 
      lat: 42.9849, lng: -81.2453,
      homePremium: 1350, 
      climateRiskScore: 42,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Southwestern Ontario',
      factors: ['Lower risk', 'Fewer severe events']
    },
    { 
      name: 'Windsor', 
      lat: 42.3149, lng: -83.0369,
      homePremium: 1520, 
      climateRiskScore: 48,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Southwestern Ontario',
      factors: ['Severe storms', 'Wind damage']
    },
    { 
      name: 'Kingston', 
      lat: 44.2312, lng: -76.4860,
      homePremium: 1380, 
      climateRiskScore: 40,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Eastern Ontario',
      factors: ['Lower risk area']
    },
    { 
      name: 'Thunder Bay', 
      lat: 48.3809, lng: -89.2477,
      homePremium: 1280, 
      climateRiskScore: 35,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Northwestern Ontario',
      factors: ['Low risk', 'Stable climate']
    },
    { 
      name: 'Sudbury', 
      lat: 46.4927, lng: -80.9940,
      homePremium: 1320, 
      climateRiskScore: 38,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Northeastern Ontario',
      factors: ['Lower risk']
    },
    { 
      name: 'Barrie', 
      lat: 44.3894, lng: -79.6903,
      homePremium: 1620, 
      climateRiskScore: 50,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Simcoe County',
      factors: ['Lake effect', 'Severe weather']
    },
    { 
      name: 'Oshawa', 
      lat: 43.8971, lng: -78.8658,
      homePremium: 1750, 
      climateRiskScore: 60,
      floodRisk: 'High',
      claimsHistory: 'High',
      region: 'Durham Region',
      factors: ['High flood risk', 'Severe storms', 'High claims']
    },
    { 
      name: 'Burlington', 
      lat: 43.3255, lng: -79.7990,
      homePremium: 1650, 
      climateRiskScore: 54,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Halton Region',
      factors: ['Lake effect', 'Wind damage']
    },
    { 
      name: 'Kitchener', 
      lat: 43.4516, lng: -80.4925,
      homePremium: 1480, 
      climateRiskScore: 46,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Waterloo Region',
      factors: ['Moderate risk']
    },
    { 
      name: 'Cambridge', 
      lat: 43.3616, lng: -80.3144,
      homePremium: 1450, 
      climateRiskScore: 44,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Waterloo Region',
      factors: ['Lower risk']
    },
    { 
      name: 'Guelph', 
      lat: 43.5448, lng: -80.2482,
      homePremium: 1400, 
      climateRiskScore: 41,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Wellington County',
      factors: ['Lower risk area']
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
        return '#22c55e' // green
      } else if (ratio < 0.66) {
        return '#eab308' // yellow
      } else {
        return '#ef4444' // red
      }
    } else {
      const ratio = (city.climateRiskScore - minClimate) / climateRange
      if (ratio < 0.33) {
        return '#22c55e' // green
      } else if (ratio < 0.66) {
        return '#eab308' // yellow
      } else {
        return '#ef4444' // red
      }
    }
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

  // Create custom icon for markers
  const createCustomIcon = (color: string) => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet')
      return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })
    }
    return null
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

        {/* Map Container */}
        <div className="bg-slate-800 rounded-xl p-4 mb-8 overflow-hidden">
          <div style={{ height: '600px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            {typeof window !== 'undefined' && (
              <MapContainer
                center={[44.0, -79.5]}
                zoom={6}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city, index) => {
                  const color = getColor(city)
                  const icon = createCustomIcon(color)
                  
                  return (
                    <Marker
                      key={index}
                      position={[city.lat, city.lng]}
                      icon={icon}
                      eventHandlers={{
                        mouseover: () => setHoveredCity(city),
                        mouseout: () => setHoveredCity(null),
                      }}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h3 className="font-bold text-lg mb-2">{city.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{city.region}</p>
                          <div className="space-y-1 text-sm">
                            <p><strong>Premium:</strong> ${city.homePremium.toLocaleString()}/year</p>
                            <p><strong>Climate Risk:</strong> {city.climateRiskScore}/100</p>
                            <p><strong>Flood Risk:</strong> {city.floodRisk}</p>
                            <p><strong>Claims:</strong> {city.claimsHistory}</p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )
                })}
              </MapContainer>
            )}
          </div>
        </div>

        {/* Detailed Info Panel */}
        {hoveredCity && (
          <div className="bg-slate-800 rounded-xl p-6 mb-8 border-2 border-purple-500">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏠</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{hoveredCity.name}</h3>
                <p className="text-purple-300 text-sm">{hoveredCity.region}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Premium */}
              <div className="bg-purple-600/20 rounded-lg p-4 border border-purple-500/30">
                <p className="text-purple-200 text-sm mb-1">Average Annual Premium</p>
                <p className="text-3xl font-bold text-white">
                  ${hoveredCity.homePremium.toLocaleString()}
                </p>
                <p className="text-purple-300 text-xs mt-1">per year</p>
              </div>

              {/* Climate Risk Score */}
              <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-500/30">
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
            </div>

            {/* Risk Factors */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-purple-200 text-sm">Flood Risk:</span>
                <span className={`ml-2 font-semibold ${getRiskColor(hoveredCity.floodRisk)}`}>
                  {hoveredCity.floodRisk}
                </span>
              </div>
              <div>
                <span className="text-purple-200 text-sm">Claims History:</span>
                <span className={`ml-2 font-semibold ${getRiskColor(hoveredCity.claimsHistory)}`}>
                  {hoveredCity.claimsHistory}
                </span>
              </div>
            </div>

            {/* Key Factors */}
            <div className="border-t border-purple-500/30 pt-4">
              <p className="text-purple-200 text-sm font-semibold mb-2">Key Pricing Factors:</p>
              <ul className="space-y-1">
                {hoveredCity.factors.map((factor, idx) => (
                  <li key={idx} className="text-purple-300 text-sm flex items-center gap-2">
                    <span>•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* City List */}
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
