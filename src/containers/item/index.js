import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { getSelectedItem } from '../../modules/selectItem';

class Item extends Component {
  componentDidMount() {
    const { itemData } = this.props;
    if (!itemData.item || !itemData.itemId || !itemData.links)
      this.props.changePage('/organizations');
  }

  renderImg() {
    const { itemData } = this.props;
    return (
      <div>
        <h1 className="pageTitle">{itemData.item.title}</h1>
        <img src={itemData.links.img} alt={itemData.item.description} />
        <p>{itemData.item.description}</p>
      </div>
    );
  }

  render() {
    const { itemData } = this.props;
    if (itemData.item) {
      switch (itemData.item.format) {
        case 'img':
        case 'doc':
          return this.renderImg();
        default:
          console.log(`Cannot render ${itemData.item.format}`);
          break;
      }
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    itemData: getSelectedItem(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSelectedItem,
      changePage: url => push(url)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Item);
