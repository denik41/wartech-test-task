import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import {getCollections} from '../../actions/collections';
import CollectionSample from '../collection-sample';

class CollectionsContainer extends Component {
    componentDidMount() {
        this.props.getCollections();
    }

    render() {
        return <div className="container">
            {this.props.collections.data.map((collection, index) => {
                return <CollectionSample data={collection}
                                         key={index}
                />
            })}
        </div>
    }
}

export default connect(
    state => ({
        collections: state.collections
    }),
    dispatch => ({
        getCollections: () => {
            dispatch(getCollections())
        }
    })
)(CollectionsContainer);