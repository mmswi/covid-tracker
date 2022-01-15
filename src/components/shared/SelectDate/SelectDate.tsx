import _ from 'lodash';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import { DataContext } from '../../../App';
import './SelectDate.scss';

function SelectDate(props: any) {
  const { selectedDate, onDateSelect } = props;
  const data = useContext(DataContext);
  const dates = (data as any)?.datesOptions || [CURRENT_DATE];

  const handleChange = (event: any) => {
    onDateSelect(event.target.value);
  };

  return (
    <select value={selectedDate} onChange={handleChange}>
      {
        _.map(dates, (date, index) => (
          <option
            key={date + index}
            value={date}
          >
            {date}
          </option>
        ))
    }
    </select>
  );
}

SelectDate.propTypes = {
  selectedDate: PropTypes.string,
  onDateSelect: PropTypes.func,
};

export default SelectDate;
