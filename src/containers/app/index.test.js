import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './index.js';

describe('<App />', () => {
  it('shallow renders', () => {
    shallow(<App />);
  });
});
