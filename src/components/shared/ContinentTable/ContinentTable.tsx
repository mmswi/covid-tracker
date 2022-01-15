import _ from 'lodash';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import { getContinentCountriesData } from '../../../helpers/map-vaccine-data';
import { TABLE_COLUMNS } from '../../../helpers/tableColumns';
import { DataContext } from '../../../App';
import TableDataCell from '../TableDataCell/TableDataCell';
import TableHeadCell from '../TableHeadCell/TableHeadCell';
import './ContinentTable.scss';

function ContinentTable(props: any) {
  const { continentName, currentDate } = props;
  const data = useContext(DataContext);
  const dataByContinent = (data as any)?.groupedByContinent;
  const [currentSort, setCurrentSort] = useState<{[key: string]: string}>({
    sortBy: '',
    sortDir: '',
  });
  const attributes = {
    continentName,
    currentDate,
    dataByContinent,
    currentSortDir: currentSort.sortDir,
    currentSortBy: currentSort.sortBy,
  };
  const continentCountriesData = getContinentCountriesData(attributes);

  const getTimeStamps = (country: any = {}) => country.time_stamps || {};
  const setSortBy = (sortBy: string) => {
    if (sortBy !== currentSort.sortBy) {
      setCurrentSort({
        sortBy,
        sortDir: 'asc',
      });
    } else {
      const sortDir = currentSort.sortDir === 'asc' ? 'desc' : 'asc';

      setCurrentSort((prevState) => ({
        ...prevState,
        sortDir,
      }));
    }
  };

  return (
    <div>
      <div>{continentName}</div>
      <table>
        <thead>
          <tr>
            {
                    _.map(TABLE_COLUMNS, (data): any => (
                      <TableHeadCell
                        key={data.key}
                        setSortBy={setSortBy}
                        sortKey={data.key}
                        label={data.label}
                      />
                    ))
                  }
          </tr>
        </thead>
        <tbody>
          {
                  _.map(continentCountriesData, (country, index) => {
                    const timeStamps = getTimeStamps(country);

                    return (
                      <tr key={country.name + index}>
                        {
                                  _.map(TABLE_COLUMNS, (data): any => (
                                    <TableDataCell
                                      key={data.key}
                                      label={(country as any)[data.key]}
                                      isTooltipVisible={currentDate === CURRENT_DATE}
                                      timeStamp={timeStamps[data.key]}
                                    />
                                  ))
                                }
                      </tr>
                    );
                  })
                }
        </tbody>
      </table>
    </div>
  );
}

ContinentTable.propTypes = {
  continentName: PropTypes.string,
  currentDate: PropTypes.string,
  continentCountriesData: PropTypes.array,
};

export default ContinentTable;
