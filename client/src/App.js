import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import CollectionsContainer from './components/collections-container';
import Collection from './components/collection';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <button>Create collection</button>
                    <button>Create book</button>
                    <Route exact path="/" component={CollectionsContainer}/>
                    <Route path="/collection/:id" component={Collection}/>
                </div>
            </Router>
        );
    }
}


