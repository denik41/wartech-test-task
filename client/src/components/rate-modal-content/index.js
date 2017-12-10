import React, {Component} from 'react';
import './style.css';

export default class RateModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.shown && !nextProps.shown) {
            this.setState({
                rating: 0
            });
        }
    }

    render() {
        return <div>
            <label className="rate-label">Rating
                <input type="number"
                       autoComplete="off"
                       maxLength="10"
                       value={this.state.rating}
                       onChange={(event) => {
                           this.setState({rating: event.target.value})
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
                this.props.onRate(this.state.rating);
            }}
                    className="modal-button">
                Rate
            </button>
        </div>
    }
}