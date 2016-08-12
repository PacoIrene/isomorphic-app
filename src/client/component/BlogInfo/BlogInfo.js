import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';

export default class BlogInfo extends Component {

    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        let link = `blogs/${this.props.id}`;
        return (
            <section>
                <h2>{this.props.title}</h2>
                <span>{this.props.date}</span>
                <p>{this.props.content}</p>
                <Link to={link}>查看详情</Link>
            </section>
        );
    }
}
