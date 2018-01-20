import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCollectionDetails } from '../../modules/fetchCollectionDetails';
import { fetchCollectionItems } from '../../modules/fetchCollectionItems';
import { selectCollectionItem } from '../../modules/selectedCollectionItem';

import './details.css'; // Tell Webpack we use these

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

  onClickItem(id, i) {
    const { selectCollectionItem, items, changePage } = this.props;
    selectCollectionItem(id, i, items[i].links);
    changePage(`/item/${id}`);
  }

  renderImg(item, i) {
    return (
      <li
        className="collectionItem"
        key={item.id}
        onClick={() => this.onClickItem(item.id, i)}
      >
        <img
          className="thumb"
          src={item.links.thumb}
          alt={item.links.thumb}
          width="200"
        />
        <p className="itemTitle">{item.title}</p>
      </li>
    );
  }

  renderItem(item, i) {
    switch (item.format) {
      case 'img':
      case 'doc':
        return this.renderImg(item, i);
      default:
        return (
          <li className="collectionItem" key={item.id}>
            Collection Item type <strong>{item.format}</strong> is not supported
          </li>
        );
    }
  }

  renderItems() {
    return (
      <ul className="itemCollectionBox">
        {this.props.items.map(this.renderItem.bind(this))}
      </ul>
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
        <h1 className="pageTitle">{name}</h1>
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
      selectCollectionItem,
      changePage: url => push(url)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetails);
