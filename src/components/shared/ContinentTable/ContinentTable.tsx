import _ from 'lodash';
import PropTypes from 'prop-types';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import { TABLE_COLUMNS } from '../../../helpers/tableColumns';
import TableDataCell from '../TableDataCell/TableDataCell';
import TableHeadCell from '../TableHeadCell/TableHeadCell';
import './ContinentTable.scss';

const ContinentTable = (props: any) => {
  const {continentName, setSortBy, currentDate, continentCountriesData} = props;
  const getTimeStamps = (country: any = {}) => country.time_stamps || {};

  return <div>
            <div>{continentName}</div>
            <table>
              <thead>
                <tr>
                  {
                    _.map(TABLE_COLUMNS, (data): any => (
                      <TableHeadCell
                        key={data.key}
                        setSortBy={setSortBy}
                        continentName={continentName}
                        sortKey={data.key}
                        label={data.label}
                      ></TableHeadCell>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  _.map(continentCountriesData, (country, index) => {
                      const timeStamps = getTimeStamps(country);

                      return <tr key={country.name + index}>
                                {
                                  _.map(TABLE_COLUMNS, (data): any => (
                                    <TableDataCell
                                      key={data.key}
                                      label={country[data.key]}
                                      isTooltipVisible={currentDate === CURRENT_DATE}
                                      timeStamp={timeStamps[data.key]}
                                    ></TableDataCell>
                                  ))
                                }
                      </tr>
                  })
                }
              </tbody>
            </table>
          </div>
};

ContinentTable.propTypes = {
  setSortBy: PropTypes.func,
  continentName: PropTypes.string,
  currentDate: PropTypes.string,
  continentCountriesData: PropTypes.array
}

export default ContinentTable;
