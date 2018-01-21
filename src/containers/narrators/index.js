import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MoreButton } from '../../components';
import { fetchNarrators } from '../../modules/fetchNarrators';

class Narrators extends Component {
  componentDidMount() {
    const { narrators } = this.props;
    if (!narrators.length) this.props.fetchNarrators();
  }

  getMore() {
    const { nextUrl, fetchNarrators } = this.props;
    if (nextUrl) {
      fetchNarrators(nextUrl);
    }
  }

  renderNarratorItem(item) {
    return (
      <li key={item.id}>
        <Link to={`/narrators/${item.id}`}>{item.display_name}</Link>
      </li>
    );
  }

  renderNarratorList() {
    const { narrators } = this.props;
    return <ul>{narrators.map(this.renderNarratorItem.bind(this))}</ul>;
  }

  renderMoreButton() {
    if (this.props.nextUrl) {
      return (
        <MoreButton
          onClick={this.getMore.bind(this)}
          isLoading={this.props.isLoading}
        >
          Show More Narrators
        </MoreButton>
      );
    }
  }

  render() {
    return (
      <div>
        <h1 className="pageTitle">Narrators</h1>
        {this.renderNarratorList()}
        {this.renderMoreButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { narrators } = state;
  return {
    id: narrators.id,
    narrators: narrators.narrators,
    nextUrl: narrators.nextUrl,
    isLoading: narrators.isLoading
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchNarrators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Narrators);
