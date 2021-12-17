import _ from 'lodash';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import './Home.scss';
import {getVaccineData} from '../../../services/vaccineTrackerService';
import {ContinentDataInterface, CountryDataInterface} from '../../../interfaces/countryDataInteface';
import {CURRENT_DATE} from '../../../dictionary/vaccineDataDictionary';

const Home = () => {
    const [data, setData] = useState(null);
    const [currentSort, setCurrentSort] = useState<{[key: string]: string}>({
        continent: '',
        sortBy: '',
        sortDir: ''
    })
    const [currentDate, setCurrentDate] = useState(CURRENT_DATE);

    const getCountryData = (data: any, date: any): any => {
        return _.find(data, ['date', date]) || {};
    }

    const getIcuPerFullyVacc = (countryData: any): number | string => {
        const {icu_patients, people_fully_vaccinated} = countryData;

        if (!icu_patients) {
            return 'N/A';
        }

        return ((icu_patients/people_fully_vaccinated) * 100).toFixed(5)
    }

    const mapTableData = (data: any, date: any): any => {
        if(!data) {
            return;
        }

        const {groupedByContinent} = data;
        const continentKeys = Object.keys(groupedByContinent);

        return _.map(continentKeys, (continentKey) => {
            const continentName = groupedByContinent[continentKey].keyName;
            const countries = groupedByContinent[continentKey].values;
            const continentData: any = {
                continentName
            }
            continentData.countries = _.map(countries, (country: CountryDataInterface) => {
                const countryData = getCountryData(country.data, date);
                return {
                    name: country.location,
                    population: country.population,
                    agedSixtyFiveOlder: country.aged_65_older,
                    agedSeventyOlder: country.aged_70_older,
                    cardiovascDeathRate: country.cardiovasc_death_rate,
                    hospitalBedsPerThousand: country.hospital_beds_per_thousand,
                    populationDensity: country.population_density,
                    humanDevelopmentIndex: country.human_development_index,
                    lifeExpectancy: country.life_expectancy,
                    gdpPerCapita: country.gdp_per_capita,
                    extremePoverty: country.extreme_poverty,
                    peopleFullyVaccinated: countryData.people_fully_vaccinated,
                    peopleFullyVaccinatedPerHundred: countryData.people_fully_vaccinated_per_hundred,
                    peopleVaccinated: countryData.people_vaccinated,
                    peopleVaccinatedPerHundred: countryData.people_vaccinated_per_hundred,
                    newCases: countryData.new_cases,
                    newDeaths: countryData.new_deaths,
                    icuPatients: countryData.icu_patients,
                    icuPatientsPerMillion: countryData.icu_patients_per_million,
                    icuPatientsPerFullyVaccinatedPerHundred: getIcuPerFullyVacc(countryData),
                    totalBoosters: countryData.total_boosters,
                    totalBoostersPerHundred: countryData.total_boosters_per_hundred
                }
            });

            return continentData;
        });
    }

    const getData = useCallback(async () => {
        try {
            const response = await getVaccineData();
            setData(response);
            console.log('got response', response);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const getMappedTableData = (data: any, currentDate: any) => {
        console.log('getting data for ', currentDate);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useMemo(() => mapTableData(data, currentDate), [data, currentDate])
    }

    const getSortedContinentData = (continentData: {countries: []}, sortBy: string, sortDir: 'asc' | 'desc') => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useMemo(() => _.orderBy(continentData?.countries, [sortBy], [sortDir]), [continentData?.countries, sortBy, sortDir]);
    }

    const getContinentCountriesData = (continent: string): ContinentDataInterface[] => {
        const tableData = getMappedTableData(data, currentDate);
        const continentData = _.find(tableData, ['continentName', continent]);

        if (currentSort.continent !== continent || !currentSort.sortDir) {
            return continentData.countries;
        }

        return getSortedContinentData(continentData, currentSort.sortBy, (currentSort.sortDir as 'asc' | 'desc'));
    }

    const handleDateChange = (date: string) => {
        setCurrentDate(date);
        console.log('currentDate ', currentDate);
    }

    const setSortBy = (continent: string, sortBy: string) => {
        if (continent !== currentSort.continent || (continent === currentSort.continent && sortBy !== currentSort.sortBy)) {
            setCurrentSort({
                continent,
                sortBy,
                sortDir: 'asc'
            })
        } else if (continent === currentSort.continent && sortBy === currentSort.sortBy) {
            const sortDir = currentSort.sortDir === 'asc' ? 'desc' : 'asc';
            setCurrentSort(prevState => {
                return {
                    ...prevState,
                    sortDir
                }
            })
        }
    }

    const SelectDate = (props: any) => {
        const dates = props.data?.datesOptions || [CURRENT_DATE];

        const handleChange = (event: any) => {
            props.onDateSelect(event.target.value);
        }

        return <select value={props.selectedDate} onChange={handleChange}>{
            _.map(dates, (date, index) => {
                return <option
                    key={date + index}
                    value={date}
                >
                    {date}
                </option>
            })
        }</select>
    }


    const DisplayContinents = (props: any) => {
        if (!props.data) {
            return <div>loading....</div>;
        }

        const {groupedByContinent} = props.data;
        const continentKeys = Object.keys(groupedByContinent);

        return <div>{
            _.map(continentKeys, (continentKey, index) => {
                const continentName = groupedByContinent[continentKey].keyName;
                const continentCountriesData = getContinentCountriesData(continentName);

                return <div key={continentKey + index}>
                    <div>{continentName}</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Ppl. fully vaccinated</th>
                                <th><button onClick={() => {setSortBy(continentName, 'peopleFullyVaccinatedPerHundred')}}>Full vaccination %</button></th>
                                <th>Ppl. vaccinated</th>
                                <th>Ppl vaccination %</th>
                                <th>New Cases</th>
                                <th>New Deaths</th>
                                <th><button onClick={() => {setSortBy(continentName, 'icuPatients')}}>ICU Patients</button></th>
                                <th><button onClick={() => {setSortBy(continentName, 'icuPatientsPerMillion')}}>ICU Patients / mil</button></th>
                                <th><button onClick={() => {setSortBy(continentName, 'icuPatientsPerFullyVaccinatedPerHundred')}}>ICU Patients / fully vaccinated %</button></th>
                                <th>Population</th>
                                <th>Cardio death rate</th>
                                <th>Beds / thousand</th>
                                <th>Pop. density</th>
                                <th>Human dev. index</th>
                                <th>Life expectancy</th>
                                <th>GDPR/capita</th>
                                <th>65 or older</th>
                                <th>70 or older</th>
                                <th>Extreme poverty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.map(continentCountriesData, (country, index) => {

                                    return <tr key={country.name + index}>
                                        <td>{country.name}</td>
                                        <td>{country.peopleFullyVaccinated}</td>
                                        <td>{country.peopleFullyVaccinatedPerHundred}</td>
                                        <td>{country.peopleVaccinated}</td>
                                        <td>{country.peopleVaccinatedPerHundred}</td>
                                        <td>{country.newCases}</td>
                                        <td>{country.newDeaths}</td>
                                        <td>{country.icuPatients}</td>
                                        <td>{country.icuPatientsPerMillion}</td>
                                        <td>{country.icuPatientsPerFullyVaccinatedPerHundred}</td>
                                        <td>{country.population}</td>
                                        <td>{country.cardiovascDeathRate}</td>
                                        <td>{country.hospitalBedsPerThousand}</td>
                                        <td>{country.populationDensity}</td>
                                        <td>{country.humanDevelopmentIndex}</td>
                                        <td>{country.lifeExpectancy}</td>
                                        <td>{country.gdpPerCapita}</td>
                                        <td>{country.agedSixtyFiveOlder}</td>
                                        <td>{country.agedSeventyOlder}</td>
                                        <td>{country.extremePoverty}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            })
        }</div>
    }

    return (
        <div className="Home">
            Home Component
            <SelectDate
                data={data}
                selectedDate={currentDate}
                onDateSelect={handleDateChange}
            ></SelectDate>
            <DisplayContinents data={data}></DisplayContinents>
        </div>
    )
};

export default Home;
