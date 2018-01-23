import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { fetchNarratorDetails } from '../../modules/fetchNarratorDetails';

import './details.css';

class NarratorDetails extends Component {
  componentDidMount() {
    const { match, changePage, fetchNarratorDetails } = this.props;
    const id = match.params.id;
    if (!id) {
      changePage('/organizations');
    } else {
      fetchNarratorDetails(id);
    }
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

  render() {
    const {
      displayName,
      links,
      bio,
      ethnicity,
      generation,
      gender,
      birthLocation
    } = this.props;
    return (
      <Grid>
        <Row>
          <h1 className="text-center">{displayName}</h1>
          <Col xs={12} sm={6} med={6} lg={6} className="text-center">
            <img src={links.img} alt={displayName} />
          </Col>
          <Col xs={12} sm={6} med={6} lg={6}>
            {this.renderIfAvailable('Bio', bio)}
            {this.renderIfAvailable('Ethnicity', ethnicity)}
            {this.renderIfAvailable('Generation', generation)}
            {this.renderIfAvailable('Gender', gender)}
            {this.renderIfAvailable('Birth Location', birthLocation)}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { narratorDetails } = state;
  return {
    displayName: narratorDetails.displayName,
    firstName: narratorDetails.firstName,
    lastName: narratorDetails.lastName,
    middleName: narratorDetails.middleName,
    links: narratorDetails.links,
    bio: narratorDetails.bio,
    ethnicity: narratorDetails.ethnicity,
    gender: narratorDetails.gender,
    generation: narratorDetails.generation,
    birthLocation: narratorDetails.birthLocation
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNarratorDetails,
      changePage: url => push(url)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NarratorDetails);
