import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import {
    getSingleCollection,
    editSingleCollection,
    addBook,
    removeBook,
    clearSingleCollection
} from '../../actions/collections';
import {
    getBooks
} from '../../actions/books';
import AddBook from '../add-book-component';
import BookSample from '../book-sample';
import Modal from '../modal';
import DeleteConfirm from '../delete-confirm';
import EditModalContent from '../edit-modal-content';

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editName: "",
            editDescription: "",
            editModalShown: false,
            removeBook: {
                modalShown: false,
                id: "",
                index: null
            }
        }
    }

    componentDidMount() {
        this.props.getSingleCollection(this.props.match.params.id);
        this.props.getBooks();
    }

    componentWillUnmount() {
        this.props.clearSingleCollection();
    }

    closeDeleteModal() {
        this.setState({
            removeBook: {
                modalShown: false,
                id: "",
                index: null
            }
        });
    }

    openEditModal() {
        this.setState({
            editModalShown: true,
            editName: this.props.collection.data.name,
            editDescription: this.props.collection.data.description
        });
    }

    closeEditModal() {
        this.setState({
            editModalShown: false,
            editName: "",
            editDescription: "",
        });
    }

    render() {
        const collection = this.props.collection.data;
        if (!collection) {
            return null;
        }

        const books = collection.books;
        const booksElem = books.map((book, index) => {
            return <BookSample book={book}
                               key={index}
                               onRemoveBook={() => {
                                   this.setState({
                                       removeBook: {
                                           modalShown: true,
                                           id: book._id,
                                           index
                                       }
                                   });
                               }}/>
        });

        return <div className="collection-container">
            <div className="collection-title-container">
                <div>
                    <button onClick={this.openEditModal.bind(this)}>
                        Edit collection
                    </button>
                </div>
                <span>{collection.name}</span>
                <div></div>
            </div>
            <span className="collection-description-container">{collection.description}</span>
            <span className="collection-books-title">Books of collection</span>
            {books.length !== 0 ?
                <div className="books-list">
                    {booksElem}
                </div> :
                <span className="empty">No books</span>
            }
            <AddBook addBook={(book) => {
                this.props.addBook(book, this.props.match.params.id);
            }}
                     books={this.props.books}/>

            <Modal shown={this.state.removeBook.modalShown}
                   closeModal={this.closeDeleteModal.bind(this)}
                   title="Do you want to remove this book from collection?">
                <DeleteConfirm
                    onReject={this.closeDeleteModal.bind(this)}
                    onConfirm={() => {
                        this.props.removeBook({
                            collectionId: this.props.match.params.id,
                            bookId: this.state.removeBook.id,
                            index: this.state.removeBook.index
                        }, this.closeDeleteModal.bind(this));
                    }}/>
            </Modal>

            <Modal shown={this.state.editModalShown}
                   closeModal={this.closeEditModal.bind(this)}
                   title="Collection editor">
                <EditModalContent
                    buttonTitle="Edit"
                    name={this.state.editName}
                    description={this.state.editDescription}
                    onConfirm={(name, description) => {
                        this.props.editSingleCollection({
                            id: this.props.match.params.id,
                            name,
                            description
                        }, this.closeEditModal.bind(this));
                    }}
                    onReject={this.closeEditModal.bind(this)}/>
            </Modal>
        </div>
    }
}

export default connect(
    state => ({
        collection: state.singleCollection,
        books: state.books.data
    }),
    dispatch => ({
        getSingleCollection: (id) => {
            dispatch(getSingleCollection(id))
        },
        editSingleCollection: (params, callback) => {
            dispatch(editSingleCollection(params, callback))
        },
        getBooks: () => {
            dispatch(getBooks())
        },
        addBook: (book, collectionId) => {
            dispatch(addBook(book, collectionId))
        },
        removeBook: (data, callback) => {
            dispatch(removeBook(data, callback))
        },
        clearSingleCollection: () => {
            dispatch(clearSingleCollection())
        }
    })
)(Collection);