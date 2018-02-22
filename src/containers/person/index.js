import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItemDetailsArray } from '../../modules/fetchItemDetailsArray';

import { SlideShow } from '../../components';
import collection from './person-collection-1.json';

class Person extends Component { 
  state = {
    collection,
    exhibits: []
  };

  componentDidMount() {
    document.title = 'Person Tour | Densho Explorer';
    const ids = this.state.collection.exhibits.map(exhibit => (exhibit.id));
    this.props.fetchItemDetailsArray(ids);
  }

  componentWillReceiveProps(nextProps) {
    const { exhibits } = this.props;
    if (exhibits !== nextProps.exhibits && !nextProps.isLoading) {
      this.setState({
        exhibits: nextProps.exhibits
      });
    }
  }

  renderSlideShow() {
    const { exhibits, collection } = this.state;
    if (exhibits.length) {
      return <SlideShow exhibits={exhibits} collection={collection} />
    }
  }

  render() {
    return (
      <div className="personCollection">
        <h1 className="text-center">{this.state.collection.displayName} Collection</h1>
        {this.renderSlideShow()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { 
    fetchObjects,
    isLoading,
    exhibits
  } = state.itemDetailsArray;
  return {
    isLoading,
    fetchObjects,
    exhibits
  };
}

export default connect(mapStateToProps, {
  fetchItemDetailsArray
})(Person);