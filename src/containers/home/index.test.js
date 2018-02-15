import React from 'react';
import { shallow } from 'enzyme';
import Home from './index.js';

describe('<Home />', () => {
  it('shallow renders', () => {
    shallow(<Home />);
  });

  it('contains Welcome Header', () => {
    const home = shallow(<Home />);
    const welcome = <h1>Welcome to the REST Explorer</h1>;
    expect(home.contains(welcome)).toEqual(true);
  });
});
