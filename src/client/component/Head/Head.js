import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';

export default class Head extends Component{

    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        return (
            <header className="header">
                <h1>PacoIrene</h1>
                <ul>
                    <li><Link to='/'>Blog</Link></li>
                    <li><Link to='/thinking'>Thinking</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </ul>
            </header>
        );
    }

    readDetail(e) {
        console.log(e);
    }
}
