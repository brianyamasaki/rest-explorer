import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to the REST Explorer</h1>
    <p>
      Use this app to explore the&nbsp;
      <a href="http://ddr.densho.org">Densho Digital Repository</a> via the REST
      API.
    </p>
    <ul>
      <li>
        Start by browsing our&nbsp;
        <Link to={'/organizations'}>contributing organizations</Link> and their
        asset collections.
      </li>
      <li>
        Demonstration of how <Link to={'/item/ddr-one-1-28'}>comments and annotations</Link> could work with entities.
      </li>
      <li>
        Demonstration of how <Link to='/person/1'>person slide shows</Link>.
      </li>
      <li>
        Also try visiting through our <Link to={'/narrators'}>Narrators</Link>{' '}
        page.
      </li>
    </ul>
  </div>
);

export default Home;
