import React, {Component, PropTypes} from 'react';

export default class Blog extends Component{

    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        return (
            <section>Blog</section>
        );
    }
}
