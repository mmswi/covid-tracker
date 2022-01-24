import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../../App';
import { getContinentDataByName, getCountryDataByName, mapCountryTableData } from '../../../helpers/map-vaccine-data';
import { COUNTRY_TABLE_COLUMNS } from '../../../helpers/tableColumns';
import SortableTable from '../../shared/SortableTable/SortableTable';
import WithSort from '../../shared/WithSort/WithSort';

import './Country.scss';

function Country() {
  const { continent, country } = useParams();
  const data = useContext<any>(DataContext);
  const continentData = getContinentDataByName(data?.groupedByContinent, continent);
  const countryData = getCountryDataByName(continentData?.values, country);
  const tableData = mapCountryTableData(countryData);
  const SortedTable = WithSort(SortableTable, tableData);

  if (!data) {
    return <div>NOT YET....</div>;
  }

  return (
    <div className="Country">
      <h1>
        {country}
      </h1>
      <SortedTable
        tableColumns={COUNTRY_TABLE_COLUMNS}
      />
    </div>
  );
}

export default Country;
