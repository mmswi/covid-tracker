import _ from 'lodash';
import PropTypes from 'prop-types';
import ContinentTable from '../../shared/ContinentTable/ContinentTable';
import './ContinentTables.scss';

const ContinentTables = (props: any) => {
  const {
    dataByContinent,
    currentDate
  } = props;
  
  if (!dataByContinent) {
      return <div>loading....</div>;
  }

  const continentKeys = Object.keys(dataByContinent);

  return <div>{
      _.map(continentKeys, (continentKey: string) => {
          const continentName = dataByContinent[continentKey].keyName;
          
          return <ContinentTable 
                      key={continentKey}
                      continentName={continentName}
                      dataByContinent={dataByContinent}
                      currentDate={currentDate}
                  ></ContinentTable>
      })
  }</div>
}

ContinentTables.propTypes = {
  data: PropTypes.object,
  dataByContinent: PropTypes.object,
  currentDate: PropTypes.string,
}

export default ContinentTables;
