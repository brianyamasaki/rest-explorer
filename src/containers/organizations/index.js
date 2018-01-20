import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrgList } from '../../modules/fetchOrgs';

class Organizations extends Component {
  componentDidMount() {
    this.props.getOrgList();
  }

  showOrgItem(item) {
    return (
      <li key={item.id}>
        <Link to={`/organizations/${item.id}`}>{item.title}</Link>
      </li>
    );
  }

  showOrgList() {
    const { organizations } = this.props;
    if (organizations) {
      return <ul>{organizations.map(this.showOrgItem)}</ul>;
    }
  }

  render() {
    const { organizationObject } = this.props;
    return (
      <div>
        <h1 className="pageTitle">Affiliated Organizations</h1>

        {this.showOrgList(organizationObject)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.orgList.isLoading,
  organizations: state.orgList.organizations
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrgList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
