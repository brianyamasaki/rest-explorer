import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1 className="pageTitle">Welcome to the REST Navigator</h1>
    <p>
      Use this app to navigate the&nbsp;
      <a href="http://ddr.densho.org">Densho Digital Repository</a> via the REST
      API.
    </p>
    <ul>
      <li>
        Start by browsing our&nbsp;
        <Link to={'/organizations'}>contributing organizations</Link>
      </li>
      <li>
        Try visiting through our <Link to={'/narrators'}>Narrators</Link>
      </li>
    </ul>
  </div>
);

export default Home;
