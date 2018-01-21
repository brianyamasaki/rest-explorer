import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

class MoreButton extends Component {
  onClick() {
    const { onClick } = this.props;
    if (onClick) onClick();
  }

  renderButton() {
    if (this.props.isLoading) {
      return <span>Loading...</span>;
    }
    return (
      <Button onClick={this.onClick.bind(this)}>{this.props.children}</Button>
    );
  }

  render() {
    return <div className="text-center">{this.renderButton()}</div>;
  }
}

export { MoreButton };
