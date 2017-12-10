import React, {Component} from 'react';
import './style.css';

export default class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBookIndex: props.books.length > 0 ? 0 : null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.books.length === 0 && nextProps.books.length > 0) {
            this.setState({selectedBookIndex: 0})
        }
    }

    render() {
        const options = this.props.books.map((book, index) => {
            return <option key={index} value={index}>{book.name} ({book.author})</option>
        });



        return <div className="add-book-container">
            <div className="">
                <span className="add-book-text">Select the book to add</span>
                <select onChange={(event) => {
                    this.setState({selectedBookIndex: event.target.value})
                }}
                        className="add-book-select">
                    {options}
                </select>
            </div>

            <button onClick={() => {
                if (this.state.selectedBookIndex !== null && this.props.books.length > 0) {
                    this.props.addBook(this.props.books[this.state.selectedBookIndex]);
                }
            }}>Add
            </button>
        </div>
    }
}