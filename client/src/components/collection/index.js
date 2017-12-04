import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import {getSingleCollection} from '../../actions/collections';

class Collection extends Component {
    componentDidMount() {
        this.props.getSingleCollection(this.props.match.params.id);
    }

    render() {
        if (!this.props.collection.data) {
            return null;
        }
        return <div className="sample-container">
            {this.props.collection.data.books.map((book, index) => {
                return <div key={index}>
                    {book.name}
                </div>;
            })}
        </div>
    }
}

export default connect(
    state => ({
        collection: state.singleCollection
    }),
    dispatch => ({
        getSingleCollection: (id) => {
            dispatch(getSingleCollection(id))
        }
    })
)(Collection);