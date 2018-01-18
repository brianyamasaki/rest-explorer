import React, { Component } from 'react';
import { push } from 'react-router-redux';
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
    const { organizationObject } = this.props;
    if (organizationObject) {
      return <ul>{organizationObject.objects.map(this.showOrgItem)}</ul>;
    }
  }

  render() {
    const { organizationObject, changePage } = this.props;
    return (
      <div>
        <h1>Affiliated Organizations</h1>

        {this.showOrgList(organizationObject)}

        <p>
          <button onClick={() => changePage()}>
            Go to about page via redux
          </button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.orgList.isLoading,
  organizationObject: state.orgList.organizationObject
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrgList,
      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
