import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import {
    getCollections,
    editSingleCollection,
    deleteCollection,
    createCollection
} from '../../actions/collections';
import CollectionSample from '../collection-sample';
import PlusImage from '../../assets/img/plus.jpg';
import Modal from '../modal';
import DeleteConfirm from '../delete-confirm';

class CollectionsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editCollection: {
                modalShown: false,
                createMode: false,
                isEmptyField: false,
                name: "",
                description: "",
                collectionId: "",
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
                createMode: false,
                isEmptyField: false,
                name: collection.name,
                description: collection.description,
                collectionId: collection._id
            }
        });
    }

    closeModal() {
        this.setState({
            editCollection: {
                modalShown: false,
                isEmptyField: false,
                name: "",
                description: "",
                collectionId: "",
                createMode: false
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

    onOpenCreateModal() {
        this.setState({
            editCollection: {
                ...this.state.editCollection,
                modalShown: true,
                createMode: true
            }
        });
    }

    createCollection() {
        this.props.createCollection({
            name: this.state.editCollection.name,
            description: this.state.editCollection.description
        }, this.closeModal.bind(this));
    }

    editCollection() {
        this.props.editSingleCollection({
            id: this.state.editCollection.collectionId,
            name: this.state.editCollection.name,
            description: this.state.editCollection.description
        }, this.closeModal.bind(this), false);
    }

    onBlur(value) {
        if (!value) {
            this.setState({
                editCollection: {
                    ...this.state.editCollection,
                    isEmptyField: true
                }
            });
        }
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
                <input type="image"
                       src={PlusImage}
                       alt="Create collection"
                       width="38"
                       height="38"
                       onClick={this.onOpenCreateModal.bind(this)}/>
            </div>

            <Modal shown={this.state.editCollection.modalShown}
                   closeModal={this.closeModal.bind(this)}
                   title={this.state.editCollection.createMode ? "Collection creating" : "Edit collection info"}>
                <label className="label">Name<input type="text"
                                                    autoComplete="off"
                                                    maxLength="100"
                                                    value={this.state.editCollection.name}
                                                    onChange={this.handleNameChange.bind(this)}
                                                    className={this.state.editCollection.name ?
                                                        "green-border" : "red-border"}/>
                </label>
                <label className="label">Description
                    <textarea autoComplete="off"
                              maxLength="500"
                              wrap="soft"
                              value={this.state.editCollection.description}
                              onChange={this.handleDescriptionChange.bind(this)}
                              className={this.state.editCollection.description ?
                                  "green-border" : "red-border"}/>
                </label>
                <button onClick={() => {
                    if (this.state.editCollection.name && this.state.editCollection.description) {
                        if (!this.state.editCollection.createMode) {
                            this.editCollection();
                        } else {
                            this.createCollection();
                        }
                    }
                }}
                        className="modal-button">
                    {this.state.editCollection.createMode ? "Create" : "Edit"}
                </button>
            </Modal>

            <Modal shown={this.state.deleteModal.deleteCollectionModalShown}
                   closeModal={this.onCloseDeleteModal.bind(this)}
                   title="Are you sure you want to delete this collection?">
                <DeleteConfirm
                    onReject={this.onCloseDeleteModal.bind(this)}
                    onConfirm={() => {
                        this.props.deleteCollection(this.state.deleteModal.collectionId, this.onCloseDeleteModal.bind(this));
                    }}/>
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
        },
        createCollection: (data, callback) => {
            dispatch(createCollection(data, callback))
        }
    })
)(CollectionsContainer);