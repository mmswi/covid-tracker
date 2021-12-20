import ReactDOM from 'react-dom';
import DateTooltip from './DateTooltip';

it('should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DateTooltip />, div);
  ReactDOM.unmountComponentAtNode(div);
});