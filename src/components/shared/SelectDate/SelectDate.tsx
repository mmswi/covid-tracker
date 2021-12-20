import _ from 'lodash';
import PropTypes from 'prop-types';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import './SelectDate.scss';

const SelectDate = (props: any) => {
  const dates = props.datesOptions || [CURRENT_DATE];

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

SelectDate.propTypes = {
  datesOptions: PropTypes.arrayOf(PropTypes.string),
  selectedDate: PropTypes.string,
  onDateSelect: PropTypes.func
}

export default SelectDate;
