import React, { Component } from 'react';
import { Glyphicon, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import  PowerIcon from '../powerIcon';

import './index.css';
const NAME = 'Image_annotator';

class ImgAnnotator extends Component {
  state = {
    showAnnotations: true,
    annotations: [],
    imgHeight: 0,
    imgWidth: 0,
    annotationCur: null
  };
  element;

  componentDidMount() {
    const { annotations } = this.props;
    if (annotations) {
      this.setState({
        annotations
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.annotations !== this.state.annotations) {
      this.setState({
        annotations: nextProps.annotations
      });
    }
  }

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

  offsetXYFromParent(clientX, clientY, offsetParent) {
    const isBody = offsetParent === offsetParent.ownerDocument.body;
    const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();
  
    const x = clientX + offsetParent.scrollLeft - offsetParentRect.left;
    const y = clientY + offsetParent.scrollTop - offsetParentRect.top;
  
    return {x, y};
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

  onMouseDown(e) {
    if (this.state.annotationCur) {
      this.setState({
        annotationCur: null
      });
      return;
    }
    const {x, y} = this.offsetXYFromParent(e.clientX, e.clientY, e.target.parentElement);
    this.setState({
      annotations: this.state.annotations.concat({
        title: '',
        location: {
          pctY: y / this.state.imgHeight,
          pctX: x / this.state.imgWidth,
          pctHeight: 0,
          pctWidth: 0
        }
      }),
      annotationCur: {
        index: this.state.annotations.length,
        startY: y,
        startX: x,
        endY: y,
        endX: x
      }
    });
  }

  calcMouseDrag(e, annotationCur) {
    if (annotationCur) {
      const {x, y} = this.offsetXYFromParent(e.clientX, e.clientY, e.target.parentElement);
      annotationCur.endX = x;
      annotationCur.endY = y;
      const { startX, startY, endX, endY } = annotationCur;
      return {
        pctY: (startY + endY) / (this.state.imgHeight * 2),
        pctX: (startX + endX) / (this.state.imgWidth * 2),
        pctHeight: Math.abs(startY - endY) / this.state.imgHeight,
        pctWidth: Math.abs(startX - endX) / this.state.imgWidth
      }
    }
  }

  onMouseMove(e) {
    if (this.state.annotationCur) {
      const annotations = this.state.annotations.slice();
      const annotationCur = { ...this.state.annotationCur };
      annotations[this.state.annotationCur.index].location = this.calcMouseDrag(e, annotationCur);
      this.setState({
        annotations,
        annotationCur
      })
    }
  }

  onMouseUp(e) {
    if (this.state.annotationCur !== null) {
      const annotations = this.state.annotations.slice();
      const annotationCur = { ...this.state.annotationCur };
      annotations[this.state.annotationCur.index].location = this.calcMouseDrag(e, annotationCur);
      console.log(annotations[annotationCur.index].location);
      this.setState({
        annotations,
        annotationCur: null
      });
    }
  }

  annotationStyle(item) {
    const { location } = item;
    const style = {
      left: (location.pctX - location.pctWidth / 2) * this.state.imgWidth,
      top: (location.pctY - location.pctHeight / 2) * this.state.imgHeight,
      width: location.pctWidth * this.state.imgWidth,
      height: location.pctHeight * this.state.imgHeight
    };
    return style;
  }

  renderPopover(item, i) {
    return (
      <Popover id={`annotationPopover_${i}`} title={item.title}>
        
      </Popover>
    )
  }

  renderAnnotation(item, i) {
    return (
      <OverlayTrigger
        key={i}
        trigger={["hover", "focus"]}
        placement="bottom"
        overlay={this.renderPopover(item, i)}
      >
        <div
          key={i}
          style={this.annotationStyle(item)}
          className="annotation"
        />
      </OverlayTrigger>
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
          <PowerIcon height={16} width={16} />
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
          draggable="false"
          onLoad={this.onImgLoad.bind(this)}
        />
        {this.renderAnnotations()}
      </div>
    )
  }
}


export { ImgAnnotator };