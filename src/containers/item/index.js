import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import VhItem from './vhItem';
import { fetchItemDetails } from '../../modules/fetchItemDetails';
import { ImgAnnotator, PrintJson, CommentList } from '../../components';
import comments from './comments-ddr-one-1-28';

import './index.css';

class Item extends Component {
  state = {
    commentIndex: 0
  };
  comments = [];

  componentDidMount() {
    const { match, changePage, fetchItemDetails } = this.props;
    const id = match.params.id;
    if (!id) {
      changePage('/organizations');
    } else {
      fetchItemDetails(id);
      if (id === 'ddr-one-1-28') {
        this.comments = comments.comments;
      } else {
        this.comments = [];
      }
    }
  }

  onCommentChange(i) {
    this.setState({
      commentIndex: i
    })
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

  renderComments() {
    if (this.comments.length > 0) {
      return <CommentList comments={this.comments} onCommentChange={this.onCommentChange.bind(this)} />;
    }
  }

  renderImg() {
    const { name, description, links, creation } = this.props;
    const annotations = this.comments.length === 0 ? [] : this.comments[this.state.commentIndex].annotations;
    return (
      <div className="itemDetail">
        <h1 className="pageTitle">{name}</h1>
        <ImgAnnotator 
          src={links.img} 
          alt={description} 
          annotations={annotations} 
        />
        {this.renderComments()}
        <p className="creationDate">Created: {creation}</p>
        <p>Description: {description}</p>
        {this.renderPersons()}
        {this.renderCredit()}
        {this.renderWebsiteLink()}
      </div>
    );
  }

  renderItem() {
    const { format, itemDetails, isLoading } = this.props;
    if (isLoading) {
      return;
    }
    switch (format) {
      case 'img':
      case 'doc':
        return this.renderImg();
      case 'vh':
        return <VhItem itemDetails={itemDetails} />;
      default:
        if (format) {
          return <h1>Cannot render {format}</h1>;
        }
        return <h1>Error</h1>
    }
  }
  renderJson() {
    const { json } = this.props;
    if (json) {
      return <PrintJson json={json} />;
    }
  }

  render() {
    return (
      <div className="itemDetail">
        {this.renderItem()}
        {this.renderJson()}
      </div>
    )
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
    json: itemDetails.fetchObject,
    isLoading: itemDetails.isLoading
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
