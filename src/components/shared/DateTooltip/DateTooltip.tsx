import PropTypes from 'prop-types';
import './DateTooltip.scss';

const DateTooltip = (props: any) => {
  if (!props.timeStamp || !props.isTooltipVisible) {
      return null;
  }

  return <div>
          Data last reported on <span>{props.timeStamp}</span>
      </div>
}

DateTooltip.propTypes = {
  timeStamp: PropTypes.string,
  isTooltipVisible: PropTypes.bool
}

export default DateTooltip;
