import _ from 'lodash';
import {useState, useEffect, useCallback} from 'react';
import './Home.scss';
import {getVaccineData} from '../../../services/vaccineTrackerService';
import {CURRENT_DATE} from '../../../dictionary/vaccineDataDictionary';
import {getContinentCountriesData} from '../../../helpers/map-vaccine-data';
import SelectDate from '../../shared/SelectDate/SelectDate';

const Home = () => {
    const [data, setData] = useState(null);
    const [currentSort, setCurrentSort] = useState<{[key: string]: string}>({
        continent: '',
        sortBy: '',
        sortDir: ''
    })
    const [currentDate, setCurrentDate] = useState(CURRENT_DATE);

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

    const DateTooltip = (props: any) => {
        if (!props.timeStamps || props.currentDate !== CURRENT_DATE) {
            return null;
        }

        return <div>
                Data last reported on <span>{props.timeStamps[props.keyName]}</span>
            </div>
    }


    const ContinentTables = (props: any) => {
        if (!props.data) {
            return <div>loading....</div>;
        }

        const {groupedByContinent} = props.data;
        const continentKeys = Object.keys(groupedByContinent);

        return <div>{
            _.map(continentKeys, (continentKey, index) => {
                const continentName = groupedByContinent[continentKey].keyName;
                const attributes = {
                    continentName,
                    data: props.data,
                    currentDate: props.currentDate,
                    currentSortContinent: props.currentSortContinent,
                    currentSortDir: props.currentSortDir,
                    currentSortBy: props.currentSortBy
                }
                const continentCountriesData = getContinentCountriesData(attributes);

                return <div key={continentKey + index}>
                    <div>{continentName}</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Ppl. fully vaccinated</th>
                                <th><button onClick={() => {setSortBy(continentName, 'people_vaccinated_per_hundred')}}>Full vaccination %</button></th>
                                <th>Ppl. vaccinated</th>
                                <th>Ppl vaccination %</th>
                                <th>New Cases</th>
                                <th>New Deaths</th>
                                <th><button onClick={() => {setSortBy(continentName, 'icu_patients')}}>ICU Patients</button></th>
                                <th><button onClick={() => {setSortBy(continentName, 'icu_patients_per_million')}}>ICU Patients / mil</button></th>
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
                                        <td>
                                            {country.people_fully_vaccinated}
                                            <DateTooltip currentDate={currentDate} timeStamps={country.time_stamps} keyName='people_fully_vaccinated'></DateTooltip>
                                        </td>
                                        <td>
                                            {country.people_fully_vaccinated_per_hundred}
                                            <DateTooltip currentDate={currentDate} timeStamps={country.time_stamps} keyName='people_fully_vaccinated_per_hundred'></DateTooltip>
                                        </td>
                                        <td>{country.people_vaccinated}</td>
                                        <td>{country.people_vaccinated_per_hundred}</td>
                                        <td>{country.new_cases}</td>
                                        <td>{country.new_deaths}</td>
                                        <td>{country.icu_patients}</td>
                                        <td>{country.icu_patients_per_million}</td>
                                        <td>{country.icuPatientsPerFullyVaccinatedPerHundred}</td>
                                        <td>{country.population}</td>
                                        <td>{country.cardiovasc_death_rate}</td>
                                        <td>{country.hospital_beds_per_thousand}</td>
                                        <td>{country.population_density}</td>
                                        <td>{country.human_development_index}</td>
                                        <td>{country.life_expectancy}</td>
                                        <td>{country.gdp_per_capita}</td>
                                        <td>{country.aged_65_older}</td>
                                        <td>{country.aged_70_older}</td>
                                        <td>{country.extreme_poverty}</td>
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
                datesOptions={(data as any)?.datesOptions}
                selectedDate={currentDate}
                onDateSelect={handleDateChange}
            ></SelectDate>
            <ContinentTables 
                data={data}
                currentDate={currentDate}
                currentSortContinent={currentSort.continent}
                currentSortDir={currentSort.sortDir}
                currentSortBy={currentSort.sortBy}
            ></ContinentTables>
        </div>
    )
};

export default Home;
