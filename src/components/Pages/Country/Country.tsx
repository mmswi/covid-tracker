import { useParams } from 'react-router-dom';

import './Country.scss';

function Country() {
  const { continent, country } = useParams();

  return (
    <div className="Country">
      <h1>
        {continent}
        {' '}
        and
        {' '}
        {country}
      </h1>
    </div>
  );
}

export default Country;
