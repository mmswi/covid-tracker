import ReactDOM from 'react-dom';
import ContinentTables from './ContinentTables';

it('should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContinentTables />, div);
  ReactDOM.unmountComponentAtNode(div);
});