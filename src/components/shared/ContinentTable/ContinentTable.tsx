import PropTypes from 'prop-types';
import { useContext } from 'react';
import { getContinentCountriesData } from '../../../helpers/map-vaccine-data';
import { CONTINENT_TABLE_COLUMNS } from '../../../helpers/tableColumns';
import { DataContext } from '../../../App';
import SortableTable from '../SortableTable/SortableTable';
import './ContinentTable.scss';
import WithSort from '../WithSort/WithSort';

function ContinentTable(props: any) {
  const { continentName, currentDate } = props;
  const data = useContext(DataContext);
  const dataByContinent = (data as any)?.groupedByContinent;
  const attributes = {
    continentName,
    currentDate,
    dataByContinent,
  };
  const continentCountriesData = getContinentCountriesData(attributes);

  const SortedTable = WithSort(SortableTable, continentCountriesData);

  return (
    <div>
      <div>{continentName}</div>
      <SortedTable tableColumns={CONTINENT_TABLE_COLUMNS} currentDate={currentDate} />
    </div>
  );
}

ContinentTable.propTypes = {
  continentName: PropTypes.string,
  currentDate: PropTypes.string,
};

export default ContinentTable;
