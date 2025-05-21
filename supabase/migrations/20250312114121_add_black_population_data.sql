-- Create reference table for states if it doesn't exist
CREATE TABLE IF NOT EXISTS public.states (
    code CHAR(2) PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Create tables for black population data
CREATE TABLE IF NOT EXISTS public.black_population_states (
    id SERIAL PRIMARY KEY,
    state_code CHAR(2) NOT NULL UNIQUE REFERENCES public.states(code),
    state_name TEXT NOT NULL,
    black_population INTEGER NOT NULL,
    black_percentage DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.black_population_cities (
    id SERIAL PRIMARY KEY,
    city_name TEXT NOT NULL,
    state_code CHAR(2) NOT NULL REFERENCES public.states(code),
    metropolitan_area TEXT NOT NULL,
    black_population INTEGER NOT NULL,
    black_percentage DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(city_name, state_code)
);

-- Add RLS policies
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.black_population_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.black_population_cities ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Allow read access to all authenticated users for states"
    ON public.states
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow read access to all authenticated users for black_population_states"
    ON public.black_population_states
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow read access to all authenticated users for black_population_cities"
    ON public.black_population_cities
    FOR SELECT
    TO authenticated
    USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_black_population_states_population 
    ON public.black_population_states(black_population DESC);
CREATE INDEX IF NOT EXISTS idx_black_population_cities_population 
    ON public.black_population_cities(black_population DESC);
CREATE INDEX IF NOT EXISTS idx_black_population_cities_state 
    ON public.black_population_cities(state_code);

-- Add triggers to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_black_population_states_updated_at
    BEFORE UPDATE ON public.black_population_states
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_black_population_cities_updated_at
    BEFORE UPDATE ON public.black_population_cities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert states data
INSERT INTO public.states (code, name) VALUES
    ('TX', 'Texas'),
    ('FL', 'Florida'),
    ('NY', 'New York'),
    ('GA', 'Georgia'),
    ('CA', 'California'),
    ('NC', 'North Carolina'),
    ('IL', 'Illinois'),
    ('MD', 'Maryland'),
    ('VA', 'Virginia'),
    ('PA', 'Pennsylvania'),
    ('OH', 'Ohio'),
    ('LA', 'Louisiana'),
    ('MI', 'Michigan'),
    ('NJ', 'New Jersey'),
    ('SC', 'South Carolina'),
    ('AL', 'Alabama'),
    ('TN', 'Tennessee'),
    ('MS', 'Mississippi'),
    ('MO', 'Missouri'),
    ('IN', 'Indiana'),
    ('MA', 'Massachusetts'),
    ('AR', 'Arkansas'),
    ('CT', 'Connecticut'),
    ('MN', 'Minnesota'),
    ('WI', 'Wisconsin'),
    ('AZ', 'Arizona'),
    ('WA', 'Washington'),
    ('KY', 'Kentucky'),
    ('OK', 'Oklahoma'),
    ('NV', 'Nevada'),
    ('DC', 'District of Columbia'),
    ('CO', 'Colorado'),
    ('DE', 'Delaware'),
    ('KS', 'Kansas'),
    ('IA', 'Iowa'),
    ('OR', 'Oregon'),
    ('NE', 'Nebraska'),
    ('RI', 'Rhode Island'),
    ('WV', 'West Virginia'),
    ('NM', 'New Mexico'),
    ('UT', 'Utah'),
    ('HI', 'Hawaii'),
    ('AK', 'Alaska'),
    ('NH', 'New Hampshire'),
    ('ND', 'North Dakota'),
    ('ME', 'Maine'),
    ('SD', 'South Dakota'),
    ('ID', 'Idaho'),
    ('VT', 'Vermont'),
    ('MT', 'Montana'),
    ('WY', 'Wyoming');

-- Insert state black population data
INSERT INTO public.black_population_states (state_code, state_name, black_population, black_percentage) VALUES
    ('TX', 'Texas', 3936669, 14.0),
    ('FL', 'Florida', 3867495, 18.0),
    ('NY', 'New York', 3763977, 19.0),
    ('GA', 'Georgia', 3549349, 34.0),
    ('CA', 'California', 3024208, 8.0),
    ('NC', 'North Carolina', 2448077, 24.0),
    ('IL', 'Illinois', 1991107, 16.0),
    ('MD', 'Maryland', 1972270, 33.0),
    ('VA', 'Virginia', 1825228, 21.0),
    ('PA', 'Pennsylvania', 1705705, 13.0),
    ('OH', 'Ohio', 1692390, 14.0),
    ('LA', 'Louisiana', 1571529, 34.0),
    ('MI', 'Michigan', 1540612, 15.0),
    ('NJ', 'New Jersey', 1455615, 16.0),
    ('SC', 'South Carolina', 1438997, 28.0),
    ('AL', 'Alabama', 1352906, 28.0),
    ('TN', 'Tennessee', 1227260, 18.0),
    ('MS', 'Mississippi', 1152261, 39.0),
    ('MO', 'Missouri', 797005, 13.0),
    ('IN', 'Indiana', 742868, 11.0),
    ('MA', 'Massachusetts', 716148, 10.0),
    ('AR', 'Arkansas', 499364, 17.0),
    ('CT', 'Connecticut', 482577, 14.0),
    ('MN', 'Minnesota', 452437, 8.0),
    ('WI', 'Wisconsin', 448592, 8.0),
    ('AZ', 'Arizona', 446459, 6.0),
    ('WA', 'Washington', 428733, 6.0),
    ('KY', 'Kentucky', 428733, 10.0),
    ('OK', 'Oklahoma', 373334, 9.0),
    ('NV', 'Nevada', 356416, 12.0),
    ('DC', 'District of Columbia', 338373, 48.0),
    ('CO', 'Colorado', 326081, 6.0),
    ('DE', 'Delaware', 239727, 25.0),
    ('KS', 'Kansas', 221647, 8.0),
    ('IA', 'Iowa', 158145, 5.0),
    ('OR', 'Oregon', 135429, 3.0),
    ('NE', 'Nebraska', 120916, 6.0),
    ('RI', 'Rhode Island', 107361, 10.0),
    ('WV', 'West Virginia', 83686, 5.0),
    ('NM', 'New Mexico', 70653, 3.0),
    ('UT', 'Utah', 66989, 2.0),
    ('HI', 'Hawaii', 51031, 4.0),
    ('AK', 'Alaska', 39950, 5.0),
    ('NH', 'New Hampshire', 32481, 2.0),
    ('ND', 'North Dakota', 30965, 4.0),
    ('ME', 'Maine', 29923, 2.0),
    ('SD', 'South Dakota', 27697, 3.0),
    ('ID', 'Idaho', 25267, 1.0),
    ('VT', 'Vermont', 12936, 2.0),
    ('MT', 'Montana', 12007, 1.0),
    ('WY', 'Wyoming', 11306, 2.0);

-- Insert city black population data
INSERT INTO public.black_population_cities (city_name, state_code, metropolitan_area, black_population, black_percentage) VALUES
    ('New York City', 'NY', 'New York City, NY-NJ-PA', 3455984, 17.0),
    ('Atlanta', 'GA', 'Atlanta, GA', 1920782, 34.0),
    ('Chicago', 'IL', 'Chicago, IL-IN-WI', 1599415, 17.0),
    ('Washington', 'DC', 'Washington, DC-VA-MD-WV', 1547874, 25.0),
    ('Miami', 'FL', 'Miami–Fort Lauderdale–West Palm Beach, FL', 1286415, 21.0),
    ('Philadelphia', 'PA', 'Philadelphia–Wilmington, PA-NJ-DE-MD', 1270826, 21.0),
    ('Houston', 'TX', 'Houston, TX', 1141697, 17.0),
    ('Dallas', 'TX', 'Dallas–Fort Worth, TX', 1093212, 15.0),
    ('Detroit', 'MI', 'Detroit, MI', 960838, 22.0),
    ('Los Angeles', 'CA', 'Los Angeles, CA', 882243, 7.0),
    ('Baltimore', 'MD', 'Baltimore, MD', 812786, 29.0),
    ('Memphis', 'TN', 'Memphis, TN-MS-AR', 627245, 47.0),
    ('Charlotte', 'NC', 'Charlotte, NC-SC', 542050, 22.0),
    ('Virginia Beach', 'VA', 'Virginia Beach–Norfolk–Newport News, VA-NC', 525663, 31.0),
    ('St. Louis', 'MO', 'St. Louis, MO-IL', 513403, 18.0),
    ('New Orleans', 'LA', 'New Orleans, LA', 441391, 35.0),
    ('Cleveland', 'OH', 'Cleveland, OH', 410657, 20.0),
    ('Orlando', 'FL', 'Orlando–Sanford, FL', 391471, 16.0),
    ('Boston', 'MA', 'Boston, MA-NH', 384527, 8.0),
    ('Richmond', 'VA', 'Richmond, VA', 378243, 30.0); 