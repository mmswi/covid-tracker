import _ from 'lodash';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import DateTooltip from '../DateTooltip/DateTooltip';
import TableCellNavigation from '../TableCellNavigation/TableCellNavigation';
import TableHeadCell from '../TableHeadCell/TableHeadCell';
import './SortableTable.scss';

function SortableTable(props: any) {
  const {
    currentDate, tableColumns, data: tableData, setSortBy, navColumnKeys, continentKey,
  } = props;

  const getTimeStamps = (country: any = {}) => country.time_stamps || {};
  return (
    <table>
      <thead>
        <tr>
          {
            _.map(tableColumns, (column): any => (
              <TableHeadCell
                key={column.key}
                setSortBy={setSortBy}
                sortKey={column.key}
                label={column.label}
              />
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          _.map(tableData, (country, index) => {
            const timeStamps = getTimeStamps(country);

            return (
              <tr key={country.name + index}>
                {
                  _.map(tableColumns, (column): any => (
                    <td>
                      <TableCellNavigation
                        key={column.key}
                        condition={_.includes(navColumnKeys, column.key)}
                        href={`${column.key}/${continentKey}/${(country as any)[column.key]}`}
                        render={() => (
                          <span>
                            {(country as any)[column.key]}
                            <DateTooltip
                              isTooltipVisible={currentDate === CURRENT_DATE}
                              timeStamp={timeStamps[column.key]}
                            />
                          </span>
                        )}
                      />
                    </td>

                  ))
                  }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default SortableTable;
