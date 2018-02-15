import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchFacetDetails } from '../../modules/fetchFacetDetails';

class FacetDetails extends Component {
  componentDidMount() {
    const { match, changePage, fetchFacetDetails } = this.props;
    const id = match.params.id;
    if (!id) {
      changePage('/organizations');
    } else {
      fetchFacetDetails(id);
    }
  }

  render() {
    const { name, description } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <h4>Description</h4>
        <p>{description}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { facetDetails } = state;
  return {
    name: facetDetails.name,
    description: facetDetails.description
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFacetDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FacetDetails);
