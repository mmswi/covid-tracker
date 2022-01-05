export interface CountryDataInterface {
    aged_65_older: number;
    aged_70_older: number;
    cardiovasc_death_rate: number;
    continent: string;
    data: CountryVaccineDataInteface[];
    diabetes_prevalence: number;
    extreme_poverty: number;
    female_smokers: number;
    gdp_per_capita: number;
    hospital_beds_per_thousand: number;
    human_development_index: number;
    life_expectancy: number;
    location: string;
    male_smokers: number;
    median_age: number;
    population: number;
    population_density: number;
    time_stamps: any;
}

export interface CountryVaccineDataInteface {
    date: string;
    icu_patients?: number;
    icu_patients_per_million?: number;
    new_cases: number;
    new_cases_per_million: number;
    new_cases_smoothed: number;
    new_cases_smoothed_per_million: number;
    new_deaths: number;
    new_deaths_per_million: number;
    new_deaths_smoothed: number;
    new_deaths_smoothed_per_million: number;
    new_people_vaccinated_smoothed: number;
    new_people_vaccinated_smoothed_per_hundred: number;
    new_tests_smoothed: number;
    new_tests_smoothed_per_thousand: number;
    new_vaccinations: number;
    new_vaccinations_smoothed: number;
    people_vaccinated: number;
    people_vaccinated_per_hundred: number;
    people_fully_vaccinated: number;
    people_fully_vaccinated_per_hundred: number;
    positive_rate: number;
    reproduction_rate: number;
    stringency_index: number;
    tests_per_case: number;
    tests_units: string;
    total_boosters: number;
    total_boosters_per_hundred: number;
    total_cases: number;
    total_cases_per_million: number;
    total_deaths: number;
    total_deaths_per_million: number;
    total_vaccinations: number;
    total_vaccinations_per_hundred: number;
}

export interface ContinentCountryDataInterface {
    name: string;
    population: number;
    aged_65_older: number;
    aged_70_older: number;
    cardiovasc_death_rate: number;
    hospital_beds_per_thousand: number;
    population_density: number;
    human_development_index: number;
    life_expectancy: number;
    gdp_per_capita: number;
    extreme_poverty: number;
    people_fully_vaccinated: number;
    people_fully_vaccinated_per_hundred: number;
    people_vaccinated: number;
    people_vaccinated_per_hundred: number;
    new_cases: number;
    new_deaths: number;
    icu_patients: number;
    icu_patients_per_million: number;
    icuPatientsPerFullyVaccinatedPerHundred: number | string;
    total_boosters: number;
    total_boosters_per_hundred: number;
    time_stamps: any;
}

export interface ContinentCountryDataGetterAttributesInterface {
    continentName: string; 
    data: object; 
    currentDate: string; 
    currentSortContinent: string;
    currentSortDir: string; 
    currentSortBy: string;
}