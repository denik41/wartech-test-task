import React, {Component} from 'react';
import './style.css';
import RemoveImage from '../../assets/img/remove.jpg';
import axios from 'axios';

export default class BookSample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastValue: props.book.rating || 0,
            inputValue: props.book.rating || 0,
            inputShown: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.inputValue !== nextProps.book.rating) {
            this.setState({
                lastValue: nextProps.book.rating || 0,
                inputValue: nextProps.book.rating || 0
            });
        }
    }

    rateRequest(rating, callback) {
        const config = {
            method: 'PUT',
            url: `http://localhost:3001/api/books/${this.props.book._id}`,
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            data: `name=${this.props.book.name}&author=${this.props.book.author}&price=${this.props.book.price}&rating=${rating}`
        };

        axios(config)
            .then(function (response) {
                console.log(response);
                callback(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    onInputBlur() {
        if (this.state.inputValue < 0 || this.state.inputValue > 5) {
            this.setState({
                inputValue: this.state.lastValue,
                inputShown: false
            });
        } else {
            this.rateRequest(this.state.inputValue, (res) => {
                this.setState({
                    inputValue: res.data.rating,
                    lastValue: res.data.rating,
                    inputShown: false
                })
            });
        }
    }

    render() {
        const ratingInput = <input type="number"
                                   autoComplete="off"
                                   maxLength="10"
                                   value={this.state.inputValue}
                                   onChange={(event) => {
                                       this.setState({inputValue: event.target.value});
                                   }}
                                   className="green-border"
                                   min={0}
                                   max={5}
                                   onBlur={this.onInputBlur.bind(this)}/>;
        const ratingValue = <span className="rating-value"
                                  onClick={() => {
                                      this.setState({inputShown: true})
                                  }}>{this.state.inputValue || 0}</span>;
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
                <span>Rate: {this.state.inputShown ? ratingInput : ratingValue}</span>
            </div>
        </div>
    }
}
