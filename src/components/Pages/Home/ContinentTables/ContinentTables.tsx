import _ from 'lodash';
import PropTypes from 'prop-types';
import { getContinentCountriesData } from '../../../../helpers/map-vaccine-data';
import ContinentTable from '../../../shared/ContinentTable/ContinentTable';
import './ContinentTables.scss';

const ContinentTables = (props: any) => {
  const {
    data,
    groupedByContinent,
    currentDate,
    currentSortContinent,
    currentSortDir,
    currentSortBy,
    setSortBy
  } = props;
  
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
              currentSortContinent: currentSortContinent,
              currentSortDir: currentSortDir,
              currentSortBy: currentSortBy
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
  data: PropTypes.array,
  data: PropTypes.object,
  groupedByContinent: PropTypes.object,
  setSortBy: PropTypes.func,
  currentDate: PropTypes.string,
  currentSortContinent: PropTypes.string,
  currentSortDir: PropTypes.string,
  currentSortBy: PropTypes.string
}

export default ContinentTables;
