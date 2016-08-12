import React, {Component, PropTypes} from 'react';

import fecth from 'whatwg-fetch';

export default class Blog extends Component{

    constructor(props, context) {
        super(props, context);
        this.props = props;
        this.state = {};
    }

    componentDidMount() {
        let id = this.props.params.id;
        fetch(`../api/blogs/${id}`).then(response => {
            if (response.status === 200) {
                response.json().then(blog => {
                    this.setState(blog);
                });
            }
        }).catch(ex => {
            console.log(ex);
        });
    }

    render() {
        return (
            <section>
                <h2>{this.state.title}</h2>
                <span>{this.state.date}</span>
                <article>{this.state.content}</article>
            </section>
        );
    }
}
