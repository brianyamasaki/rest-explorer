import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MoreButton } from '../../components';
import { fetchNarrators } from '../../modules/fetchNarrators';
import { PrintJson } from '../../components';

import './index.css';

class Narrators extends Component {
  componentDidMount() {
    const { narrators } = this.props;
    if (!narrators.length) this.props.fetchNarrators();
  }

  getMore() {
    const { nextUrl, fetchNarrators } = this.props;
    if (nextUrl) {
      fetchNarrators(nextUrl);
    }
  }

  renderNarratorItem(item) {
    return (
      <li key={item.id} className="navigatorItem">
        <Link to={`/narrators/${item.id}`}>
          <img
            className="thumb"
            src={item.links.thumb}
            alt={item.links.thumb}
            width="200"
          />
          <p className="navigatorTitle">{item.display_name}</p>
        </Link>
      </li>
    );
  }

  renderNarratorList() {
    const { narrators } = this.props;
    return (
      <ul className="navigatorsBox">
        {narrators.map(this.renderNarratorItem.bind(this))}
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
          Show More Narrators
        </MoreButton>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Narrators</h1>
        {this.renderNarratorList()}
        {this.renderMoreButton()}
        <PrintJson json={this.props.json} title="Narrators" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { narrators } = state;
  return {
    id: narrators.id,
    narrators: narrators.narrators,
    nextUrl: narrators.nextUrl,
    isLoading: narrators.isLoading,
    json: narrators.fetchObjects
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchNarrators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Narrators);
