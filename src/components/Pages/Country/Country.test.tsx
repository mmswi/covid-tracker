import ReactDOM from 'react-dom';
import Country from './Country';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Country />, div);
  ReactDOM.unmountComponentAtNode(div);
});
