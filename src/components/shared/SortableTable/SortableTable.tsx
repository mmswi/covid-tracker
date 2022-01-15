import _ from 'lodash';
// import PropTypes from 'prop-types';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import TableDataCell from '../TableDataCell/TableDataCell';
import TableHeadCell from '../TableHeadCell/TableHeadCell';
import './SortableTable.scss';

function SortableTable(props: any) {
  const {
    currentDate, tableColumns, data: tableData, setSortBy,
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
                    <TableDataCell
                      key={column.key}
                      label={(country as any)[column.key]}
                      isTooltipVisible={currentDate === CURRENT_DATE}
                      timeStamp={timeStamps[column.key]}
                    />
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
