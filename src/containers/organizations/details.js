import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchOrgDetails } from '../../modules/fetchOrgDetails';
import { fetchCollection } from '../../modules/fetchCollection';

class OrganizationDetails extends Component {
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
    const { fetchCollection, collectionsUrl } = this.props;
    if (nextProps.collectionsUrl !== collectionsUrl) {
      fetchCollection(nextProps.collectionsUrl);
    }
  }

  getMore() {
    const { nextUrl } = this.props;
    if (nextUrl) {
      this.props.fetchCollection(nextUrl);
    }
  }

  renderCollection(child) {
    return (
      <li key={child.id}>
        <ul>
          <li>
            <Link to={`/collections/${child.id}`}>{child.title}</Link>
          </li>
          <li>{child.description}</li>
          <li>{child.extent}</li>
        </ul>
      </li>
    );
  }

  renderCollections() {
    return <ol>{this.props.collections.map(this.renderCollection)}</ol>;
  }

  renderMoreButton() {
    if (this.props.nextUrl) {
      return <button onClick={() => this.getMore()}>More</button>;
    }
  }

  render() {
    const { name, description, websiteUrl } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <h4>Description</h4>
        <p>{description}</p>
        <p>
          URL:
          <a href={websiteUrl}>{websiteUrl}</a>
        </p>
        {this.renderCollections()}
        {this.renderMoreButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { orgDetails, collection } = state;
  return {
    name: orgDetails.name,
    collectionsUrl: orgDetails.collectionsUrl,
    description: orgDetails.description,
    websiteUrl: orgDetails.websiteUrl,
    collections: collection.collections,
    nextUrl: collection.nextUrl
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrgDetails,
      fetchCollection,
      changePage: () => push('/organizations')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  OrganizationDetails
);
