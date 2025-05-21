'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import BuyingPowerSection from '@/app/components/dashboard/BuyingPowerSection';
import BuyingPowerExamples from '@/app/components/dashboard/BuyingPowerExamples';
import { useLocation } from '@/app/context/LocationContext';
import { Button } from '@/app/components/atoms/buttons/Button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/app/components/shared';
import IndustryBreakdown from '@/app/components/dashboard/IndustryBreakdown';

interface LocationData {
  state_code: string;
  state_name: string;
  black_population: number;
  black_percentage: number;
  total_population: number;
}

interface CityData {
  city_name: string;
  state_code: string;
  metropolitan_area: string;
  black_population: number;
  black_percentage: number;
  total_population: number;
}

export default function BuyingPowerPage() {
  const [states, setStates] = useState<LocationData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isSavingLocation, setIsSavingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Using location context
  const { selectedState, selectedCity, setUserLocation, isLoading: isLocationLoading } = useLocation();
  const [localState, setLocalState] = useState<string>('');
  const [localCity, setLocalCity] = useState<string>('');
  const [showData, setShowData] = useState(false);

  // Set local state/city when the location context is loaded
  useEffect(() => {
    if (selectedState && selectedCity) {
      setLocalState(selectedState);
      setLocalCity(selectedCity);
      setShowData(true); // Automatically show data if user has a saved location
    }
  }, [selectedState, selectedCity]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('/api/states');
        if (!response.ok) {
          throw new Error('Failed to fetch states');
        }
        const data = await response.json();
        setStates(data);
        setIsLoadingStates(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch states');
        setIsLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!localState) {
        setCities([]);
        return;
      }

      setIsLoadingCities(true);
      try {
        const citiesResponse = await fetch(`/api/states/${localState}/cities`);

        if (!citiesResponse.ok) {
          throw new Error('Failed to fetch city data');
        }

        const citiesData = await citiesResponse.json();
        setCities(citiesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch city data');
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();
  }, [localState]);

  const handleSaveLocation = async () => {
    if (!localState || !localCity) return;

    setIsSavingLocation(true);
    try {
      await setUserLocation(localState, localCity);
      setShowData(true);
      toast({
        title: "Location saved",
        description: "Your location preferences have been updated.",
      });
    } catch (err) {
      console.error('Error saving location:', err);
      toast({
        title: "Error saving location",
        description: "There was a problem saving your location.",
        variant: "destructive"
      });
    } finally {
      setIsSavingLocation(false);
    }
  };

  const handleViewCommunityData = () => {
    setShowData(true);
  };

  if (isLoadingStates || isLocationLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-2" />
        <p>Loading location data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 bg-red-50 p-4 rounded-md">{error}</div>;
  }

  return (
    <div className="w-full mx-auto px-2">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 w-full">
          Buying Power Dashboard
        </h1>
        <p className="text-muted-foreground">
          Explore economic data and impact scenarios for your community
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Location</CardTitle>
          <CardDescription>
            Choose your state and city to view community buying power data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select State</label>
              <Select
                value={localState}
                onValueChange={(value) => {
                  setLocalState(value);
                  setLocalCity('');
                  setShowData(false);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.state_code} value={state.state_code}>
                      {state.state_name} ({state.black_percentage}% Black)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {localState && states.find(s => s.state_code === localState) && (
                <div className="text-sm mt-2">
                  <p>Black Population: {states.find(s => s.state_code === localState)?.black_population.toLocaleString()}</p>
                  <p>Percentage: {states.find(s => s.state_code === localState)?.black_percentage}%</p>
                </div>
              )}
            </div>

            {localState && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Select City</label>
                <Select
                  value={localCity}
                  onValueChange={(value) => {
                    setLocalCity(value);
                    setShowData(false);
                  }}
                  disabled={isLoadingCities}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isLoadingCities ? "Loading cities..." : "Select a city"} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.city_name} value={city.city_name}>
                        {city.city_name} ({city.black_percentage}% Black)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {localCity && cities.find(c => c.city_name === localCity) && (
                  <div className="text-sm mt-2">
                    <p>Metropolitan Area: {cities.find(c => c.city_name === localCity)?.metropolitan_area}</p>
                    <p>Black Population: {cities.find(c => c.city_name === localCity)?.black_population.toLocaleString()}</p>
                    <p>Percentage: {cities.find(c => c.city_name === localCity)?.black_percentage}%</p>
                  </div>
                )}
              </div>
            )}

            <div className="md:col-span-2 flex justify-between items-center">
              <Button
                onClick={handleSaveLocation}
                disabled={!localState || !localCity || isSavingLocation}
                variant="secondary"
                className="mr-2"
              >
                {isSavingLocation ? (
                  <span>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  'Save as My Location'
                )}
              </Button>
              
              {localState && localCity && !showData && (
                <Button 
                  onClick={handleViewCommunityData}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-lg hover:from-yellow-300 hover:to-orange-400 w-64"
                >
                  View Community Data
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {showData && localState && localCity && (
        <div className="space-y-8">
          <div className="overflow-x-auto">
            <div className="inline-flex rounded-lg bg-[#1B2130] border border-[#2E3446] p-1 text-sm font-medium mb-6 overflow-visible w-full justify-center">
              <div className="flex space-x-1 whitespace-nowrap">
                <button className="px-4 py-2 rounded-md hover:bg-[#2E3446]">Community Statistics</button>
                <button className="px-4 py-2 rounded-md bg-[#2E3446]">Buying Power</button>
                <button className="px-4 py-2 rounded-md hover:bg-[#2E3446]">Impact Examples</button>
                <button className="px-4 py-2 rounded-md hover:bg-[#2E3446]">Industry Breakdown</button>
                <button className="px-4 py-2 rounded-md hover:bg-[#2E3446]">Money Circulation</button>
                <button className="px-4 py-2 rounded-md hover:bg-[#2E3446]">7 Streams Analysis</button>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <BuyingPowerSection selectedState={localState} selectedCity={localCity} />
          </div>
          <div className="mb-8">
            <BuyingPowerExamples selectedState={localState} selectedCity={localCity} />
          </div>
          <div>
            <IndustryBreakdown selectedState={localState} selectedCity={localCity} />
          </div>
        </div>
      )}
    </div>
  );
} 