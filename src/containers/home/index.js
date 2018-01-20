import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1 className="pageTitle">Welcome to Densho Navigator</h1>
    <p>
      Use this app to navigate the
      <a href="http://ddr.densho.org">Densho Digital Repository</a> via the REST
      API.
    </p>
    <ul>
      <li>
        Start by browsing our
        <Link to={'/organizations'}> contributing organizations</Link>
      </li>
    </ul>
  </div>
);

export default Home;
