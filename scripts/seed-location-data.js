require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// State data from the provided list
const statesData = [
  { rank: 1, state_name: 'Texas', black_population: 3936669, percentage: '14%', state_code: 'TX' },
  { rank: 2, state_name: 'Florida', black_population: 3867495, percentage: '18%', state_code: 'FL' },
  { rank: 3, state_name: 'New York', black_population: 3763977, percentage: '19%', state_code: 'NY' },
  { rank: 4, state_name: 'Georgia', black_population: 3549349, percentage: '34%', state_code: 'GA' },
  { rank: 5, state_name: 'California', black_population: 3024208, percentage: '8%', state_code: 'CA' },
  { rank: 6, state_name: 'North Carolina', black_population: 2448077, percentage: '24%', state_code: 'NC' },
  { rank: 7, state_name: 'Illinois', black_population: 1991107, percentage: '16%', state_code: 'IL' },
  { rank: 8, state_name: 'Maryland', black_population: 1972270, percentage: '33%', state_code: 'MD' },
  { rank: 9, state_name: 'Virginia', black_population: 1825228, percentage: '21%', state_code: 'VA' },
  { rank: 10, state_name: 'Pennsylvania', black_population: 1705705, percentage: '13%', state_code: 'PA' },
  { rank: 11, state_name: 'Ohio', black_population: 1692390, percentage: '14%', state_code: 'OH' },
  { rank: 12, state_name: 'Louisiana', black_population: 1571529, percentage: '34%', state_code: 'LA' },
  { rank: 13, state_name: 'Michigan', black_population: 1540612, percentage: '15%', state_code: 'MI' },
  { rank: 14, state_name: 'New Jersey', black_population: 1455615, percentage: '16%', state_code: 'NJ' },
  { rank: 15, state_name: 'South Carolina', black_population: 1438997, percentage: '28%', state_code: 'SC' },
  { rank: 16, state_name: 'Alabama', black_population: 1352906, percentage: '28%', state_code: 'AL' },
  { rank: 17, state_name: 'Tennessee', black_population: 1227260, percentage: '18%', state_code: 'TN' },
  { rank: 18, state_name: 'Mississippi', black_population: 1152261, percentage: '39%', state_code: 'MS' },
  { rank: 19, state_name: 'Missouri', black_population: 797005, percentage: '13%', state_code: 'MO' },
  { rank: 20, state_name: 'Indiana', black_population: 742868, percentage: '11%', state_code: 'IN' },
  { rank: 21, state_name: 'Massachusetts', black_population: 716148, percentage: '10%', state_code: 'MA' },
  { rank: 22, state_name: 'Arkansas', black_population: 499364, percentage: '17%', state_code: 'AR' },
  { rank: 23, state_name: 'Connecticut', black_population: 482577, percentage: '14%', state_code: 'CT' },
  { rank: 24, state_name: 'Minnesota', black_population: 452437, percentage: '8%', state_code: 'MN' },
  { rank: 25, state_name: 'Wisconsin', black_population: 448592, percentage: '8%', state_code: 'WI' },
  { rank: 26, state_name: 'Arizona', black_population: 446459, percentage: '6%', state_code: 'AZ' },
  { rank: 27, state_name: 'Washington', black_population: 428733, percentage: '6%', state_code: 'WA' },
  { rank: 28, state_name: 'Kentucky', black_population: 428733, percentage: '10%', state_code: 'KY' },
  { rank: 29, state_name: 'Oklahoma', black_population: 373334, percentage: '9%', state_code: 'OK' },
  { rank: 30, state_name: 'Nevada', black_population: 356416, percentage: '12%', state_code: 'NV' },
  { rank: 31, state_name: 'District of Columbia', black_population: 338373, percentage: '48%', state_code: 'DC' },
  { rank: 32, state_name: 'Colorado', black_population: 326081, percentage: '6%', state_code: 'CO' },
  { rank: 33, state_name: 'Delaware', black_population: 239727, percentage: '25%', state_code: 'DE' },
  { rank: 34, state_name: 'Kansas', black_population: 221647, percentage: '8%', state_code: 'KS' },
  { rank: 35, state_name: 'Iowa', black_population: 158145, percentage: '5%', state_code: 'IA' },
  { rank: 36, state_name: 'Oregon', black_population: 135429, percentage: '3%', state_code: 'OR' },
  { rank: 37, state_name: 'Nebraska', black_population: 120916, percentage: '6%', state_code: 'NE' },
  { rank: 38, state_name: 'Rhode Island', black_population: 107361, percentage: '10%', state_code: 'RI' },
  { rank: 39, state_name: 'West Virginia', black_population: 83686, percentage: '5%', state_code: 'WV' },
  { rank: 40, state_name: 'New Mexico', black_population: 70653, percentage: '3%', state_code: 'NM' },
  { rank: 41, state_name: 'Utah', black_population: 66989, percentage: '2%', state_code: 'UT' },
  { rank: 42, state_name: 'Hawaii', black_population: 51031, percentage: '4%', state_code: 'HI' },
  { rank: 43, state_name: 'Alaska', black_population: 39950, percentage: '5%', state_code: 'AK' },
  { rank: 44, state_name: 'New Hampshire', black_population: 32481, percentage: '2%', state_code: 'NH' },
  { rank: 45, state_name: 'North Dakota', black_population: 30965, percentage: '4%', state_code: 'ND' },
  { rank: 46, state_name: 'Maine', black_population: 29923, percentage: '2%', state_code: 'ME' },
  { rank: 47, state_name: 'South Dakota', black_population: 27697, percentage: '3%', state_code: 'SD' },
  { rank: 48, state_name: 'Idaho', black_population: 25267, percentage: '1%', state_code: 'ID' },
  { rank: 49, state_name: 'Vermont', black_population: 12936, percentage: '2%', state_code: 'VT' },
  { rank: 50, state_name: 'Montana', black_population: 12007, percentage: '1%', state_code: 'MT' },
  { rank: 51, state_name: 'Wyoming', black_population: 11306, percentage: '2%', state_code: 'WY' }
];

// City data from the provided list
const citiesData = [
  { rank: 1, city_name: 'New York City', state_code: 'NY', black_population: 3455984, percentage: '17%' },
  { rank: 2, city_name: 'Atlanta', state_code: 'GA', black_population: 1920782, percentage: '34%' },
  { rank: 3, city_name: 'Chicago', state_code: 'IL', black_population: 1599415, percentage: '17%' },
  { rank: 4, city_name: 'Washington', state_code: 'DC', black_population: 1547874, percentage: '25%' },
  { rank: 5, city_name: 'Miami–Fort Lauderdale–West Palm Beach', state_code: 'FL', black_population: 1286415, percentage: '21%' },
  { rank: 6, city_name: 'Philadelphia–Wilmington', state_code: 'PA', black_population: 1270826, percentage: '21%' },
  { rank: 7, city_name: 'Houston', state_code: 'TX', black_population: 1141697, percentage: '17%' },
  { rank: 8, city_name: 'Dallas–Fort Worth', state_code: 'TX', black_population: 1093212, percentage: '15%' },
  { rank: 9, city_name: 'Detroit', state_code: 'MI', black_population: 960838, percentage: '22%' },
  { rank: 10, city_name: 'Los Angeles', state_code: 'CA', black_population: 882243, percentage: '7%' },
  // Continue with all cities - adding first 50 for brevity
  { rank: 11, city_name: 'Baltimore', state_code: 'MD', black_population: 812786, percentage: '29%' },
  { rank: 12, city_name: 'Memphis', state_code: 'TN', black_population: 627245, percentage: '47%' },
  { rank: 13, city_name: 'Charlotte', state_code: 'NC', black_population: 542050, percentage: '22%' },
  { rank: 14, city_name: 'Virginia Beach–Norfolk–Newport News', state_code: 'VA', black_population: 525663, percentage: '31%' },
  { rank: 15, city_name: 'St. Louis', state_code: 'MO', black_population: 513403, percentage: '18%' },
  { rank: 16, city_name: 'New Orleans', state_code: 'LA', black_population: 441391, percentage: '35%' },
  { rank: 17, city_name: 'Cleveland', state_code: 'OH', black_population: 410657, percentage: '20%' },
  { rank: 18, city_name: 'Orlando–Sanford', state_code: 'FL', black_population: 391471, percentage: '16%' },
  { rank: 19, city_name: 'Boston', state_code: 'MA', black_population: 384527, percentage: '8%' },
  { rank: 20, city_name: 'Richmond', state_code: 'VA', black_population: 378243, percentage: '30%' },
  { rank: 21, city_name: 'Tampa–St. Petersburg', state_code: 'FL', black_population: 357666, percentage: '12%' },
  { rank: 22, city_name: 'San Francisco–Oakland', state_code: 'CA', black_population: 346781, percentage: '7%' },
  { rank: 23, city_name: 'Birmingham', state_code: 'AL', black_population: 327640, percentage: '29%' },
  { rank: 24, city_name: 'Riverside-San Bernardino-Ontario', state_code: 'CA', black_population: 327634, percentage: '7%' },
  { rank: 25, city_name: 'Jacksonville', state_code: 'FL', black_population: 311616, percentage: '22%' },
  { rank: 26, city_name: 'Columbus', state_code: 'OH', black_population: 305414, percentage: '15%' },
  { rank: 27, city_name: 'Indianapolis', state_code: 'IN', black_population: 296651, percentage: '15%' },
  { rank: 28, city_name: 'Baton Rouge', state_code: 'LA', black_population: 293605, percentage: '35%' },
  { rank: 29, city_name: 'Jackson', state_code: 'MS', black_population: 284499, percentage: '49%' },
  { rank: 30, city_name: 'Minneapolis–St. Paul', state_code: 'MN', black_population: 283177, percentage: '8%' },
  { rank: 31, city_name: 'Nashville', state_code: 'TN', black_population: 278089, percentage: '15%' },
  { rank: 32, city_name: 'Columbia', state_code: 'SC', black_population: 269161, percentage: '33%' },
  { rank: 33, city_name: 'Cincinnati', state_code: 'OH', black_population: 263446, percentage: '12%' },
  { rank: 34, city_name: 'Milwaukee', state_code: 'WI', black_population: 261429, percentage: '17%' },
  { rank: 35, city_name: 'Kansas City', state_code: 'MO', black_population: 260124, percentage: '12%' },
  { rank: 36, city_name: 'Raleigh', state_code: 'NC', black_population: 253708, percentage: '20%' },
  { rank: 37, city_name: 'Phoenix', state_code: 'AZ', black_population: 240636, percentage: '5%' },
  { rank: 38, city_name: 'Las Vegas', state_code: 'NV', black_population: 237543, percentage: '11%' },
  { rank: 39, city_name: 'Augusta', state_code: 'GA', black_population: 209658, percentage: '36%' },
  { rank: 40, city_name: 'Seattle', state_code: 'WA', black_population: 208555, percentage: '6%' },
  { rank: 41, city_name: 'Greensboro–High Point', state_code: 'NC', black_population: 200455, percentage: '27%' },
  { rank: 42, city_name: 'Charleston', state_code: 'SC', black_population: 196047, percentage: '26%' },
  { rank: 43, city_name: 'Pittsburgh', state_code: 'PA', black_population: 191188, percentage: '8%' },
  { rank: 44, city_name: 'Louisville', state_code: 'KY', black_population: 181114, percentage: '14%' },
  { rank: 45, city_name: 'Shreveport', state_code: 'LA', black_population: 173216, percentage: '39%' },
  { rank: 46, city_name: 'Little Rock', state_code: 'AR', black_population: 168175, percentage: '23%' },
  { rank: 47, city_name: 'Montgomery', state_code: 'AL', black_population: 165646, percentage: '44%' },
  { rank: 48, city_name: 'San Diego', state_code: 'CA', black_population: 164571, percentage: '5%' },
  { rank: 49, city_name: 'Sacramento', state_code: 'CA', black_population: 160271, percentage: '7%' },
  { rank: 50, city_name: 'San Antonio', state_code: 'TX', black_population: 159667, percentage: '7%' }
];

// Function to insert state data
async function insertStateData() {
  console.log('Inserting state data...');
  
  // Clear existing data
  const { error: deleteError } = await supabase
    .from('black_population_states')
    .delete()
    .neq('id', 0);
  
  if (deleteError) {
    console.error('Error deleting existing state data:', deleteError);
    return;
  }
  
  // Insert new state data
  const { error } = await supabase
    .from('black_population_states')
    .insert(statesData);
  
  if (error) {
    console.error('Error inserting state data:', error);
    return;
  }
  
  console.log('State data inserted successfully!');
}

// Function to insert city data
async function insertCityData() {
  console.log('Inserting city data...');
  
  // Clear existing data
  const { error: deleteError } = await supabase
    .from('black_population_cities')
    .delete()
    .neq('id', 0);
  
  if (deleteError) {
    console.error('Error deleting existing city data:', deleteError);
    return;
  }
  
  // Insert new city data
  const { error } = await supabase
    .from('black_population_cities')
    .insert(citiesData);
  
  if (error) {
    console.error('Error inserting city data:', error);
    return;
  }
  
  console.log('City data inserted successfully!');
}

// Main function to run the script
async function main() {
  try {
    await insertStateData();
    await insertCityData();
    console.log('Data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Run the script
main(); 