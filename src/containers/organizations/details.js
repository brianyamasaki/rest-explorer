import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchOrgDetails } from '../../modules/fetchOrgDetails';
import { fetchChildren } from '../../modules/fetchChildren';

class OrganizationDetails extends Component {
  state = {
    orgDetails: {},
    children: []
  };

  componentDidMount() {
    const { match, changePage, fetchOrgDetails } = this.props;
    const id = match.params.id;
    if (!id) {
      changePage('/organizations');
    } else {
      fetchOrgDetails(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { orgChildren, orgDetails, fetchChildren } = this.props;
    if (
      nextProps.orgChildren !== orgChildren &&
      nextProps.orgChildren.children &&
      nextProps.orgChildren.children.objects.length
    ) {
      this.setState({
        children: this.state.children.concat(
          nextProps.orgChildren.children.objects
        )
      });
    }
    if (nextProps.orgDetails !== orgDetails) {
      this.setState({
        orgDetails: nextProps.orgDetails
      });
      if (nextProps.orgDetails.details)
        fetchChildren(nextProps.orgDetails.details.links.children);
    }
  }

  renderChild(child) {
    return (
      <li key={child.id}>
        <ul>
          <li>{child.title}</li>
          <li>{child.description}</li>
          <li>{child.extent}</li>
        </ul>
      </li>
    );
  }

  renderChildren() {
    return <ul>{this.state.children.map(this.renderChild)}</ul>;
  }

  render() {
    const { orgDetails } = this.state;
    if (orgDetails.details) {
      return (
        <div>
          <h1>{orgDetails.details.title}</h1>
          <h4>Description</h4>
          <p>{orgDetails.details.description}</p>
          <p>
            URL:
            <a href={orgDetails.details.url}>{orgDetails.details.url}</a>
          </p>
          {this.renderChildren()}
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    orgDetails: state.orgDetails,
    orgChildren: state.children
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrgDetails,
      fetchChildren,
      changePage: () => push('/organizations')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  OrganizationDetails
);
