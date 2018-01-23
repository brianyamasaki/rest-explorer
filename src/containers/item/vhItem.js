import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { fetchInterviewChildren } from '../../modules/fetchInterviewDetails';

import './vhItem.css';

class VhItem extends Component {
  componentDidMount() {
    const { fetchInterviewChildren, itemDetails } = this.props;
    const childrenObjects = itemDetails.links['children-objects'];
    if (childrenObjects) fetchInterviewChildren(childrenObjects);
  }

  renderIfAvailable(label, string) {
    if (string) {
      return (
        <p>
          <strong>{label}:</strong> {string}
        </p>
      );
    }
  }

  renderSegment(segment, i) {
    return (
      <li>
        <Link to={`/interview/${segment.id}`}>
          <strong>{segment.title}</strong>
        </Link>{' '}
        - {segment.description}
      </li>
    );
  }

  renderSegments() {
    const { segments } = this.props;
    return <ul>{segments.map(this.renderSegment.bind(this))}</ul>;
  }

  render() {
    const { itemDetails } = this.props;
    return (
      <Grid className="vhItem">
        <Row>
          <h1 className="text-center">{itemDetails.name}</h1>
          <Col lg={6} md={6} sm={12} xs={12}>
            <img src={itemDetails.links.img} alt={itemDetails.description} />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            {this.renderIfAvailable('Description', itemDetails.description)}
          </Col>
        </Row>
        {this.renderSegments()}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { interviewDetails } = state;
  return {
    segments: interviewDetails.segments
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchInterviewChildren
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(VhItem);
