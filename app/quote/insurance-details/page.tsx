'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function InsuranceDetailsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Car Insurance Details
    carMake: '',
    carModel: '',
    carYear: '',
    carValue: '',
    primaryUse: '',
    annualMileage: '',
    drivingExperience: '',
    currentInsurance: '',
    claimsHistory: '',
    
    // Home Insurance Details
    homeType: '',
    homeValue: '',
    homeAge: '',
    homeSize: '',
    homeInsurance: '',
    homeClaims: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Check if personal info exists
    const personalInfo = sessionStorage.getItem('personalInfo')
    if (!personalInfo) {
      router.push('/quote/personal-info')
    }
  }, [router])

  const carMakes = [
    'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler',
    'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jeep',
    'Kia', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mitsubishi',
    'Nissan', 'Ram', 'Subaru', 'Toyota', 'Volkswagen', 'Volvo', 'Other'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Car Insurance Validation
    if (!formData.carMake) newErrors.carMake = 'Car make is required'
    if (!formData.carModel) newErrors.carModel = 'Car model is required'
    if (!formData.carYear) newErrors.carYear = 'Car year is required'
    if (!formData.carValue) newErrors.carValue = 'Car value is required'
    if (!formData.primaryUse) newErrors.primaryUse = 'Primary use is required'
    if (!formData.annualMileage) newErrors.annualMileage = 'Annual mileage is required'
    if (!formData.drivingExperience) newErrors.drivingExperience = 'Driving experience is required'
    if (!formData.currentInsurance) newErrors.currentInsurance = 'Current insurance status is required'
    if (!formData.claimsHistory) newErrors.claimsHistory = 'Claims history is required'

    // Home Insurance Validation
    if (!formData.homeType) newErrors.homeType = 'Home type is required'
    if (!formData.homeValue) newErrors.homeValue = 'Home value is required'
    if (!formData.homeAge) newErrors.homeAge = 'Home age is required'
    if (!formData.homeSize) newErrors.homeSize = 'Home size is required'
    if (!formData.homeInsurance) newErrors.homeInsurance = 'Current home insurance status is required'
    if (!formData.homeClaims) newErrors.homeClaims = 'Home claims history is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Store in sessionStorage and navigate to quotes
    sessionStorage.setItem('insuranceDetails', JSON.stringify(formData))
    router.push('/quote/compare')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">🚀 RateRocket</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                ✓
              </div>
              <span className="ml-3 text-gray-500">Personal Information</span>
            </div>
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            <div className="flex items-center">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                2
              </div>
              <span className="ml-3 font-semibold text-blue-600">Insurance Details</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4"></div>
            <div className="flex items-center">
              <div className="bg-gray-300 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-3 text-gray-500">Compare Quotes</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Insurance Details</h2>
          <p className="text-gray-600 mb-8">
            Help us understand your car and home insurance needs to get you the best bundle quotes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Car Insurance Section */}
            <div className="border-b pb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">🚗</span> Car Insurance Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="carMake" className="block text-sm font-medium text-gray-700 mb-2">
                    Car Make *
                  </label>
                  <select
                    id="carMake"
                    name="carMake"
                    value={formData.carMake}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.carMake ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Make</option>
                    {carMakes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                  {errors.carMake && <p className="mt-1 text-sm text-red-600">{errors.carMake}</p>}
                </div>

                <div>
                  <label htmlFor="carModel" className="block text-sm font-medium text-gray-700 mb-2">
                    Car Model *
                  </label>
                  <input
                    type="text"
                    id="carModel"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.carModel ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Civic"
                  />
                  {errors.carModel && <p className="mt-1 text-sm text-red-600">{errors.carModel}</p>}
                </div>

                <div>
                  <label htmlFor="carYear" className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <input
                    type="number"
                    id="carYear"
                    name="carYear"
                    value={formData.carYear}
                    onChange={handleChange}
                    min="1980"
                    max={new Date().getFullYear() + 1}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.carYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="2020"
                  />
                  {errors.carYear && <p className="mt-1 text-sm text-red-600">{errors.carYear}</p>}
                </div>

                <div>
                  <label htmlFor="carValue" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Car Value (CAD) *
                  </label>
                  <input
                    type="number"
                    id="carValue"
                    name="carValue"
                    value={formData.carValue}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.carValue ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="25000"
                  />
                  {errors.carValue && <p className="mt-1 text-sm text-red-600">{errors.carValue}</p>}
                </div>

                <div>
                  <label htmlFor="primaryUse" className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Use *
                  </label>
                  <select
                    id="primaryUse"
                    name="primaryUse"
                    value={formData.primaryUse}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.primaryUse ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="commute">Commute to Work</option>
                    <option value="pleasure">Pleasure/Personal</option>
                    <option value="business">Business</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.primaryUse && <p className="mt-1 text-sm text-red-600">{errors.primaryUse}</p>}
                </div>

                <div>
                  <label htmlFor="annualMileage" className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Mileage *
                  </label>
                  <select
                    id="annualMileage"
                    name="annualMileage"
                    value={formData.annualMileage}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.annualMileage ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="0-5000">Less than 5,000 km</option>
                    <option value="5000-10000">5,000 - 10,000 km</option>
                    <option value="10000-20000">10,000 - 20,000 km</option>
                    <option value="20000+">More than 20,000 km</option>
                  </select>
                  {errors.annualMileage && <p className="mt-1 text-sm text-red-600">{errors.annualMileage}</p>}
                </div>

                <div>
                  <label htmlFor="drivingExperience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Driving Experience *
                  </label>
                  <select
                    id="drivingExperience"
                    name="drivingExperience"
                    value={formData.drivingExperience}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.drivingExperience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">More than 10 years</option>
                  </select>
                  {errors.drivingExperience && <p className="mt-1 text-sm text-red-600">{errors.drivingExperience}</p>}
                </div>

                <div>
                  <label htmlFor="currentInsurance" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Car Insurance *
                  </label>
                  <select
                    id="currentInsurance"
                    name="currentInsurance"
                    value={formData.currentInsurance}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.currentInsurance ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes, I have insurance</option>
                    <option value="no">No, I need new insurance</option>
                    <option value="expiring">My policy is expiring soon</option>
                  </select>
                  {errors.currentInsurance && <p className="mt-1 text-sm text-red-600">{errors.currentInsurance}</p>}
                </div>

                <div>
                  <label htmlFor="claimsHistory" className="block text-sm font-medium text-gray-700 mb-2">
                    Claims History (Last 5 Years) *
                  </label>
                  <select
                    id="claimsHistory"
                    name="claimsHistory"
                    value={formData.claimsHistory}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.claimsHistory ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="none">No claims</option>
                    <option value="1">1 claim</option>
                    <option value="2">2 claims</option>
                    <option value="3+">3 or more claims</option>
                  </select>
                  {errors.claimsHistory && <p className="mt-1 text-sm text-red-600">{errors.claimsHistory}</p>}
                </div>
              </div>
            </div>

            {/* Home Insurance Section */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">🏠</span> Home Insurance Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="homeType" className="block text-sm font-medium text-gray-700 mb-2">
                    Home Type *
                  </label>
                  <select
                    id="homeType"
                    name="homeType"
                    value={formData.homeType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.homeType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="single-family">Single Family Home</option>
                    <option value="condo">Condo/Apartment</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="duplex">Duplex</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.homeType && <p className="mt-1 text-sm text-red-600">{errors.homeType}</p>}
                </div>

                <div>
                  <label htmlFor="homeValue" className="block text-sm font-medium text-gray-700 mb-2">
                    Home Value (CAD) *
                  </label>
                  <input
                    type="number"
                    id="homeValue"
                    name="homeValue"
                    value={formData.homeValue}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.homeValue ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="500000"
                  />
                  {errors.homeValue && <p className="mt-1 text-sm text-red-600">{errors.homeValue}</p>}
                </div>

                <div>
                  <label htmlFor="homeAge" className="block text-sm font-medium text-gray-700 mb-2">
                    Home Age *
                  </label>
                  <select
                    id="homeAge"
                    name="homeAge"
                    value={formData.homeAge}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.homeAge ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="0-5">0-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10-20">10-20 years</option>
                    <option value="20-30">20-30 years</option>
                    <option value="30+">More than 30 years</option>
                  </select>
                  {errors.homeAge && <p className="mt-1 text-sm text-red-600">{errors.homeAge}</p>}
                </div>

                <div>
                  <label htmlFor="homeSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Home Size (sq ft) *
                  </label>
                  <input
                    type="number"
                    id="homeSize"
                    name="homeSize"
                    value={formData.homeSize}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.homeSize ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="2000"
                  />
                  {errors.homeSize && <p className="mt-1 text-sm text-red-600">{errors.homeSize}</p>}
                </div>

                <div>
                  <label htmlFor="homeInsurance" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Home Insurance *
                  </label>
                  <select
                    id="homeInsurance"
                    name="homeInsurance"
                    value={formData.homeInsurance}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.homeInsurance ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes, I have insurance</option>
                    <option value="no">No, I need new insurance</option>
                    <option value="expiring">My policy is expiring soon</option>
                  </select>
                  {errors.homeInsurance && <p className="mt-1 text-sm text-red-600">{errors.homeInsurance}</p>}
                </div>

                <div>
                  <label htmlFor="homeClaims" className="block text-sm font-medium text-gray-700 mb-2">
                    Home Claims History (Last 5 Years) *
                  </label>
                  <select
                    id="homeClaims"
                    name="homeClaims"
                    value={formData.homeClaims}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.homeClaims ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="none">No claims</option>
                    <option value="1">1 claim</option>
                    <option value="2">2 claims</option>
                    <option value="3+">3 or more claims</option>
                  </select>
                  {errors.homeClaims && <p className="mt-1 text-sm text-red-600">{errors.homeClaims}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex gap-4">
              <Link
                href="/quote/personal-info"
                className="flex-1 bg-gray-200 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-300 transition text-center"
              >
                Back
              </Link>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Get My Bundle Quotes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
