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
import EditModalContent from '../edit-modal-content';

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

    closeCreateModal(name, description) {
        this.setState({
            editCollection: {
                ...this.state.editCollection,
                modalShown: false,
                isEmptyField: false,
                collectionId: "",
                createMode: false,
                name: name,
                description: description
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
                name: "",
                description: "",
                modalShown: true,
                createMode: true
            }
        });
    }

    createCollection(name, description) {
        this.props.createCollection({
            name,
            description
        }, () => {
            this.closeCreateModal(name, description);
        });
    }

    editCollection(name, description) {
        this.props.editSingleCollection({
            id: this.state.editCollection.collectionId,
            name,
            description
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
                <EditModalContent
                    buttonTitle={this.state.editCollection.createMode ? "Create" : "Edit"}
                    name={this.state.editCollection.name}
                    description={this.state.editCollection.description}
                    onConfirm={(name, description) => {
                        if (!this.state.editCollection.createMode) {
                            this.editCollection(name, description);
                        } else {
                            this.createCollection(name, description);
                        }
                    }}
                    onReject={this.closeModal.bind(this)}/>
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