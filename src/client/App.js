import React, {Component} from 'react';
import Head from './component/Head/Head';

export default class App extends Component {
  render() {
    return (
      <div>
        <Head></Head>
        {this.props.children}
      </div>
    );
  }
}
