import {useState} from 'react';
import './Home.scss';
import {CURRENT_DATE} from '../../../dictionary/vaccineDataDictionary';
import SelectDate from '../../shared/SelectDate/SelectDate';
import ContinentTables from '../../children/ContinentTables/ContinentTables';

const Home = (props: any) => {
    const [currentDate, setCurrentDate] = useState(CURRENT_DATE);
    const {data} = props;

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
