'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/components/atoms/buttons/Button'
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/app/components/ui/select'
import { Card, CardContent } from '@/app/components/molecules/cards/Card'

interface LocationSelectorProps {
  onSubmit: (state: string, city: string) => void
}

interface StateData {
  state_code: string
  state_name: string
  black_population: number
  black_percentage: number
}

interface CityData {
  city_name: string
  metropolitan_area: string
  black_population: number
  black_percentage: number
}

export default function LocationSelector({ onSubmit }: LocationSelectorProps) {
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [states, setStates] = useState<StateData[]>([])
  const [cities, setCities] = useState<CityData[]>([])
  const [isLoadingStates, setIsLoadingStates] = useState(true)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch states on component mount
  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch('/api/states')
        if (!response.ok) throw new Error('Failed to fetch states')
        const data = await response.json()
        setStates(data)
      } catch (err) {
        setError('Failed to load states data')
        console.error(err)
      } finally {
        setIsLoadingStates(false)
      }
    }
    fetchStates()
  }, [])

  // Fetch cities when state is selected
  useEffect(() => {
    async function fetchCities() {
      if (!selectedState) {
        setCities([])
        setSelectedCity('')
        return
      }

      setIsLoadingCities(true)
      try {
        const response = await fetch(`/api/states/${selectedState}/cities`)
        if (!response.ok) throw new Error('Failed to fetch cities')
        const data = await response.json()
        setCities(data)
      } catch (err) {
        setError('Failed to load cities data')
        console.error(err)
      } finally {
        setIsLoadingCities(false)
      }
    }
    fetchCities()
  }, [selectedState])

  const handleSubmit = () => {
    if (selectedState && selectedCity) {
      onSubmit(selectedState, selectedCity)
    }
  }

  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat('en-US').format(population)
  }

  const selectedStateData = states.find(state => state.state_code === selectedState)
  const selectedCityData = cities.find(city => city.city_name === selectedCity)

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium text-gray-300">
            Select State
          </label>
          <Select
            value={selectedState}
            onValueChange={setSelectedState}
            disabled={isLoadingStates}
          >
            <SelectTrigger className="bg-[#1D2435] border-[#2E3446] text-white">
              <SelectValue placeholder={isLoadingStates ? "Loading states..." : "Select a state"} />
            </SelectTrigger>
            <SelectContent className="bg-[#1D2435] border-[#2E3446] text-white">
              <SelectGroup>
                <SelectLabel>States</SelectLabel>
                {states.map((state) => (
                  <SelectItem key={state.state_code} value={state.state_code}>
                    {state.state_name} ({state.black_percentage}% Black)
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedStateData && (
            <Card className="mt-2 bg-[#1D2435] border-[#2E3446] text-white">
              <CardContent className="p-4">
                <p className="text-sm">Black Population: {formatPopulation(selectedStateData.black_population)}</p>
                <p className="text-sm">Percentage: {selectedStateData.black_percentage}%</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-gray-300">
            Select City
          </label>
          <Select
            value={selectedCity}
            onValueChange={setSelectedCity}
            disabled={!selectedState || isLoadingCities}
          >
            <SelectTrigger className="bg-[#1D2435] border-[#2E3446] text-white">
              <SelectValue placeholder={isLoadingCities ? "Loading cities..." : "Select a city"} />
            </SelectTrigger>
            <SelectContent className="bg-[#1D2435] border-[#2E3446] text-white">
              <SelectGroup>
                <SelectLabel>Cities</SelectLabel>
                {cities.map((city) => (
                  <SelectItem key={city.city_name} value={city.city_name}>
                    {city.city_name} ({city.black_percentage}% Black)
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedCityData && (
            <Card className="mt-2 bg-[#1D2435] border-[#2E3446] text-white">
              <CardContent className="p-4">
                <p className="text-sm">Metropolitan Area: {selectedCityData.metropolitan_area}</p>
                <p className="text-sm">Black Population: {formatPopulation(selectedCityData.black_population)}</p>
                <p className="text-sm">Percentage: {selectedCityData.black_percentage}%</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Button 
        className="w-full bg-[#2563EB] hover:bg-blue-600 text-white"
        onClick={handleSubmit}
        disabled={!selectedState || !selectedCity}
      >
        View Community Data
      </Button>
    </div>
  )
} 