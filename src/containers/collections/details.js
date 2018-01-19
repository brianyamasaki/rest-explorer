import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCollectionDetails } from '../../modules/fetchCollectionDetails';
import { fetchCollectionItems } from '../../modules/fetchCollectionItems';

class CollectionDetails extends Component {
  componentDidMount() {
    const { match, changePage, fetchCollectionDetails } = this.props;
    const id = match.params.id;
    if (!id) {
      changePage('/organizations');
    } else {
      fetchCollectionDetails(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchCollectionItems, itemsUrl } = this.props;
    if (nextProps.itemsUrl !== itemsUrl) {
      fetchCollectionItems(nextProps.itemsUrl);
    }
  }

  getMore() {
    const { nextUrl } = this.props;
    if (nextUrl) {
      this.props.fetchCollectionItems(nextUrl);
    }
  }

  renderImg(item) {
    return (
      <div className="collectionItem" key={item.id}>
        <img src={item.links.thumb} alt={item.links.thumb} width="200" />
        <p className="itemTitle">{item.title}</p>
      </div>
    );
  }

  renderItem(item) {
    switch (item.format) {
      case 'img':
        return this.renderImg(item);
      default:
        return <p>Collection Item type {item.format} is not supported yet</p>;
    }
  }

  renderItems() {
    //    return <ol>{this.props.items.map(this.renderItem.bind(this))}</ol>;
    return (
      <div className="itemCollectionBox">
        {this.props.items.map(this.renderItem.bind(this))}
      </div>
    );
  }

  renderMoreButton() {
    if (this.props.nextUrl) {
      return <button onClick={() => this.getMore()}>More</button>;
    }
  }

  render() {
    const { name, description, extent } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <h4>Description</h4>
        <p>{description}</p>
        <p>Extent: {extent}</p>
        {this.renderItems()}
        {this.renderMoreButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { collectionDetails, collectionItems } = state;
  return {
    name: collectionDetails.name,
    description: collectionDetails.description,
    extent: collectionDetails.extent,
    itemsUrl: collectionDetails.itemsUrl,
    items: collectionItems.items,
    nextUrl: collectionItems.nextUrl
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCollectionDetails,
      fetchCollectionItems,
      changePage: () => push('/organizations')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetails);
