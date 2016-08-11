import React, {Component, PropTypes} from 'react';

export default class Blog extends Component{

    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        return (
            <section className="about">
                My name is PacoIrene. I{'\''}m a Web Front end developer working {'in'} Baidu.inc.
            </section>
        );
    }
}
