import React from 'react';
import ReactDOM from 'react-dom';
import AppNavbar from './appNavbar';

describe('<AppNavbar />', () => {
  it('renders', () => {
    const appNavbar = document.createElement('div');
    ReactDOM.render(<AppNavbar />, appNavbar);
  });
});
