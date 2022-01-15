import ReactDOM from 'react-dom';
import SelectDate from './SelectDate';

it('should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectDate />, div);
  ReactDOM.unmountComponentAtNode(div);
});
