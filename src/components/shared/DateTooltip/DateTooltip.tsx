import PropTypes from 'prop-types';
import './DateTooltip.scss';

function DateTooltip(props: any) {
  const { timeStamp, isTooltipVisible } = props;
  if (!timeStamp || !isTooltipVisible) {
    return null;
  }

  return (
    <div>
      Data last reported on
      {' '}
      <span>{timeStamp}</span>
    </div>
  );
}

DateTooltip.propTypes = {
  timeStamp: PropTypes.string,
  isTooltipVisible: PropTypes.bool,
};

export default DateTooltip;
