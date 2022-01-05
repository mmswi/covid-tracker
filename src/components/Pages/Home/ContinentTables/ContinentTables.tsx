import _ from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { getContinentCountriesData } from '../../../../helpers/map-vaccine-data';
import ContinentTable from '../../../shared/ContinentTable/ContinentTable';
import './ContinentTables.scss';

const ContinentTables = (props: any) => {
  const {
    data,
    groupedByContinent,
    currentDate
  } = props;

  const [currentSort, setCurrentSort] = useState<{[key: string]: string}>({
    continent: '',
    sortBy: '',
    sortDir: ''
})

  const setSortBy = (continent: string, sortBy: string) => {
    if (continent !== currentSort.continent || (continent === currentSort.continent && sortBy !== currentSort.sortBy)) {
        setCurrentSort({
            continent,
            sortBy,
            sortDir: 'asc'
        })
    } else if (continent === currentSort.continent && sortBy === currentSort.sortBy) {
        const sortDir = currentSort.sortDir === 'asc' ? 'desc' : 'asc';
        setCurrentSort(prevState => {
            return {
                ...prevState,
                sortDir
            }
        })
    }
}
  
  if (!data) {
      return <div>loading....</div>;
  }

  const continentKeys = Object.keys(groupedByContinent);

  return <div>{
      _.map(continentKeys, (continentKey: string) => {
          const continentName = groupedByContinent[continentKey].keyName;
          const attributes = {
              continentName,
              data: data,
              currentDate: currentDate,
              currentSortContinent: currentSort.continent,
              currentSortDir: currentSort.sortDir,
              currentSortBy: currentSort.sortBy
          }
          const continentCountriesData = getContinentCountriesData(attributes);

          return <ContinentTable 
                      key={continentKey}
                      continentName={continentName}
                      currentDate={currentDate}
                      continentCountriesData={continentCountriesData}
                      setSortBy={setSortBy}
                  ></ContinentTable>
      })
  }</div>
}

ContinentTables.propTypes = {
  data: PropTypes.object,
  groupedByContinent: PropTypes.object,
  currentDate: PropTypes.string,
}

export default ContinentTables;
