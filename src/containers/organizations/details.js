import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MoreButton } from '../../components';
import { Media } from 'react-bootstrap';
import { fetchOrgDetails } from '../../modules/fetchOrgDetails';
import { fetchCollection } from '../../modules/fetchCollection';
import { PrintJson } from '../../components';
import './details.css';

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

  renderThumbnail(child) {
    if (child.links && child.links.thumb) {
      return (
        <Link to={`/collections/${child.id}`}>
          <img src={child.links.thumb} alt={child.title} />
        </Link>
      );
    } else {
      return <span>No Image Supplied</span>;
    }
  }

  renderCollection(child, i) {
    return (
      <li key={i}>
        <Media>
          <Media.Left>{this.renderThumbnail(child)}</Media.Left>
          <Media.Body>
            <Link to={`/collections/${child.id}`}>
              <Media.Heading>{child.title}</Media.Heading>
            </Link>
            <p>{child.description}</p>
            <p>{child.extent}</p>
          </Media.Body>
        </Media>
      </li>
    );
  }

  renderCollections() {
    return (
      <ol className="orgCollectionList">
        {this.props.collections.map(this.renderCollection.bind(this))}
      </ol>
    );
  }

  renderCollectionsTotal() {
    const { collectionsTotal } = this.props;
    if (collectionsTotal) {
      return <p>Number of collections: {collectionsTotal}</p>;
    }
  }

  renderMoreButton() {
    if (this.props.nextUrl) {
      return (
        <MoreButton
          onClick={this.getMore.bind(this)}
          isLoading={this.props.isLoading}
        >
          Show More Collections
        </MoreButton>
      );
    }
  }

  render() {
    const { name, description, websiteUrl, json } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <h4 className="pageTitle">Description</h4>
        <p>{description}</p>
        {this.renderCollectionsTotal()}
        <p>
          Website URL:
          <a href={websiteUrl}>{websiteUrl}</a>
        </p>
        {this.renderCollections()}
        {this.renderMoreButton()}
        <PrintJson json={json} />
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
    collectionsTotal: collection.collectionsTotal,
    collections: collection.collections,
    nextUrl: collection.nextUrl,
    isLoading: collection.isLoading,
    json: collection.fetchObjects
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
