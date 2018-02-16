import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { StarRatings } from '../starRatings';

import './index.css';

class CommentList extends Component {
  state = {
    comments: [],
    onCommentChange: () => {}
  }

  componentDidMount() {
    const { comments } = this.props;
    if (comments) {
      this.setState({
        comments
      });
    }
  }

  componentWillReceiveProps(newProps) {
    const { comments } = this.props;
    if (comments !== newProps.comments) {
      this.setState({
        comments: newProps.comments
      });
    }
  }

  renderStarRatings(item) {
    if (!item.original_organization) {
      return <StarRatings rating={item.rating} />;
    }
  }

  renderComment(item, i) {
    return (
      <div className="comment" key={i}>
        <h4>
          {item.name}
          {this.renderStarRatings(item)}
        </h4>
        <p>{item.comment}</p>
      </div>
    )
  }

  renderCommentList() {
    const { comments } = this.state;
    if (comments)
      return comments.map(this.renderComment.bind(this));
  }

  renderCarouselItem(item, i) {
    return (
      <Carousel.Item key={i}>
        <Carousel.Caption>
          <h3>{item.name}</h3>
          <p>{item.comment}</p>
        </Carousel.Caption>
      </Carousel.Item>
    )
  }

  renderCarouselItems() {
    const { comments } = this.state;
    if (comments) {
      return comments.map(this.renderCarouselItem.bind(this));
    }
  }

  render() {
    return (
      <Carousel 
        interval={null} 
        pauseOnHover={true} 
        onSelect={this.props.onCommentChange.bind(this)}
      >
        {this.renderCarouselItems()}
      </Carousel>
    );
  }

  static defaultProps = {
    comments: [
      {
        name: 'SeriousEats',
        comment: 'I know who these guys are!',
        liked: true,
        rating: 3.5
      },
      {
        name: 'Howdy McLaren',
        comment: `Yeah, I noticed they have Stogie Kawabata on the right side, but he's really on the left side`,
        liked: false,
        rating: 2
      }
    ]
  };
}

export { CommentList };