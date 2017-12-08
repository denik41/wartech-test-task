import React, {Component} from 'react';
import './style.css';

export default class EditModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            description: props.description
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.name !== nextProps.name || this.props.description !== nextProps.description) {
            this.setState({
                name: nextProps.name,
                description: nextProps.description
            });
        }
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        });
    }

    render() {
        return <div>
            <label className="label">Name
                <input type="text"
                       autoComplete="off"
                       maxLength="100"
                       value={this.state.name}
                       onChange={this.handleNameChange.bind(this)}
                       className={this.state.name ? "green-border" : "red-border"}/>
            </label>
            <label className="label">Description
                <textarea autoComplete="off"
                          maxLength="500"
                          wrap="soft"
                          value={this.state.description}
                          onChange={this.handleDescriptionChange.bind(this)}
                          className={this.state.description ? "green-border" : "red-border"}/>
            </label>
            <button onClick={() => {
                if (this.state.name && this.state.description) {
                    this.props.onConfirm(this.state.name, this.state.description);
                }
            }}
                    className="modal-button">
                {this.props.buttonTitle}
            </button>
        </div>
    }
}