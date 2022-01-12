import _ from 'lodash';
import { useContext } from "react";
import PropTypes from 'prop-types';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import { DataContext } from '../../../App';
import './SelectDate.scss';

const SelectDate = (props: any) => {
    const data = useContext(DataContext);
    const dates = (data as any)?.datesOptions || [CURRENT_DATE];

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
  selectedDate: PropTypes.string,
  onDateSelect: PropTypes.func
}

export default SelectDate;
