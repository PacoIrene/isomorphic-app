import React, {Component, PropTypes} from 'react';

import fecth from 'whatwg-fetch';

export default class BlogList extends Component{

    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    componentDidMount() {

    }

    render() {
        return (
            <section>
                list
            </section>
        );
    }
}
