import React, {Component} from 'react';
import './style.css';

export default class DeleteConfirm extends Component {
    render() {
        return <div className="delete-modal">
            <button className="modal-button"
                    onClick={this.props.onConfirm}>
                Yes
            </button>
            <button className="modal-button"
                    onClick={this.props.onReject}>
                No
            </button>
        </div>
    }
}