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
    console.log('data: ', data);
    const dataKeys = Object.keys(data);
    let datesOptions: any = [];
    let groupedByContinent: any = {};
    let groupedByLocation: any = {};


    _.each(dataKeys, (key) => {
        const dataObject = data[key];
        const {continent} = dataObject;
        const {location} = dataObject;
        const lastOneHundredDaysOfData = getLastHundredDays(dataObject);
        console.log('dataObject ', dataObject)

        if (!_.isUndefined(continent)) {
            let countryData = getCountryDataWithLastHundredDays(dataObject, lastOneHundredDaysOfData);
            countryData = addDataTimeStamps(countryData);

            groupedByContinent = groupByObjectKey(countryData, continent, groupedByContinent);
        } else if (!_.isUndefined(location)) {
            groupedByLocation = groupByObjectKey(dataObject, location, groupedByLocation);
        }

        if (datesOptions.length === 0) {
            datesOptions = getDatesOptions(lastOneHundredDaysOfData);
        }
    });

    console.log('datesOptions: ', datesOptions)
    console.log('groupedByContinent: ', groupedByContinent)
    console.log('groupedByLocation: ', groupedByLocation)

    return {
        datesOptions,
        groupedByContinent,
        groupedByLocation
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
    const lastFilledDay = fillLastDayCountryData(lastHundredDays);

    return  {
        ...countryObject,
        data: [...lastHundredDays, lastFilledDay]
    };
}

function addDataTimeStamps(countryObject: any): any {
    const timeStamps = getInitTimeStamps();
    
    return {
        ...countryObject,
        timeStamps
    }
}

function fillLastDayCountryData(data: any = []) {
    const filledData = mapCurrentDay(data[data.length - 1]);
    const firstPreviousDayIndex = data.length - 2;

    _.each(Object.keys(filledData), (key) => {
        if (key === 'date') {
            filledData[key] = CURRENT_DATE;
            return;
        }

        let previousDayIndex = firstPreviousDayIndex;
        let keyValueIsUndefined = _.isUndefined(filledData[key].value);

            if (keyValueIsUndefined) {
                while(previousDayIndex >= 0 && keyValueIsUndefined) {
                    filledData[key] = {
                        value: data[previousDayIndex]?.[key],
                        timeProvided: data[previousDayIndex]?.date
                    };

                    keyValueIsUndefined = _.isUndefined(filledData[key].value)

                    previousDayIndex--;
                }
            }
        })

    return filledData;
}

function mapCurrentDay(data: any) {
    const filledData = {
        ...dayObject,
        ...data
    };

    _.each(Object.keys(filledData), (key) => {
        if (key === 'date') {
            return;
        }

        filledData[key] = {
            value: filledData[key],
            timeProvided: CURRENT_DATE
        }
    })

    return filledData;
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
