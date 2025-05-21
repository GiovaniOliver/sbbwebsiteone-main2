export interface State {
  code: string;
  name: string;
}

export interface BlackPopulationState {
  id: number;
  state_code: string;
  state_name: string;
  black_population: number;
  black_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface BlackPopulationCity {
  id: number;
  city_name: string;
  state_code: string;
  metropolitan_area: string;
  black_population: number;
  black_percentage: number;
  created_at: string;
  updated_at: string;
} 