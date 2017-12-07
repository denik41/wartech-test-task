import React, {Component} from 'react';
import './style.css';
import RemoveImage from '../../assets/img/remove.jpg';

export default class Modal extends Component {
    render() {
        return <div className={`modal ${this.props.shown ? '' : 'display-none'}`}
                    ref={div => this.modal = div}
                    onClick={(event) => {
                        if(event.target === this.modal) {
                            this.props.closeModal();
                        }
                    }}>
            <div className="modal-content">
                <div className="close-container">
                    <input type="image"
                           alt="Close modal"
                           src={RemoveImage}
                           width="20"
                           height="20"
                           className="close"
                           onClick={this.props.closeModal}/>
                </div>
                <span className="modal-title">{this.props.title}</span>
                {this.props.children}
            </div>
        </div>
    }
}