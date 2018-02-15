import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrgList } from '../../modules/fetchOrgs';
import { Media } from 'react-bootstrap';
import { PrintJson } from '../../components';

import './index.css';

class Organizations extends Component {
  componentDidMount() {
    this.props.getOrgList();
  }

  renderOrgItem(item) {
    return (
      <li key={item.id}>
        <Media>
          <Media.Left>
            <Link to={`/organizations/${item.id}`}>
              <img src={item.links.thumb} alt={item.title} />
            </Link>
          </Media.Left>
          <Media.Body>
            <Link to={`/organizations/${item.id}`}>
              <Media.Heading>{item.title}</Media.Heading>
            </Link>
            <p>{item.description}</p>
          </Media.Body>
        </Media>
      </li>
    );
  }

  renderOrgList() {
    const { organizations } = this.props;
    if (organizations) {
      return (
        <ul className="organizationList">
          {organizations.map(this.renderOrgItem)}
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Affiliated Organizations</h1>

        {this.renderOrgList()}
        <PrintJson json={this.props.json} title="Organization List" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.orgList.isLoading,
  organizations: state.orgList.organizations,
  json: state.orgList.fetchObjects
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrgList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
