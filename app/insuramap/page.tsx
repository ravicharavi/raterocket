'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
) as any
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
) as any
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
) as any
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
) as any

// Import Leaflet CSS
// Import Leaflet CSS - only on client side
if (typeof window !== 'undefined') {
  require('leaflet/dist/leaflet.css')
}

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
  factorBreakdown: {
    location: number // percentage impact
    weather: number
    claims: number
    propertyValue: number
    infrastructure: number
  }
}

import DeploymentTimestamp from '@/components/DeploymentTimestamp'

export default function InsuraMapPage() {
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null)
  const [viewMode, setViewMode] = useState<'premium' | 'climate' | 'factors'>('premium')
  const [showInfo, setShowInfo] = useState(false)

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
      factors: ['Urban density', 'Severe weather events', 'High claim frequency', 'Flood risk'],
      factorBreakdown: {
        location: 25, // High property values, urban density
        weather: 30, // Severe storms, flooding
        claims: 25, // High frequency of claims
        propertyValue: 15, // Expensive homes
        infrastructure: 5 // Aging infrastructure
      }
    },
    { 
      name: 'Mississauga', 
      lat: 43.5890, lng: -79.6441,
      homePremium: 1720, 
      climateRiskScore: 58,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'GTA',
      factors: ['Wind damage', 'Water damage claims', 'Urban area'],
      factorBreakdown: {
        location: 20,
        weather: 25,
        claims: 20,
        propertyValue: 25,
        infrastructure: 10
      }
    },
    { 
      name: 'Brampton', 
      lat: 43.7315, lng: -79.7624,
      homePremium: 1680, 
      climateRiskScore: 55,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'GTA',
      factors: ['Basement flooding', 'Severe storms'],
      factorBreakdown: {
        location: 18,
        weather: 28,
        claims: 22,
        propertyValue: 22,
        infrastructure: 10
      }
    },
    { 
      name: 'Ottawa', 
      lat: 45.4215, lng: -75.6972,
      homePremium: 1420, 
      climateRiskScore: 45,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Eastern Ontario',
      factors: ['Lower risk area', 'Stable climate'],
      factorBreakdown: {
        location: 15,
        weather: 15,
        claims: 10,
        propertyValue: 35,
        infrastructure: 25
      }
    },
    { 
      name: 'Hamilton', 
      lat: 43.2557, lng: -79.8711,
      homePremium: 1580, 
      climateRiskScore: 52,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Golden Horseshoe',
      factors: ['Lake effect weather', 'Wind damage'],
      factorBreakdown: {
        location: 20,
        weather: 28,
        claims: 18,
        propertyValue: 20,
        infrastructure: 14
      }
    },
    { 
      name: 'London', 
      lat: 42.9849, lng: -81.2453,
      homePremium: 1350, 
      climateRiskScore: 42,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Southwestern Ontario',
      factors: ['Lower risk', 'Fewer severe events'],
      factorBreakdown: {
        location: 12,
        weather: 12,
        claims: 8,
        propertyValue: 40,
        infrastructure: 28
      }
    },
    { 
      name: 'Windsor', 
      lat: 42.3149, lng: -83.0369,
      homePremium: 1520, 
      climateRiskScore: 48,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Southwestern Ontario',
      factors: ['Severe storms', 'Wind damage'],
      factorBreakdown: {
        location: 18,
        weather: 26,
        claims: 16,
        propertyValue: 25,
        infrastructure: 15
      }
    },
    { 
      name: 'Kingston', 
      lat: 44.2312, lng: -76.4860,
      homePremium: 1380, 
      climateRiskScore: 40,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Eastern Ontario',
      factors: ['Lower risk area'],
      factorBreakdown: {
        location: 14,
        weather: 10,
        claims: 8,
        propertyValue: 38,
        infrastructure: 30
      }
    },
    { 
      name: 'Thunder Bay', 
      lat: 48.3809, lng: -89.2477,
      homePremium: 1280, 
      climateRiskScore: 35,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Northwestern Ontario',
      factors: ['Low risk', 'Stable climate'],
      factorBreakdown: {
        location: 10,
        weather: 8,
        claims: 5,
        propertyValue: 42,
        infrastructure: 35
      }
    },
    { 
      name: 'Sudbury', 
      lat: 46.4927, lng: -80.9940,
      homePremium: 1320, 
      climateRiskScore: 38,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Northeastern Ontario',
      factors: ['Lower risk'],
      factorBreakdown: {
        location: 11,
        weather: 9,
        claims: 6,
        propertyValue: 40,
        infrastructure: 34
      }
    },
    { 
      name: 'Barrie', 
      lat: 44.3894, lng: -79.6903,
      homePremium: 1620, 
      climateRiskScore: 50,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Simcoe County',
      factors: ['Lake effect', 'Severe weather'],
      factorBreakdown: {
        location: 19,
        weather: 27,
        claims: 19,
        propertyValue: 22,
        infrastructure: 13
      }
    },
    { 
      name: 'Oshawa', 
      lat: 43.8971, lng: -78.8658,
      homePremium: 1750, 
      climateRiskScore: 60,
      floodRisk: 'High',
      claimsHistory: 'High',
      region: 'Durham Region',
      factors: ['High flood risk', 'Severe storms', 'High claims'],
      factorBreakdown: {
        location: 22,
        weather: 32,
        claims: 24,
        propertyValue: 15,
        infrastructure: 7
      }
    },
    { 
      name: 'Burlington', 
      lat: 43.3255, lng: -79.7990,
      homePremium: 1650, 
      climateRiskScore: 54,
      floodRisk: 'Medium',
      claimsHistory: 'Medium',
      region: 'Halton Region',
      factors: ['Lake effect', 'Wind damage'],
      factorBreakdown: {
        location: 21,
        weather: 26,
        claims: 20,
        propertyValue: 23,
        infrastructure: 10
      }
    },
    { 
      name: 'Kitchener', 
      lat: 43.4516, lng: -80.4925,
      homePremium: 1480, 
      climateRiskScore: 46,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Waterloo Region',
      factors: ['Moderate risk'],
      factorBreakdown: {
        location: 16,
        weather: 18,
        claims: 12,
        propertyValue: 32,
        infrastructure: 22
      }
    },
    { 
      name: 'Cambridge', 
      lat: 43.3616, lng: -80.3144,
      homePremium: 1450, 
      climateRiskScore: 44,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Waterloo Region',
      factors: ['Lower risk'],
      factorBreakdown: {
        location: 15,
        weather: 17,
        claims: 11,
        propertyValue: 33,
        infrastructure: 24
      }
    },
    { 
      name: 'Guelph', 
      lat: 43.5448, lng: -80.2482,
      homePremium: 1400, 
      climateRiskScore: 41,
      floodRisk: 'Low',
      claimsHistory: 'Low',
      region: 'Wellington County',
      factors: ['Lower risk area'],
      factorBreakdown: {
        location: 14,
        weather: 16,
        claims: 10,
        propertyValue: 35,
        infrastructure: 25
      }
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

  // Get color based on premium, climate risk, or factors
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
    } else if (viewMode === 'climate') {
      const ratio = (city.climateRiskScore - minClimate) / climateRange
      if (ratio < 0.33) {
        return '#22c55e' // green
      } else if (ratio < 0.66) {
        return '#eab308' // yellow
      } else {
        return '#ef4444' // red
      }
    } else {
      // Factors view: color by total risk (weather + claims)
      const totalRisk = city.factorBreakdown.weather + city.factorBreakdown.claims
      const maxRisk = 60 // approximate max
      const ratio = totalRisk / maxRisk
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
              <Link href="/mortgage" className="text-purple-200 hover:text-purple-400">Mortgage</Link>
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
          <div className="mb-4">
            <DeploymentTimestamp />
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
          >
            {showInfo ? '📖 Hide' : '📖 Learn'} How Home Insurance is Calculated
          </button>
        </div>

        {/* Information Section */}
        {showInfo && (
          <div className="bg-slate-800 rounded-xl p-8 mb-8 border-2 border-purple-500/50">
            <h2 className="text-2xl font-bold text-white mb-4">📊 How Home Insurance Premiums Are Calculated</h2>
            <p className="text-purple-200 mb-6">
              Home insurance premiums in Ontario are determined by multiple factors that assess the risk of insuring your property. 
              Understanding these factors helps explain why premiums vary significantly across different cities and regions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-600/20 rounded-lg p-4 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">📍 Location & Geography</h3>
                <p className="text-purple-200 text-sm mb-2">
                  <strong>Impact: 10-25% of premium</strong>
                </p>
                <ul className="text-purple-300 text-sm space-y-1 list-disc list-inside">
                  <li>Proximity to water bodies (lakes, rivers)</li>
                  <li>Urban vs. rural areas</li>
                  <li>Neighborhood crime rates</li>
                  <li>Distance to fire stations</li>
                  <li>Regional climate patterns</li>
                </ul>
              </div>

              <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">🌦️ Weather & Climate Risk</h3>
                <p className="text-blue-200 text-sm mb-2">
                  <strong>Impact: 8-32% of premium</strong>
                </p>
                <ul className="text-blue-300 text-sm space-y-1 list-disc list-inside">
                  <li>Flood risk (overland, basement, sewer backup)</li>
                  <li>Severe weather frequency (storms, hail, wind)</li>
                  <li>Freeze-thaw cycles</li>
                  <li>Lake effect weather patterns</li>
                  <li>Historical weather event data</li>
                </ul>
              </div>

              <div className="bg-orange-600/20 rounded-lg p-4 border border-orange-500/30">
                <h3 className="text-lg font-semibold text-orange-300 mb-2">📈 Claims History</h3>
                <p className="text-orange-200 text-sm mb-2">
                  <strong>Impact: 5-25% of premium</strong>
                </p>
                <ul className="text-orange-300 text-sm space-y-1 list-disc list-inside">
                  <li>Frequency of claims in the area</li>
                  <li>Average claim amounts</li>
                  <li>Types of claims (water, fire, theft)</li>
                  <li>Regional claim trends</li>
                  <li>Insurance company loss ratios</li>
                </ul>
              </div>

              <div className="bg-green-600/20 rounded-lg p-4 border border-green-500/30">
                <h3 className="text-lg font-semibold text-green-300 mb-2">🏘️ Property Value & Characteristics</h3>
                <p className="text-green-200 text-sm mb-2">
                  <strong>Impact: 15-42% of premium</strong>
                </p>
                <ul className="text-green-300 text-sm space-y-1 list-disc list-inside">
                  <li>Home replacement cost</li>
                  <li>Age and condition of property</li>
                  <li>Construction materials</li>
                  <li>Square footage</li>
                  <li>Special features (pools, detached structures)</li>
                </ul>
              </div>

              <div className="bg-yellow-600/20 rounded-lg p-4 border border-yellow-500/30">
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">🔧 Infrastructure & Services</h3>
                <p className="text-yellow-200 text-sm mb-2">
                  <strong>Impact: 5-35% of premium</strong>
                </p>
                <ul className="text-yellow-300 text-sm space-y-1 list-disc list-inside">
                  <li>Age of municipal infrastructure</li>
                  <li>Quality of drainage systems</li>
                  <li>Emergency response times</li>
                  <li>Building code enforcement</li>
                  <li>Maintenance of public utilities</li>
                </ul>
              </div>

              <div className="bg-red-600/20 rounded-lg p-4 border border-red-500/30">
                <h3 className="text-lg font-semibold text-red-300 mb-2">⚖️ Additional Factors</h3>
                <p className="text-red-200 text-sm mb-2">
                  <strong>Other considerations:</strong>
                </p>
                <ul className="text-red-300 text-sm space-y-1 list-disc list-inside">
                  <li>Deductible choices</li>
                  <li>Coverage limits and options</li>
                  <li>Insurance company pricing models</li>
                  <li>Market competition</li>
                  <li>Regulatory requirements</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
              <p className="text-purple-200 text-sm">
                <strong>💡 Key Takeaway:</strong> Premiums are highest in areas with high weather risk, frequent claims, 
                expensive properties, and aging infrastructure. Cities like Toronto and Oshawa see higher premiums due to 
                urban density, severe weather events, and high claim frequencies. Rural areas and cities with stable climates 
                typically have lower premiums.
              </p>
            </div>
          </div>
        )}

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
              <button
                onClick={() => setViewMode('factors')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  viewMode === 'factors'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-purple-200 hover:bg-slate-600'
                }`}
              >
                🔍 Premium Factors
              </button>
            </div>
            <div className="text-purple-300 text-sm">
              {viewMode === 'premium' 
                ? '🟢 Low Premium → 🔴 High Premium'
                : viewMode === 'climate'
                ? '🟢 Low Risk → 🔴 High Risk'
                : '🟢 Low Risk Factors → 🔴 High Risk Factors'}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-slate-800 rounded-xl p-4 mb-8 overflow-hidden">
          <div style={{ height: '600px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            {typeof window !== 'undefined' && (
              <MapContainer
                center={[44.0, -79.5] as [number, number]}
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
                      position={[city.lat, city.lng] as [number, number]}
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
              <ul className="space-y-1 mb-4">
                {hoveredCity.factors.map((factor, idx) => (
                  <li key={idx} className="text-purple-300 text-sm flex items-center gap-2">
                    <span>•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>

              {/* Premium Breakdown */}
              <div className="mt-4 pt-4 border-t border-purple-500/30">
                <p className="text-purple-200 text-sm font-semibold mb-3">Premium Breakdown by Factor:</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-purple-300 text-sm">📍 Location & Geography</span>
                      <span className="text-purple-200 font-semibold">{hoveredCity.factorBreakdown.location}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${hoveredCity.factorBreakdown.location}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-purple-300 text-sm">🌦️ Weather & Climate Risk</span>
                      <span className="text-purple-200 font-semibold">{hoveredCity.factorBreakdown.weather}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${hoveredCity.factorBreakdown.weather}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-purple-300 text-sm">📈 Claims History</span>
                      <span className="text-purple-200 font-semibold">{hoveredCity.factorBreakdown.claims}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${hoveredCity.factorBreakdown.claims}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-purple-300 text-sm">🏘️ Property Value</span>
                      <span className="text-purple-200 font-semibold">{hoveredCity.factorBreakdown.propertyValue}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${hoveredCity.factorBreakdown.propertyValue}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-purple-300 text-sm">🔧 Infrastructure</span>
                      <span className="text-purple-200 font-semibold">{hoveredCity.factorBreakdown.infrastructure}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${hoveredCity.factorBreakdown.infrastructure}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
