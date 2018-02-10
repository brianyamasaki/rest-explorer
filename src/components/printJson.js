import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import JsonTree from 'react-json-tree';

const theme = {
  scheme: 'atelier dune',
  author:
    'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune)',
  base00: '#20201d',
  base01: '#292824',
  base02: '#6e6b5e',
  base03: '#7d7a68',
  base04: '#999580',
  base05: '#a6a28c',
  base06: '#e8e4cf',
  base07: '#fefbec',
  base08: '#d73737',
  base09: '#b65611',
  base0A: '#cfb017',
  base0B: '#60ac39',
  base0C: '#1fad83',
  base0D: '#6684e1',
  base0E: '#b854d4',
  base0F: '#d43552'
};
class PrintJson extends Component {
  state = {
    display: false
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ display: !this.state.display })}>
          {this.state.display ? 'Hide Json' : 'Show Json'}
        </Button>
        <div style={{ display: this.state.display ? 'block' : 'none' }}>
          <JsonTree data={this.props.json} theme={theme} />
        </div>
      </div>
    );
  }
}

export { PrintJson };