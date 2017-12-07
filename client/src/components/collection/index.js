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
import axios from 'axios';

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editName: "",
            editDescription: ""
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

    render() {
        const collection = this.props.collection.data;
        if (!collection) {
            return null;
        }

        const books = collection.books;
        const booksElem = books.map((book, index) => {
            return <div key={index}>
                {book.name}
                <div>
                    <button onClick={() => {
                        this.props.removeBook(this.props.match.params.id, book._id, index);
                    }}>Remove book</button>
                </div>
            </div>;
        });
        return <div>
            <div>
                <h3>{collection.name}</h3>
                <span>{collection.description}</span>
                <div>
                    <button onClick={() => {
                        this.dialog.show();
                    }}>
                        Edit collection's info
                    </button>
                </div>
            </div>
            <AddBook addBook={(book) => {
                this.props.addBook(book, this.props.match.params.id);
            }}
                     books={this.props.books}/>
            {books.length !== 0 ? booksElem :
                <span>No books</span>
            }
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
        editSingleCollection: (params) => {
            dispatch(editSingleCollection(params))
        },
        getBooks: () => {
            dispatch(getBooks())
        },
        addBook: (book, collectionId) => {
            dispatch(addBook(book, collectionId))
        },
        removeBook: (collectionId, bookId, index) => {
            dispatch(removeBook(collectionId, bookId, index))
        },
        clearSingleCollection: () => {
            dispatch(clearSingleCollection())
        }
    })
)(Collection);