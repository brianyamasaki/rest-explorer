import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrgList } from '../../modules/fetchOrgs';

class Organizations extends Component {
  componentDidMount() {
    this.props.getOrgList();
  }

  renderOrgItem(item) {
    return (
      <li key={item.id}>
        <Link to={`/organizations/${item.id}`}>{item.title}</Link>
      </li>
    );
  }

  renderOrgList() {
    const { organizations } = this.props;
    if (organizations) {
      return <ul>{organizations.map(this.renderOrgItem)}</ul>;
    }
  }

  render() {
    return (
      <div>
        <h1 className="pageTitle">Affiliated Organizations</h1>

        {this.renderOrgList()}
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
