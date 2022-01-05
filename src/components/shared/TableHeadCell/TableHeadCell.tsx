import './TableHeadCell.scss';
import PropTypes from 'prop-types';


const TableHeadCell = (props: any) => {
  const {setSortBy, continentName, sortKey, label} = props;
  
  return <th>
    <button 
      onClick={() => {setSortBy(continentName, sortKey)}}
    >
      {label}
    </button>
  </th>
};

TableHeadCell.propTypes = {
  setSortBy: PropTypes.func,
  continentName: PropTypes.string,
  sortKey: PropTypes.string,
  label: PropTypes.string
}

export default TableHeadCell;
