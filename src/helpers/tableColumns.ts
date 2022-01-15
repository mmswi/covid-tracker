export const SHARED_TABLE_COLUMNS = [
  {
    key: 'people_fully_vaccinated',
    label: 'Ppl. fully vaccinated',
  },
  {
    key: 'people_fully_vaccinated_per_hundred',
    label: 'Full vaccination %',
  },
  {
    key: 'people_vaccinated',
    label: 'Ppl. vaccinated',
  },
  {
    key: 'people_vaccinated_per_hundred',
    label: 'Ppl vaccination %',
  },
  {
    key: 'new_cases',
    label: 'New Cases',
  },
  {
    key: 'new_deaths',
    label: 'New Deaths',
  },
  {
    key: 'icu_patients',
    label: 'ICU Patients',
  },
  {
    key: 'icu_patients_per_million',
    label: 'ICU Patients / mil',
  },
  {
    key: 'icuPatientsPerFullyVaccinatedPerHundred',
    label: 'ICU Patients / fully vaccinated %',
  },
  {
    key: 'population',
    label: 'Population',
  },
  {
    key: 'cardiovasc_death_rate',
    label: 'Cardio death rate',
  },
  {
    key: 'hospital_beds_per_thousand',
    label: 'Beds / thousand',
  },
  {
    key: 'population_density',
    label: 'Pop. density',
  },
  {
    key: 'human_development_index',
    label: 'Human dev. index',
  },
  {
    key: 'life_expectancy',
    label: 'Life expectancy',
  },
  {
    key: 'gdp_per_capita',
    label: 'GDPR/capita',
  },
  {
    key: 'aged_65_older',
    label: '65 or older',
  },
  {
    key: 'aged_70_older',
    label: '70 or older',
  },
  {
    key: 'extreme_poverty',
    label: 'Extreme poverty',
  },
];

export const CONTINENT_TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Country',
  },
  ...SHARED_TABLE_COLUMNS,
];

export const COUNTRY_TABLE_COLUMNS = [
  {
    key: 'date',
    label: 'Date',
  },
  ...SHARED_TABLE_COLUMNS,
];
