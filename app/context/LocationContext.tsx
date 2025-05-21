'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@/hooks/useUser';

interface LocationContextType {
  selectedState: string;
  selectedCity: string;
  setUserLocation: (state: string, city: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserLocation = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('state_code, city')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data && data.state_code && data.city) {
          setSelectedState(data.state_code);
          setSelectedCity(data.city);
        }
      } catch (error) {
        console.error('Error fetching user location:', error);
        setError('Could not load user location');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserLocation();
  }, [user, supabase]);

  const setUserLocation = async (state: string, city: string) => {
    if (!user) return;

    try {
      setSelectedState(state);
      setSelectedCity(city);

      const { error } = await supabase
        .from('profiles')
        .update({
          state_code: state,
          city: city,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
    } catch (err) {
      console.error('Error saving location:', err);
      setError('Failed to save location');
    }
  };

  return (
    <LocationContext.Provider
      value={{
        selectedState,
        selectedCity,
        setUserLocation,
        isLoading,
        error
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
} 