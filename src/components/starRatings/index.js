import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

class StarRatings extends Component {
  renderStar() {
    const { rating } = this.props;
    const retval = [];
    for (let i=0; i < 5; i++) {
      const glyph = i < rating ? 'star' : 'star-empty';
      retval.push(<Glyphicon glyph={glyph} key={i} />);
    }
    return retval;
  }

  render() {
    return (
      <span>
        {this.renderStar()}
      </span>);
  }

  static defaultProps = {
    rating: 3.0
  }
}

export { StarRatings };