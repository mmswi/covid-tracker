import { useParams } from 'react-router-dom';

import './Country.scss';

function Country() {
  const { name } = useParams();

  return (
    <div className="Country">
      <h1>{name}</h1>
    </div>
  );
}

export default Country;
