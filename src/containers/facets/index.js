import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchFacets } from '../../modules/fetchFacets';
import { PrintJson } from '../../components';

class Organizations extends Component {
  componentDidMount() {
    this.props.fetchFacets();
  }

  renderFacetItem(item) {
    return (
      <li key={item.id}>
        <Link to={`/facets/${item.id}`}>{item.title}</Link>
      </li>
    );
  }

  renderFacetList() {
    const { facets } = this.props;
    return <ul>{facets.map(this.renderFacetItem.bind(this))}</ul>;
  }

  renderMoreButton() {
    if (this.props.nextUrl) {
      return <button onClick={() => this.getMore()}>More</button>;
    }
  }

  render() {
    return (
      <div>
        <h1>Facets</h1>
        {this.renderFacetList()}
        {this.renderMoreButton()}
        <PrintJson json={this.props.json} title="Facets" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { facets } = state;
  return {
    facets: facets.facets,
    nextUrl: facets.nextUrl,
    json: facets.fetchObjects
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFacets }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
