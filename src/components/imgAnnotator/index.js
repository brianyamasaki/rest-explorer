import React, { Component } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import './index.css';
const NEAR_ZERO = 0.01;
const OPACITY_STEP = 0.1;

class ImgAnnotator extends Component {
  static defaultProps = {
    hide: false,
    src: '',
    alt: '',
    annotations: [],
    maxHeight: '',
    title: '',
    description: ''
  };
  state = {
    showAnnotations: true,
    annotations: [],
    imgHeight: 0,
    imgWidth: 0,
    annotationCur: null,
    hide: false,
    opacity: 1
  };
  element;
  nativeHeight;
  nativeWidth;
  scaling = 1;

  componentDidMount() {
    const { annotations, hide } = this.props;
    if (annotations) {
      this.setState({
        annotations,
        hide,
        opacity: hide ? 0 : 1
      });
    }
  }

  fadeImage = () => {
    const { hide, opacity } = this.state;
    if ((hide && opacity <= 0) || (!hide && opacity >= 1)) {
      window.clearInterval(this.interval);
    } else {
      const { clientWidth, clientHeight } = this.element;
      this.setState({
        imgWidth: clientWidth,
        imgHeight: clientHeight,
        opacity: hide ? Math.max(opacity - OPACITY_STEP, 0) : Math.min(opacity + OPACITY_STEP, 1)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hide !== this.state.hide) {
      this.setState({
        hide: nextProps.hide
      });
      this.interval = window.setInterval(this.fadeImage, 70);
    }
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
    const { clientWidth, clientHeight } = this.element;
    if (clientWidth === 0) {
      return;
    }
    this.calcImageSize(clientHeight, clientWidth);
    this.setState({
      imgHeight: clientHeight,
      imgWidth: clientWidth
    });
  }

  calcImageSize(height, width) {
    const { maxHeight } = this.props;
    if (maxHeight) {
      const calculatedHeight = Math.min(width * this.nativeHeight / this.nativeWidth, height); 
      this.scaling = Math.min(maxHeight / calculatedHeight, 1);
    }
  }

  onImgLoad(e) {
    this.element = e.target;
    this.nativeHeight = e.target.height;
    this.nativeWidth = e.target.width;
    this.calcImageSize(this.nativeHeight, this.nativeWidth);
    this.setState({
      imgHeight: this.nativeHeight * this.scaling,
      imgWidth: this.nativeWidth * this.scaling
    });
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  offsetXYFromParent(clientX, clientY, offsetParent) {
    const isBody = offsetParent === offsetParent.ownerDocument.body;
    const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();
  
    const x = clientX + offsetParent.scrollLeft - offsetParentRect.left;
    const y = clientY + offsetParent.scrollTop - offsetParentRect.top;
  
    return {x, y};
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
    if (this.state.showAnnotations && !this.state.hide) {
      return this.state.annotations.map(this.renderAnnotation.bind(this));
    }
  }

  render() {
    const { src, alt, title, description } = this.props;
    let style = {};
    if (this.scaling < 1) {
      style = {
        width: this.state.imgWidth
      };
    }
    const { opacity } = this.state;
    return (
      <div 
        className={`img-annotator`} 
        style={{opacity, display: opacity < NEAR_ZERO ? 'none' : 'block' }}
      >
        <img 
          src={src} 
          alt={alt} 
          draggable="false"
          onLoad={this.onImgLoad.bind(this)}
          style={style}
        />
        <h3>{title}</h3>
        <p>{description}</p>
        {this.renderAnnotations()}
      </div>
    )
  }
}


export { ImgAnnotator };