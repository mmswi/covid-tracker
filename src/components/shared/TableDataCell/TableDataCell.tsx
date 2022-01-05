import PropTypes from 'prop-types';
import DateTooltip from '../DateTooltip/DateTooltip';
import './TableDataCell.scss';

const TableDataCell = (props: any) => {
  const {label, timeStamp, isTooltipVisible} = props;

  return <td>
          {label}
          <DateTooltip 
            isTooltipVisible={isTooltipVisible} 
            timeStamp={timeStamp}
          ></DateTooltip>
        </td>
};

TableDataCell.propTypes = {
  label: PropTypes.string,
  timeStamp: PropTypes.string,
  isTooltipVisible: PropTypes.bool
}


export default TableDataCell;
