import React, {Component} from 'react';
import './style.css';
import {Link} from 'react-router-dom'
import EditImage from '../../assets/img/edit.png';
import RemoveImage from '../../assets/img/remove.jpg';

export default class CollectionSample extends Component {
    render() {
        const collection = this.props.data;
        return <div>
            <div className="sample-container">
                <div className="info-container">
                    <div>
                        <Link to={`/collection/${collection._id}`} className="name">
                            {collection.name}
                        </Link>
                    </div>
                    <span className="description">{collection.description}</span>
                </div>
                <div className="buttons-container">
                    <input type="image"
                           src={EditImage}
                           alt="Edit collection"
                           width="38" height="38"
                           className="edit"
                           onClick={() => {
                               this.props.openEditModal(collection);
                           }}/>
                    <input type="image"
                           src={RemoveImage}
                           alt="Delete collection"
                           width="38"
                           height="38"
                           className="delete"/>
                </div>
            </div>
        </div>
    }
}
