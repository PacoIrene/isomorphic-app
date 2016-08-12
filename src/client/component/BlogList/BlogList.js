import React, {Component, PropTypes} from 'react';
import BlogInfo from '../BlogInfo/BlogInfo';

import * as _ from 'lodash';

import fecth from 'whatwg-fetch';

export default class BlogList extends Component{

    constructor(props, context) {
        super(props, context);
        this.props = props;
        this.state = {
            blogs: []
        };
    }

    componentDidMount() {
        fetch('./api/blogs').then(results => {
            if (results.status === 200) {
                results.json().then(blogs => {
                    this.setState({
                        blogs: blogs
                    });
                });
            }
        }).catch(ex => {
            console.log('parsing failed', ex)
        });
    }

    render() {
        return (
            <section>
                {
                    _.map(this.state.blogs, blog => {
                        return <BlogInfo title = {blog.title}
                                     content = {blog.content}
                                     date = {blog.date}
                                     key = {blog._id}
                                     id = {blog._id} />
                    })
                }
            </section>
        );
    }
}
