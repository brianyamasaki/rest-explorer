import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { fetchInterviewSegment } from '../../modules/fetchInterviewSegment';

class Interview extends Component {
  componentDidMount() {
    const { match, changePage, fetchInterviewSegment } = this.props;
    const id = match.params.id;
    if (!id) {
      changePage('/narrators');
    } else {
      fetchInterviewSegment(id);
    }
  }

  render() {
    const { name, description, credit, link, transcript } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <p>{credit}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { interviewSegment } = state;
  return {
    name: interviewSegment.name,
    id: interviewSegment.id,
    description: interviewSegment.description,
    credit: interviewSegment.credit,
    links: interviewSegment.links,
    transcript: interviewSegment.transcript,
    mpeg: interviewSegment.mpeg
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchInterviewSegment,
      changePage: url => push(url)
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Interview);
