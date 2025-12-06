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

// Import Leaflet CSS - only on client side
if (typeof window !== 'undefined') {
  require('leaflet/dist/leaflet.css')
}

interface CityData {
  name: string
  lat: number
  lng: number
  premium: number
  region: string
}

import DeploymentTimestamp from '@/components/DeploymentTimestamp'

export default function OntarioMapPage() {
  const [productsMenuOpen, setProductsMenuOpen] = useState(false)
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null)

  // Premium data from rates.ca (2025 data in CAD per year)
  // Source: https://rates.ca/insurance-quotes/auto/ontario
  const cities: CityData[] = [
    { name: 'Brampton', lat: 43.7315, lng: -79.7624, premium: 3848, region: 'GTA' },
    { name: 'Scarborough', lat: 43.7731, lng: -79.2577, premium: 3643, region: 'GTA' },
    { name: 'North York', lat: 43.7615, lng: -79.4111, premium: 3570, region: 'GTA' },
    { name: 'Mississauga', lat: 43.5890, lng: -79.6441, premium: 3498, region: 'GTA' },
    { name: 'Etobicoke', lat: 43.6532, lng: -79.5329, premium: 3490, region: 'GTA' },
    { name: 'Markham', lat: 43.8561, lng: -79.3370, premium: 3477, region: 'GTA' },
    { name: 'Vaughan', lat: 43.8563, lng: -79.5085, premium: 3317, region: 'GTA' },
    { name: 'Oshawa', lat: 43.8971, lng: -78.8658, premium: 3075, region: 'Durham Region' },
    { name: 'Toronto', lat: 43.6532, lng: -79.3832, premium: 2800, region: 'GTA' },
    { name: 'London', lat: 42.9849, lng: -81.2453, premium: 2550, region: 'Southwestern Ontario' },
    { name: 'Ottawa', lat: 45.4215, lng: -75.6972, premium: 1780, region: 'Eastern Ontario' },
    { name: 'Kingston', lat: 44.2312, lng: -76.4860, premium: 1750, region: 'Eastern Ontario' },
    { name: 'Brockville', lat: 44.5897, lng: -75.6883, premium: 1756, region: 'Eastern Ontario' },
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
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-purple-200 hover:text-purple-400 transition">Home</Link>
              
              {/* Products Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setProductsMenuOpen(true)}
                onMouseLeave={() => setProductsMenuOpen(false)}
              >
                <button className="text-purple-200 hover:text-purple-400 transition flex items-center gap-1 py-2">
                  Products
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {productsMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-slate-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-xl py-2 z-50">
                    <Link 
                      href="/mortgage" 
                      onClick={() => setProductsMenuOpen(false)}
                      className="block px-5 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-purple-400 transition cursor-pointer"
                    >
                      🏠 Mortgage
                    </Link>
                    <Link 
                      href="/credit-card" 
                      onClick={() => setProductsMenuOpen(false)}
                      className="block px-5 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-purple-400 transition cursor-pointer"
                    >
                      💳 Credit Card
                    </Link>
                    <Link 
                      href="/ontario-map" 
                      onClick={() => setProductsMenuOpen(false)}
                      className="block px-5 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-purple-400 transition cursor-pointer"
                    >
                      🗺️ Auto Map
                    </Link>
                    <Link 
                      href="/insuramap" 
                      onClick={() => setProductsMenuOpen(false)}
                      className="block px-5 py-3 text-purple-200 hover:bg-purple-500/20 hover:text-purple-400 transition cursor-pointer"
                    >
                      🏠 InsuraMap 2.0
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/account" className="text-purple-200 hover:text-purple-400 transition">My Account</Link>
            </div>
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
          <div className="mt-2">
            <DeploymentTimestamp />
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
                  const color = getColor(city.premium)
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
                            <p><strong>Premium:</strong> ${city.premium.toLocaleString()}/year</p>
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

        {/* Hover Info */}
        {hoveredCity && (
          <div className="bg-slate-800 rounded-xl p-6 mb-8 border-2 border-purple-500">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚗</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{hoveredCity.name}</h3>
                <p className="text-purple-300 text-sm">{hoveredCity.region}</p>
              </div>
            </div>
            <div className="bg-purple-600/20 rounded-lg p-4 border border-purple-500/30">
              <p className="text-purple-200 text-sm mb-1">Average Annual Premium</p>
              <p className="text-3xl font-bold text-white">
                ${hoveredCity.premium.toLocaleString()}
              </p>
              <p className="text-purple-300 text-xs mt-1">per year</p>
            </div>
          </div>
        )}

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

      {/* Footer */}
      <footer className="bg-slate-950/90 backdrop-blur-md border-t border-purple-500/20 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl rocket-glow">🚀</span>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  RateRocket
                </h3>
              </div>
              <p className="text-purple-300">Your trusted insurance comparison platform in Canada. 🪐</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-purple-300">
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>🛸</span> About Us</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>📡</span> Contact</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>🔒</span> Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-purple-300">
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>📚</span> Insurance Guide</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>❓</span> FAQ</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>📝</span> Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-purple-300">
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>📜</span> Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>🔐</span> Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-200 transition flex items-center gap-2"><span>⚠️</span> Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-500/20 text-center">
            <p className="text-purple-300 flex items-center justify-center gap-2 mb-2">
              <span>🌌</span> &copy; 2025 RateRocket. All rights reserved. <span>🚀</span>
            </p>
            <p className="text-purple-400 text-sm">
              vibe coded by @ravicharavi 🤍
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
