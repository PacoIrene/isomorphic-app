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
                    <li><Link to='/' className="add-tem-link">Blog</Link></li>
                    <li><Link to='/Blog' className="add-tem-link">Thinking</Link></li>
                    <li onClick={this.readDetail.bind(this)}>About</li>
                </ul>
            </header>
        );
    }

    readDetail(e) {
        console.log(e);
    }
}
