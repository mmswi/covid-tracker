import _ from 'lodash';
import { CURRENT_DATE } from '../dictionary/vaccineDataDictionary';
import { ContinentCountryDataGetterAttributesInterface, ContinentCountryDataInterface, CountryDataInterface } from '../interfaces/countryDataInteface';

const dayObject = {
  date: undefined,
  icu_patients: undefined,
  icu_patients_per_million: undefined,
  new_cases: undefined,
  new_cases_per_million: undefined,
  new_cases_smoothed: undefined,
  new_cases_smoothed_per_million: undefined,
  new_deaths: undefined,
  new_deaths_per_million: undefined,
  new_deaths_smoothed: undefined,
  new_deaths_smoothed_per_million: undefined,
  new_people_vaccinated_smoothed: undefined,
  new_people_vaccinated_smoothed_per_hundred: undefined,
  new_tests_smoothed: undefined,
  new_tests_smoothed_per_thousand: undefined,
  new_vaccinations: undefined,
  new_vaccinations_smoothed: undefined,
  people_vaccinated: undefined,
  people_vaccinated_per_hundred: undefined,
  people_fully_vaccinated: undefined,
  people_fully_vaccinated_per_hundred: undefined,
  positive_rate: undefined,
  reproduction_rate: undefined,
  stringency_index: undefined,
  tests_per_case: undefined,
  tests_units: undefined,
  total_boosters: undefined,
  total_boosters_per_hundred: undefined,
  total_cases: undefined,
  total_cases_per_million: undefined,
  total_deaths: undefined,
  total_deaths_per_million: undefined,
  total_vaccinations: undefined,
  total_vaccinations_per_hundred: undefined,
};

export const mapByContinentAndLocation = (data: any): any => {
  const countryKeys = Object.keys(data);
  let datesOptions: any = [];
  let groupedByContinent: any = {};

  _.each(countryKeys, (key) => {
    const countryObject = addDataTimeStamps(data[key]);
    const { continent } = countryObject;
    const lastOneHundredDaysOfData = getLastHundredDays(countryObject);

    if (!_.isUndefined(continent)) {
      const countryData = getCountryDataWithLastHundredDays(countryObject, lastOneHundredDaysOfData);

      groupedByContinent = groupByObjectKey(countryData, continent, groupedByContinent);
    }

    if (datesOptions.length === 0) {
      datesOptions = getDatesOptions(lastOneHundredDaysOfData);
    }
  });

  console.log('datesOptions: ', datesOptions);
  console.log('groupedByContinent: ', groupedByContinent);

  return {
    datesOptions,
    groupedByContinent,
  };
};

export function getContinentCountriesData(attributes: ContinentCountryDataGetterAttributesInterface): ContinentCountryDataInterface[] {
  const tableData = mapTableData(attributes.dataByContinent, attributes.currentDate);
  const continentData = _.find(tableData, ['continentName', attributes.continentName]);

  if (!attributes.currentSortDir) {
    return continentData.countries;
  }

  return getSortedContinentData(continentData, attributes.currentSortBy, (attributes.currentSortDir as 'asc' | 'desc'));
}

function groupByObjectKey(dataObject: any, groupByKey: string, groupedObject: any) {
  const key = _.camelCase(groupByKey);
  const valueArray = groupedObject[key]?.values ? [...groupedObject[key].values, dataObject] : [dataObject];

  return {
    ...groupedObject,
    [key]: {
      keyName: groupByKey,
      values: valueArray,
    },
  };
}

function getCountryDataWithLastHundredDays(countryObject: any, lastHundredDays: any): any {
  const { latestDayData, time_stamps } = getLatestCountryDataInLastDay(countryObject, lastHundredDays);

  return {
    ...countryObject,
    time_stamps,
    data: [...lastHundredDays, latestDayData],
  };
}

function addDataTimeStamps(countryObject: any): any {
  const time_stamps = getInitTimeStamps();

  return {
    ...countryObject,
    time_stamps,
  };
}

function getLatestCountryDataInLastDay(countryObject: any, daysData: any = []) {
  const latestDayData = getFilledDayObjectWithLastDayData(daysData);
  const firstPreviousDayIndex = daysData.length - 2;
  let { time_stamps } = countryObject;

  _.each(Object.keys(latestDayData), (key) => {
    if (key === 'date') {
      latestDayData[key] = CURRENT_DATE;
      return;
    }

    let previousDayIndex = firstPreviousDayIndex;
    let keyValueIsUndefined = _.isUndefined(latestDayData[key]);

    if (keyValueIsUndefined) {
      while (previousDayIndex >= 0 && keyValueIsUndefined) {
        latestDayData[key] = daysData[previousDayIndex]?.[key];
        time_stamps = {
          ...time_stamps,
          [key]: daysData[previousDayIndex]?.date,
        };

        keyValueIsUndefined = _.isUndefined(latestDayData[key]);

        previousDayIndex--;
      }
    }
  });

  return {
    latestDayData,
    time_stamps,
  };
}

function getFilledDayObjectWithLastDayData(data: any) {
  return {
    ...dayObject,
    ...data[data.length - 1],
  };
}

function getInitTimeStamps(): any {
  const timeStamps: any = {
    ...dayObject,
  };

  _.each(Object.keys(timeStamps), (key) => {
    timeStamps[key] = CURRENT_DATE;
  });

  return timeStamps;
}

function getLastHundredDays(countryObject: any): any {
  if (!countryObject?.data) {
    return [];
  }

  return _.slice(countryObject.data, -100);
}

function getDatesOptions(days: any[]): string[] {
  const datesOptions = [CURRENT_DATE];
  let index = days.length - 1;

  while (index >= 0) {
    datesOptions.push(days[index--].date);
  }

  return datesOptions;
}

function mapTableData(dataByContinent: any, date: any): any {
  if (!dataByContinent) {
    return;
  }

  const continentKeys = Object.keys(dataByContinent);

  return _.map(continentKeys, (continentKey) => {
    const continentName = dataByContinent[continentKey].keyName;
    const countries = dataByContinent[continentKey].values;
    const continentData: any = {
      continentName,
    };
    continentData.countries = _.map(countries, (country: CountryDataInterface) => {
      const countryData = getCountryData(country.data, date);

      return {
        name: country.location,
        population: country.population,
        aged_65_older: country.aged_65_older,
        aged_70_older: country.aged_70_older,
        cardiovasc_death_rate: country.cardiovasc_death_rate,
        hospital_beds_per_thousand: country.hospital_beds_per_thousand,
        population_density: country.population_density,
        human_development_index: country.human_development_index,
        life_expectancy: country.life_expectancy,
        gdp_per_capita: country.gdp_per_capita,
        extreme_poverty: country.extreme_poverty,
        people_fully_vaccinated: countryData.people_fully_vaccinated,
        people_fully_vaccinated_per_hundred: countryData.people_fully_vaccinated_per_hundred,
        people_vaccinated: countryData.people_vaccinated,
        people_vaccinated_per_hundred: countryData.people_vaccinated_per_hundred,
        new_cases: countryData.new_cases,
        new_deaths: countryData.new_deaths,
        icu_patients: countryData.icu_patients,
        icu_patients_per_million: countryData.icu_patients_per_million,
        icuPatientsPerFullyVaccinatedPerHundred: getIcuPerFullyVacc(countryData),
        total_boosters: countryData.total_boosters,
        total_boosters_per_hundred: countryData.total_boosters_per_hundred,
        time_stamps: country.time_stamps,
      };
    });

    return continentData;
  });
}

function getCountryData(data: any, date: any): any {
  return _.find(data, ['date', date]) || {};
}

function getIcuPerFullyVacc(countryData: any): number | string {
  const { icu_patients, people_fully_vaccinated } = countryData;

  if (!icu_patients) {
    return 'N/A';
  }

  return ((icu_patients / people_fully_vaccinated) * 100).toFixed(5);
}

function getSortedContinentData(continentData: {countries: []}, sortBy: string, sortDir: 'asc' | 'desc') {
  return _.orderBy(continentData?.countries, [sortBy], [sortDir]);
}
