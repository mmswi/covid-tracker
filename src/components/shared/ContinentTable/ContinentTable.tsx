import _ from 'lodash';
import PropTypes from 'prop-types';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import { TABLE_COLUMNS } from '../../../helpers/tableColumns';
import DateTooltip from '../DateTooltip/DateTooltip';
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
                      <th>
                        <button 
                          onClick={() => {setSortBy(continentName, data.key)}}
                        >
                          {data.label}
                        </button>
                      </th>
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
                                    <td>
                                      {country[data.key]}
                                      <DateTooltip 
                                        isTooltipVisible={currentDate === CURRENT_DATE} 
                                        timeStamp={timeStamps[data.key]}
                                      ></DateTooltip>
                                    </td>
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
  continentKey: PropTypes.string,
  continentName: PropTypes.string,
  currentDate: PropTypes.string,
  continentCountriesData: PropTypes.array
}

export default ContinentTable;