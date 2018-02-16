import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home';
import Organizations from '../organizations';
import OrganizationDetails from '../organizations/details';
import CollectionDetails from '../collections/details';
import Item from '../item';
import Facets from '../facets';
import FacetDetails from '../facets/details';
import Narrators from '../narrators';
import NarratorDetails from '../narrators/details';
import Interview from '../interview';
import About from '../about';
import AppNavbar from './appNavbar';
import Person from '../person';

const App = () => (
  <div>
    <AppNavbar />
    <div role="main" className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/organizations" component={Organizations} />
        <Route exact path="/organizations/:id" component={OrganizationDetails} />
        <Route exact path="/collections/:id" component={CollectionDetails} />
        <Route exact path="/item/:id" component={Item} />
        <Route exact path="/facets" component={Facets} />
        <Route exact path="/facets/:id" component={FacetDetails} />
        <Route exact path="/narrators" component={Narrators} />
        <Route exact path="/narrators/:id" component={NarratorDetails} />
        <Route exact path="/person/:id" component={Person} />
        <Route exact path="/interview/:id" component={Interview} />
        <Route exact path="/about-us" component={About} />
        <Route component={Home} />
      </Switch>
    </div>
  </div>
);

export default App;
