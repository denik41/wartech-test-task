import React, {Component} from 'react';
import './style.css';

export default class CreateBookModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            author: "",
            price: "",
            rating: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.shown && !nextProps.shown) {
            this.setState({
                name: "",
                author: "",
                price: "",
                rating: 0
            });
        }
    }

    handleFieldChange(value, field) {
        this.setState({
            [field]: value
        });
    }

    render() {
        return <div>
            <label className="label">Name
                <input type="text"
                       autoComplete="off"
                       maxLength="200"
                       value={this.state.name}
                       onChange={(event) => {
                           this.handleFieldChange(event.target.value, "name")
                       }}
                       className={this.state.name ? "green-border" : "red-border"}/>
            </label>
            <label className="label">Author
                <input type="text"
                       autoComplete="off"
                       maxLength="100"
                       value={this.state.author}
                       onChange={(event) => {
                           this.handleFieldChange(event.target.value, "author")
                       }}
                       className={this.state.author ? "green-border" : "red-border"}/>
            </label>
            <label className="label">Price
                <input type="number"
                       autoComplete="off"
                       maxLength="10"
                       value={this.state.price}
                       onChange={(event) => {
                           this.handleFieldChange(event.target.value, "price")
                       }}
                       className={this.state.price ? "green-border" : "red-border"}
                       min={0}
                       onBlur={() => {
                           if (this.state.price < 0) {
                               this.setState({price: ""});
                           }
                       }}/>
            </label>
            <label className="label">Rate
                <input type="number"
                       autoComplete="off"
                       maxLength="10"
                       value={this.state.rating}
                       onChange={(event) => {
                           this.handleFieldChange(event.target.value, "rating")
                       }}
                       className="green-border"
                       min={0}
                       max={5}
                       onBlur={() => {
                           if (this.state.rating < 0 || this.state.rating > 5) {
                               this.setState({rating: 0});
                           }
                       }}/>
            </label>

            <button onClick={() => {
                if (this.state.name && this.state.author && this.state.price !== "") {
                    this.props.onCreate({
                        name: this.state.name,
                        author: this.state.author,
                        price: this.state.price,
                        rating: this.state.rating
                    });
                }
            }
            }
                    className="modal-button">
                Create
            </button>
        </div>
    }
}