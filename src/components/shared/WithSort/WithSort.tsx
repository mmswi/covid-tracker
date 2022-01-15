import _ from 'lodash';
import { useState } from 'react';
import './WithSort.scss';

function WithSort(Element: any, data: any) {
  const [currentSort, setCurrentSort] = useState<{[key: string]: string}>({
    sortBy: '',
    sortDir: '',
  });

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

  const sortedData = _.orderBy(data, [currentSort.sortBy], [currentSort.sortDir as 'asc' | 'desc']);

  return (props: any) => <Element {...props} data={sortedData} setSortBy={setSortBy} />;
}

export default WithSort;
