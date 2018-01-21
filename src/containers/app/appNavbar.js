import React from 'react';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';

const AppNavbar = () => (
  <Navbar inverse collapseOnSelect>
    <Grid>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">RN</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/">
            Home
          </NavItem>
          <NavItem eventKey={2} href="/organizations">
            Organizations
          </NavItem>
          <NavItem eventKey={3} href="/narrators">
            Narrators
          </NavItem>
          <NavItem eventKey={4} href="/facets">
            Facets
          </NavItem>
          <NavItem eventKey={5} href="/about-us">
            About
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Grid>
  </Navbar>
);

export default AppNavbar;
