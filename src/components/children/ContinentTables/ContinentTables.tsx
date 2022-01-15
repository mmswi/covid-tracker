import _ from 'lodash';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import ContinentTable from '../../shared/ContinentTable/ContinentTable';
import { DataContext } from '../../../App';
import './ContinentTables.scss';

function ContinentTables(props: any) {
  const { currentDate } = props;
  const data = useContext(DataContext);
  const dataByContinent = (data as any)?.groupedByContinent;

  console.log('dataByContinent: ', dataByContinent);

  if (!dataByContinent) {
    return <div>loading....</div>;
  }

  const continentKeys = Object.keys(dataByContinent);

  return (
    <div>
      {
      _.map(continentKeys, (continentKey: string) => {
        const continentName = dataByContinent[continentKey].keyName;

        return (
          <ContinentTable
            key={continentKey}
            continentName={continentName}
            currentDate={currentDate}
          />
        );
      })
  }
    </div>
  );
}

ContinentTables.propTypes = {
  data: PropTypes.object,
  currentDate: PropTypes.string,
};

export default ContinentTables;
