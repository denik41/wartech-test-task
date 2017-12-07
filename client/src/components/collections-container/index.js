import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import {
    getCollections,
    editSingleCollection
} from '../../actions/collections';
import CollectionSample from '../collection-sample';
import PlusImage from '../../assets/img/plus.jpg';
import Modal from '../modal';

class CollectionsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editCollection: {
                modalShown: false,
                name: "",
                description: "",
                collectionId: ""
            }
        }
    }

    componentDidMount() {
        this.props.getCollections();
    }

    onCloseModal() {
        this.setState({
            editCollection: {
                modalShown: false,
                name: "",
                description: "",
                collectionId: ""
            }
        });
    }

    handleNameChange(event) {
        this.setState({
            editCollection: {
                ...this.state.editCollection,
                name: event.target.value
            }
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            editCollection: {
                ...this.state.editCollection,
                description: event.target.value
            }
        });
    }

    onOpenEditModal(collection) {
        this.setState({
            editCollection: {
                modalShown: true,
                name: collection.name,
                description: collection.description,
                collectionId: collection._id
            }
        });
    }

    render() {
        return <div className="container">
            <Modal shown={this.state.editCollection.modalShown}
                   closeModal={this.onCloseModal.bind(this)}
                   title="Edit collection info">
                <label className="label">Name<input type="text"
                                                    autoComplete="off"
                                                    maxLength="100"
                                                    value={this.state.editCollection.name}
                                                    onChange={this.handleNameChange.bind(this)}/>
                </label>
                <label className="label">Description
                    <textarea autoComplete="off"
                              maxLength="500"
                              wrap="soft"
                              value={this.state.editCollection.description}
                              onChange={this.handleDescriptionChange.bind(this)}/>
                </label>
                <button onClick={() => {
                    this.props.editSingleCollection({
                        id: this.state.editCollection.collectionId,
                        name: this.state.editCollection.name,
                        description: this.state.editCollection.description
                    }, () => {
                        this.onCloseModal();
                    }, false);
                }}
                        className="edit-button">
                    Edit
                </button>
            </Modal>
            <h2 className="title">Collections</h2>

            <div className="collections-list">
                {this.props.collections.data.map((collection, index) => {
                    return <CollectionSample data={collection}
                                             key={index}
                                             openEditModal={this.onOpenEditModal.bind(this)}
                    />
                })}
            </div>

            <div className="create-container">
                <input type="image" src={PlusImage} alt="Create collection" width="38" height="38"/>
            </div>

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
        },
        editSingleCollection: (params, callback, reqFromSingleCollection) => {
            dispatch(editSingleCollection(params, callback, reqFromSingleCollection))
        },
    })
)(CollectionsContainer);