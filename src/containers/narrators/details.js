import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNarratorDetails } from '../../modules/fetchNarratorDetails';

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

  render() {
    const { displayName, bio, links } = this.props;
    return (
      <div>
        <h1>{displayName}</h1>
        <img src={links.img} alt={displayName} />
        <p>{bio}</p>
      </div>
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
    description: 'description'
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchNarratorDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NarratorDetails);
