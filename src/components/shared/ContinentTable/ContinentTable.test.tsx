import ReactDOM from 'react-dom';
import ContinentTable from './ContinentTable';

it('should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContinentTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});