import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from '../home';
import Organizations from '../organizations';
import OrganizationDetails from '../organizations/details';
import CollectionDetails from '../collections/details';
import Item from '../item';
import About from '../about';

const App = () => (
  <div className="main">
    <header>
      <Link to="/">Home</Link>
      <Link to="/organizations">Organizations</Link>
      <Link to="/about-us">About</Link>
    </header>

    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/organizations" component={Organizations} />
        <Route path="/organizations/:id" component={OrganizationDetails} />
        <Route path="/collections/:id" component={CollectionDetails} />
        <Route path="/item/:id" component={Item} />
        <Route exact path="/about-us" component={About} />
        <Route component={Home} />
      </Switch>
    </div>
  </div>
);

export default App;
