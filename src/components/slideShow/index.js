import React, { Component } from 'react';
import { ImgAnnotator } from '../index';

import './index.css'
class SlideShow extends Component {
  state = {
    exhibits: [],
    exhibitCur: 0
  };

  componentDidMount() {
    const { exhibits } = this.props;
    if (exhibits && exhibits.length) {
      this.setState({
        exhibits
      });
    }
  }

  onClick(e) {
    this.setState({
      exhibitCur: (this.state.exhibitCur + 1) % this.state.exhibits.length
    })
  }

  renderExhibit(exhibit, i) {
    const { collection } = this.props;
    return (
      <ImgAnnotator 
        src={exhibit.imgSrc} 
        key={i} 
        alt={exhibit.description} 
        hide={this.state.exhibitCur !== i}
        annotations={collection.exhibits[i].annotations}
        maxHeight={800}
      />
    );
  }

  renderExhibits() {
    const { exhibits } = this.state;
    if (exhibits.length) {
      return exhibits.map(this.renderExhibit.bind(this))
    }
  }

  render() {
    return (
      <div className="slideShow" onClick={this.onClick.bind(this)}>
        {this.renderExhibits()}
      </div>
    );
  } 
}

export { SlideShow };