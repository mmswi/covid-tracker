import ReactDOM from 'react-dom';
import TableHeadCell from './TableHeadCell';

it('should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableHeadCell />, div);
  ReactDOM.unmountComponentAtNode(div);
});