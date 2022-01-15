import { useState } from 'react';
import './Home.scss';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import SelectDate from '../../shared/SelectDate/SelectDate';
import ContinentTables from '../../children/ContinentTables/ContinentTables';

function Home(props: any) {
  const [currentDate, setCurrentDate] = useState(CURRENT_DATE);

  const handleDateChange = (date: string) => {
    setCurrentDate(date);
    console.log('currentDate ', currentDate);
  };

  return (
    <div className="Home">
      Home Component
      <SelectDate
        selectedDate={currentDate}
        onDateSelect={handleDateChange}
      />
      <ContinentTables
        currentDate={currentDate}
      />
    </div>
  );
}

export default Home;
