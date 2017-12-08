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

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editName: "",
            editDescription: "",
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

    componentWillReceiveProps(nextProps) {
        if (this.props.collection.loading && !nextProps.collection.loading) {
            this.setState({
                editName: nextProps.collection.data.name,
                editDescription: nextProps.collection.data.description
            });
        }
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
                    <button onClick={() => {
                        this.dialog.show();
                    }}>
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


            <dialog ref={dialog => this.dialog = dialog}>
                <label>Name<input type="text"
                                  autoComplete="off"
                                  maxLength="100"
                                  value={this.state.editName}
                                  onChange={(event) => {
                                      this.setState({
                                          editName: event.target.value
                                      });
                                  }}/>
                </label>
                <label>Description
                    <textarea autoComplete="off"
                              maxLength="500"
                              wrap="soft"
                              value={this.state.editDescription}
                              onChange={(event) => {
                                  this.setState({
                                      editDescription: event.target.value
                                  });
                              }}/>
                </label>
                <p>
                    <button onClick={() => {
                        this.props.editSingleCollection({
                            id: this.props.match.params.id,
                            name: this.state.editName,
                            description: this.state.editDescription
                        }, () => {
                        });
                    }}>Edit
                    </button>
                    <button onClick={() => {
                        this.dialog.close();
                    }}>Close
                    </button>
                </p>
            </dialog>
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