import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import VhItem from './vhItem';
import { fetchItemDetails } from '../../modules/fetchItemDetails';
import { PrintJson } from '../../components';

import './index.css';

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

  renderPerson(person, i) {
    return <li key={i}>{person}</li>;
  }

  renderPersons() {
    const { persons } = this.props;
    if (persons && persons.length) {
      return (
        <div>
          <p>Referenced persons: </p>
          <ul>{persons.map(this.renderPerson.bind(this))}</ul>
        </div>
      );
    }
  }

  renderCredit() {
    const { credit } = this.props;
    if (credit) {
      return <p>{credit}</p>;
    }
  }

  renderWebsiteLink() {
    const { links } = this.props;
    if (links.html)
      return (
        <p>
          Contributing Organization Website Link:{' '}
          <a href={links.html}>{links.html}</a>
        </p>
      );
  }

  renderImg() {
    const { name, description, links, creation, json } = this.props;
    return (
      <div className="itemDetail">
        <h1 className="pageTitle">{name}</h1>
        <img src={links.img} alt={description} />
        <p className="creationDate">Created: {creation}</p>
        <p>Description: {description}</p>
        {this.renderPersons()}
        {this.renderCredit()}
        {this.renderWebsiteLink()}
        <PrintJson json={json} />
      </div>
    );
  }

  render() {
    const { format, itemDetails } = this.props;
    switch (format) {
      case 'img':
      case 'doc':
        return this.renderImg();
      case 'vh':
        return <VhItem itemDetails={itemDetails} />;
      default:
        if (format) {
          console.log(`Cannot render ${format}`);
        }
        break;
    }
    return <div className="itemDetail" />;
  }
}

const mapStateToProps = state => {
  const { itemDetails } = state;
  return {
    itemDetails,
    id: itemDetails.id,
    name: itemDetails.name,
    description: itemDetails.description,
    links: itemDetails.links,
    format: itemDetails.format.id,
    creation: itemDetails.creation,
    persons: itemDetails.persons,
    credit: itemDetails.credit,
    json: itemDetails.fetchObject
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
