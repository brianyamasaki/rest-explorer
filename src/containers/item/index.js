import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchItemDetails } from '../../modules/fetchItemDetails';

class Item extends Component {
  componentDidMount() {
    const { match, changePage, fetchItemDetails } = this.props;
    const id = match.params.id;
    if (!id) {
      changePage('/organizations');
    } else {
      fetchItemDetails(id);
    }
  }

  renderImg() {
    const { name, description, links, creation } = this.props;
    return (
      <div className="itemDetail">
        <h1 className="pageTitle">{name}</h1>
        <p className="creationDate">{creation}</p>
        <img src={links.img} alt={description} />
        <p>{description}</p>
      </div>
    );
  }

  render() {
    const { format } = this.props;
    switch (format) {
      case 'img':
      case 'doc':
      case 'vh':
        return this.renderImg();
      default:
        console.log(`Cannot render ${format}`);
        break;
    }
    return <div className="itemDetail" />;
  }
}

const mapStateToProps = state => {
  const { itemDetails } = state;
  return {
    id: itemDetails.id,
    name: itemDetails.name,
    description: itemDetails.description,
    links: itemDetails.links,
    format: itemDetails.format.id,
    creation: itemDetails.creation
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchItemDetails,
      changePage: url => push(url)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Item);
