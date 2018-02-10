import React, { Component } from 'react';
import { Glyphicon, Button } from 'react-bootstrap';

import './index.css';
const dftAnnotation = {
  title: 'annotation',
  location: {
    pctY: .5,
    pctX: .5,
    height: 50,
    width: 100
  }
};
const NAME = 'Image_annotator';

class ImgAnnotator extends Component {
  state = {
    showAnnotations: true,
    annotations: [],
    imgHeight: 0,
    imgWidth: 0
  };
  element;
  dragStart;

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }
  onWindowResize() {
    this.setState({
      imgHeight: this.element.clientHeight,
      imgWidth: this.element.clientWidth
    });
  }

  onImgLoad(e) {
    this.element = e.target;
    this.setState({
      imgHeight: e.target.height,
      imgWidth: e.target.width
    })
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onClickToggle(e) {
    this.setState({
      showAnnotations: !this.state.showAnnotations
    });
  }

  onClickAddAnnotation(e) {
    this.setState({
      annotations: this.state.annotations.concat({
        title: 'annotation',
        location: {
          pctY: .5,
          pctX: .5,
          pctHeight: .1,
          pctWidth: .1
        }
      })
    });
  }

  onClickAnnotation(e) {
    console.log('clicked on annotation');
  }

  onDragStart(e) {
    const index = e.target.getAttribute('index');
    const annotation = this.state.annotations[index];
    this.dragStart = {
      x: (annotation.location.pctX * this.state.imgWidth) - e.clientX,
      y: (annotation.location.pctY * this.state.imgHeight) - e.clientY
    };
    console.log('annotation drag start', this.dragStart);
  }

  onDragEnd(e) {
    const index = e.target.getAttribute('index');
    const annotations = this.state.annotations.slice(0);
    const annotation = annotations[index];
    const pctX = Math.min(Math.max(0, (e.clientX + this.dragStart.x) / this.state.imgWidth), 1);
    const pctY = Math.min(Math.max(0, (e.clientY + this.dragStart.y) / this.state.imgHeight), 1);

    annotation.location.pctX = pctX;
    annotation.location.pctY = pctY;
    this.setState({
      annotations
    });
  }

  renderAnnotation(item, i) {
    const annotationHeight = item.location.pctHeight * this.state.imgHeight;
    const annotationWidth = item.location.pctWidth * this.state.imgWidth;
    const location = {
      top: this.state.imgHeight * item.location.pctY - (annotationHeight / 2),
      left: this.state.imgWidth * item.location.pctX - (annotationWidth / 2),
      height: annotationHeight,
      width: annotationWidth
    };
    return (
      <div 
        className="annotation" 
        style={{...location}} 
        key={i}
        index={i}
        draggable
        onDragStart={this.onDragStart.bind(this)}
        onDragEnd={this.onDragEnd.bind(this)}
        onClick={this.onClickAnnotation.bind(this)}
      >
        {item.title}
      </div>
    );
  }

  renderAnnotations() {
    if (this.state.showAnnotations) {
      return this.state.annotations.map(this.renderAnnotation.bind(this));
    }
  }

  renderToolbar() {
    return (
      <div className="toolbar">
        <Button className="btn-primary" onClick={this.onClickToggle.bind(this)} >
          <Glyphicon glyph="pencil" />
        </Button>
        <Button className="btn-primary" onClick={this.onClickAddAnnotation.bind(this)}>
          <Glyphicon glyph="plus-sign" />
        </Button>
      </div>
    );
  }

  render() {
    const { src, alt } = this.props;
    return (
      <div className="img-annotator">
        <img 
          src={src} 
          alt={alt} 
          name={NAME}
          draggable={false}
          onLoad={this.onImgLoad.bind(this)}
        />
        {this.renderAnnotations()}
        {this.renderToolbar()}
      </div>
    )
  }
}

export { ImgAnnotator };