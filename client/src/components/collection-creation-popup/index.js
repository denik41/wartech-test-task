import React, {Component} from 'react';
import './style.css';

export default class CollectionCreationPopup extends Component {
    render() {
        return <div className={`modal-container`}
                    onClick={() => {
                        console.log('click')
                    }}>
            <div className="modal" onClick={() => {

            }}>
                <label>Name
                    <input type="text"/>
                </label>
                <label>Description
                    <input type="text"/>
                </label>
                <label>Books
                    <select>
                        <option>qwerty</option>
                        <option>qwerty</option>
                        <option>qwerty</option>
                        <option>qwerty</option>
                        <option>qwerty</option>
                    </select>
                </label>
                <button>
                    Close
                </button>
            </div>
        </div>
    }
}