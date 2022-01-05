import './TableHeadCell.scss';
import PropTypes from 'prop-types';


const TableHeadCell = (props: any) => {
  const {setSortBy, sortKey, label} = props;
  
  return <th>
    <button 
      onClick={() => {setSortBy(sortKey)}}
    >
      {label}
    </button>
  </th>
};

TableHeadCell.propTypes = {
  setSortBy: PropTypes.func,
  sortKey: PropTypes.string,
  label: PropTypes.string
}

export default TableHeadCell;
