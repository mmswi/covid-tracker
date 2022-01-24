import React from 'react';
import ReactDOM from 'react-dom';
import ScrollToTop from './ScrollToTop';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ScrollToTop />, div);
  ReactDOM.unmountComponentAtNode(div);
});