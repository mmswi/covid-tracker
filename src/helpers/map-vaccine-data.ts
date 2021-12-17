import _ from 'lodash';
import {CURRENT_DATE} from '../dictionary/vaccineDataDictionary';

const dayObject = {
    'date': undefined,
    'icu_patients': undefined,
    'icu_patients_per_million': undefined,
    'new_cases': undefined,
    'new_cases_per_million': undefined,
    'new_cases_smoothed': undefined,
    'new_cases_smoothed_per_million': undefined,
    'new_deaths': undefined,
    'new_deaths_per_million': undefined,
    'new_deaths_smoothed': undefined,
    'new_deaths_smoothed_per_million': undefined,
    'new_people_vaccinated_smoothed': undefined,
    'new_people_vaccinated_smoothed_per_hundred': undefined,
    'new_tests_smoothed': undefined,
    'new_tests_smoothed_per_thousand': undefined,
    'new_vaccinations': undefined,
    'new_vaccinations_smoothed': undefined,
    'people_vaccinated': undefined,
    'people_vaccinated_per_hundred': undefined,
    'people_fully_vaccinated': undefined,
    'people_fully_vaccinated_per_hundred': undefined,
    'positive_rate': undefined,
    'reproduction_rate': undefined,
    'stringency_index': undefined,
    'tests_per_case': undefined,
    'tests_units': undefined,
    'total_boosters': undefined,
    'total_boosters_per_hundred': undefined,
    'total_cases': undefined,
    'total_cases_per_million': undefined,
    'total_deaths': undefined,
    'total_deaths_per_million': undefined,
    'total_vaccinations': undefined,
    'total_vaccinations_per_hundred': undefined
}

export const mapByContinentAndLocation = (data: any): any => {
    const countryKeys = Object.keys(data);
    let datesOptions: any = [];
    let groupedByContinent: any = {};


    _.each(countryKeys, (key) => {
        const countryObject = addDataTimeStamps(data[key]);
        const {continent} = countryObject;
        const lastOneHundredDaysOfData = getLastHundredDays(countryObject);

        if (!_.isUndefined(continent)) {
            const countryData = getCountryDataWithLastHundredDays(countryObject, lastOneHundredDaysOfData);

            groupedByContinent = groupByObjectKey(countryData, continent, groupedByContinent);
        }

        if (datesOptions.length === 0) {
            datesOptions = getDatesOptions(lastOneHundredDaysOfData);
        }
    });

    console.log('datesOptions: ', datesOptions)
    console.log('groupedByContinent: ', groupedByContinent)

    return {
        datesOptions,
        groupedByContinent
    }
}

function groupByObjectKey(dataObject: any, groupByKey: string, groupedObject: any) {
    const key = _.camelCase(groupByKey);
    const valueArray = groupedObject[key]?.values ? [...groupedObject[key].values, dataObject] : [dataObject];

    return {
        ...groupedObject,
        [key]: {
            keyName: groupByKey,
            values: valueArray
        }
    }
}

function getCountryDataWithLastHundredDays(countryObject: any, lastHundredDays: any): any {
    const {latestDayData, timeStamps} = getLatestCountryDataInLastDay(countryObject, lastHundredDays);

    return  {
        ...countryObject,
        timeStamps,
        data: [...lastHundredDays, latestDayData]
    };
}

function addDataTimeStamps(countryObject: any): any {
    const timeStamps = getInitTimeStamps();

    return {
        ...countryObject,
        timeStamps
    }
}

function getLatestCountryDataInLastDay(countryObject: any, daysData: any = []) {
    const latestDayData = getFilledDayObjectWithLastDayData(daysData);
    const firstPreviousDayIndex = daysData.length - 2;
    let {timeStamps} = countryObject;

    _.each(Object.keys(latestDayData), (key) => {
        if (key === 'date') {
            latestDayData[key] = CURRENT_DATE;
            return;
        }

        let previousDayIndex = firstPreviousDayIndex;
        let keyValueIsUndefined = _.isUndefined(latestDayData[key]);

            if (keyValueIsUndefined) {
                while(previousDayIndex >= 0 && keyValueIsUndefined) {
                    latestDayData[key] = daysData[previousDayIndex]?.[key];
                    timeStamps = {
                        ...timeStamps,
                        [key]: daysData[previousDayIndex]?.date
                    }

                    keyValueIsUndefined = _.isUndefined(latestDayData[key])

                    previousDayIndex--;
                }
            }
        })

    return {
        latestDayData,
        timeStamps
    };
}

function getFilledDayObjectWithLastDayData(data: any) {
    return {
        ...dayObject,
        ...data[data.length - 1]
    }    
}

function getInitTimeStamps(): any {
    const timeStamps: any = {
        ...dayObject
    };

    _.each(Object.keys(timeStamps), (key) => {
        timeStamps[key] = CURRENT_DATE
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
