import {useState, useEffect, useCallback} from 'react';
import './Home.scss';
import {getVaccineData} from '../../../services/vaccineTrackerService';
import {CURRENT_DATE} from '../../../dictionary/vaccineDataDictionary';
import SelectDate from '../../shared/SelectDate/SelectDate';
import ContinentTables from '../../children/ContinentTables/ContinentTables';

const Home = () => {
    const [data, setData] = useState(null);
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

    return (
        <div className="Home">
            Home Component
            <SelectDate
                datesOptions={(data as any)?.datesOptions}
                selectedDate={currentDate}
                onDateSelect={handleDateChange}
            ></SelectDate>
            <ContinentTables 
                dataByContinent={(data as any)?.groupedByContinent}
                currentDate={currentDate}
            ></ContinentTables>
        </div>
    )
};

export default Home;
