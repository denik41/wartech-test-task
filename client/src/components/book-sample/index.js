import React, {Component} from 'react';
import './style.css';
import RemoveImage from '../../assets/img/remove.jpg';

export default class BookSample extends Component {
    render() {
        return <div className="book-sample-container">
            <div className="name-author-container">
                <span className="book-name">
                    {this.props.book.name}
                </span>
                <span className="book-author">
                    ({this.props.book.author})
                </span>
                <span className="book-price">
                    Price: <span>{this.props.book.price}</span>
                </span>
            </div>
            <div className="right-panel">
                <input type="image"
                       src={RemoveImage}
                       alt="Remove book from collection"
                       width="20"
                       height="20"
                       onClick={this.props.onRemoveBook}/>
                <span>Rate: <span>{this.props.book.rating || 0}</span></span>
            </div>
        </div>
    }
}
