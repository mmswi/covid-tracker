import ReactDOM from 'react-dom';
import TableCellNavigation from './TableCellNavigation';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableCellNavigation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
