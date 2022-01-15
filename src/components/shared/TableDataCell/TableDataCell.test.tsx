import ReactDOM from 'react-dom';
import TableDataCell from './TableDataCell';

it('should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableDataCell />, div);
  ReactDOM.unmountComponentAtNode(div);
});
