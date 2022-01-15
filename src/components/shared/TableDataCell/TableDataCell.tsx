import PropTypes from 'prop-types';
import DateTooltip from '../DateTooltip/DateTooltip';
import './TableDataCell.scss';

function TableDataCell(props: any) {
  const { label, timeStamp, isTooltipVisible } = props;

  return (
    <td>
      {label}
      <DateTooltip
        isTooltipVisible={isTooltipVisible}
        timeStamp={timeStamp}
      />
    </td>
  );
}

TableDataCell.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  timeStamp: PropTypes.string,
  isTooltipVisible: PropTypes.bool,
};

export default TableDataCell;
