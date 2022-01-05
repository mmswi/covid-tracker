import _ from 'lodash';
import {useState, useEffect, useCallback} from 'react';
import './Home.scss';
import {getVaccineData} from '../../../services/vaccineTrackerService';
import {CURRENT_DATE} from '../../../dictionary/vaccineDataDictionary';
import {getContinentCountriesData} from '../../../helpers/map-vaccine-data';
import SelectDate from '../../shared/SelectDate/SelectDate';
import DateTooltip from '../../shared/DateTooltip/DateTooltip';
import ContinentTable from '../../shared/ContinentTable/ContinentTable';

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


    const ContinentTables = (props: any) => {
        if (!props.data) {
            return <div>loading....</div>;
        }

        const {groupedByContinent} = props;
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

                return <ContinentTable 
                            key={continentKey}
                            continentName={continentName}
                            currentDate={currentDate}
                            continentCountriesData={continentCountriesData}
                            setSortBy={setSortBy}
                        ></ContinentTable>
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
                groupedByContinent={(data as any)?.groupedByContinent}
                currentDate={currentDate}
                currentSortContinent={currentSort.continent}
                currentSortDir={currentSort.sortDir}
                currentSortBy={currentSort.sortBy}
            ></ContinentTables>
        </div>
    )
};

export default Home;
