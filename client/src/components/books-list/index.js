import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import BookSample from '../book-sample';
import {
    getBooks,
    deleteBook,
    createBook,
    rateBook
} from '../../actions/books';
import Modal from '../modal';
import DeleteConfirm from '../delete-confirm';
import PlusImage from '../../assets/img/plus.jpg';
import CreateBookModalContent from '../create-book-modal-content';
import RateModalContent from '../rate-modal-content';

class BooksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteConfirmModalShown: false,
            deleteBookId: "",
            createModalShown: false
        }
    }

    componentDidMount() {
        this.props.getBooks();
    }

    closeDeleteConfirmModal() {
        this.setState({
            deleteConfirmModalShown: false,
            deleteBookId: ""
        });
    }

    openDeleteConfirmModal(id) {
        this.setState({
            deleteConfirmModalShown: true,
            deleteBookId: id
        });
    }

    openCreatingModal() {
        this.setState({
            createModalShown: true
        });
    }

    closeCreatingModal() {
        this.setState({
            createModalShown: false
        });
    }

    render() {
        const list = this.props.books.map((book, index) => {
            return <BookSample book={book}
                               key={index}
                               onRemoveBook={() => {
                                   this.openDeleteConfirmModal(book._id);
                               }}/>
        });

        return <div className="books-list-container">
            <span className="books-list-title">Books List</span>
            {list}

            <div className="create-container">
                <input type="image"
                       src={PlusImage}
                       alt="Create collection"
                       width="38"
                       height="38"
                       onClick={this.openCreatingModal.bind(this)}/>
            </div>

            <Modal shown={this.state.deleteConfirmModalShown}
                   closeModal={this.closeDeleteConfirmModal.bind(this)}
                   title="Do you want to delete this book?">
                <DeleteConfirm
                    onReject={this.closeDeleteConfirmModal.bind(this)}
                    onConfirm={() => {
                        this.props.deleteBook(this.state.deleteBookId, this.closeDeleteConfirmModal.bind(this));
                    }}/>
            </Modal>

            <Modal shown={this.state.createModalShown}
                   closeModal={this.closeCreatingModal.bind(this)}
                   title="Create new book">
                <CreateBookModalContent
                    onCreate={(data) => {
                        this.props.createBook(data, this.closeCreatingModal.bind(this));
                    }}
                    shown={this.state.createModalShown}/>
            </Modal>
        </div>
    }
}

export default connect(
    state => ({
        books: state.books.data
    }),
    dispatch => ({
        getBooks: () => {
            dispatch(getBooks())
        },
        deleteBook: (id, callback) => {
            dispatch(deleteBook(id, callback))
        },
        createBook: (data, callback) => {
            dispatch(createBook(data, callback))
        },
        rateBook: (data, index, callback) => {
            dispatch(rateBook(data, index, callback))
        }
    })
)(BooksList);