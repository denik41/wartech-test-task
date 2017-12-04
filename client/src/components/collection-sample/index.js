import React, {Component} from 'react';
import './style.css';
import {Link} from 'react-router-dom'

export default class CollectionSample extends Component {
    render() {
        return <Link to={`/collection/${this.props.data._id}`}>
            <div className="sample-container">
                <span className="name">{this.props.data.name}</span>
                <span className="description">{this.props.data.description}</span>
            </div>
        </Link>
    }
}