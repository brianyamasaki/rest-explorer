import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MoreButton } from '../../components';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { fetchCollectionDetails } from '../../modules/fetchCollectionDetails';
import { fetchCollectionItems } from '../../modules/fetchCollectionItems';
import { selectCollectionItem } from '../../modules/selectedCollectionItem';

import './details.css'; // Tell Webpack we use these

class CollectionDetails extends Component {
  componentDidMount() {
    const {
      match,
      changePage,
      fetchCollectionDetails,
      collectionId
    } = this.props;
    const id = match.params.id;
    if (!id) {
      changePage('/organizations');
    } else if (collectionId !== id) {
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

  itemTooltip(item) {
    return <Tooltip id={item.title}>{item.title}</Tooltip>;
  }

  renderImg(item, i) {
    return (
      <li
        className="collectionItem"
        key={item.id}
        onClick={() => this.onClickItem(item.id, i)}
      >
        <OverlayTrigger placement="top" overlay={this.itemTooltip(item)}>
          <img
            className="thumb"
            src={item.links.thumb}
            alt={item.links.thumb}
            width="200"
          />
        </OverlayTrigger>
        <p className="itemTitle">{item.title}</p>
      </li>
    );
  }

  renderItem(item, i) {
    switch (item.format) {
      case 'img':
      case 'doc':
      case 'vh':
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
      return (
        <MoreButton
          onClick={this.getMore.bind(this)}
          isLoading={this.props.isLoading}
        >
          More
        </MoreButton>
      );
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
    collectionId: collectionDetails.id,
    items: collectionItems.items,
    nextUrl: collectionItems.nextUrl,
    isLoading: collectionItems.isLoading
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
