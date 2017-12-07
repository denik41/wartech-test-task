import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import {
    getCollections,
    editSingleCollection,
    deleteCollection
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
            },
            deleteModal: {
                deleteCollectionModalShown: false,
                collectionId: ""
            }
        }
    }

    componentDidMount() {
        this.props.getCollections();
    }

    onCloseEditModal() {
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

    onOpenDeleteModal(id) {
        this.setState({
            deleteModal: {
                deleteCollectionModalShown: true,
                collectionId: id
            }
        });
    }

    onCloseDeleteModal() {
        this.setState({
            deleteModal: {
                deleteCollectionModalShown: false,
                collectionId: ""
            }
        });
    }

    render() {
        return <div className="container">
            <h2 className="title">Collections</h2>

            <div className="collections-list">
                {this.props.collections.data.map((collection, index) => {
                    return <CollectionSample data={collection}
                                             key={index}
                                             openEditModal={this.onOpenEditModal.bind(this)}
                                             openDeleteModal={this.onOpenDeleteModal.bind(this)}
                    />
                })}
            </div>

            <div className="create-container">
                <input type="image" src={PlusImage} alt="Create collection" width="38" height="38"/>
            </div>

            <Modal shown={this.state.editCollection.modalShown}
                   closeModal={this.onCloseEditModal.bind(this)}
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
                    }, this.onCloseEditModal.bind(this), false);
                }}
                        className="modal-button">
                    Edit
                </button>
            </Modal>

            <Modal shown={this.state.deleteModal.deleteCollectionModalShown}
                   closeModal={this.onCloseDeleteModal.bind(this)}
                   title="Are you sure you want to delete this collection?">
                <div className="delete-modal">
                    <button className="modal-button"
                            onClick={() => {
                                this.props.deleteCollection(this.state.deleteModal.collectionId, this.onCloseDeleteModal.bind(this));
                            }}>Yes
                    </button>
                    <button className="modal-button"
                            onClick={this.onCloseDeleteModal.bind(this)}>No
                    </button>
                </div>
            </Modal>
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
        deleteCollection: (id, callback) => {
            dispatch(deleteCollection(id, callback))
        }
    })
)(CollectionsContainer);