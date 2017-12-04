import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import CollectionsContainer from './components/collections-container';
import Collection from './components/collection';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={CollectionsContainer}/>
                    <Route path="/collection/:id" component={Collection}/>
                </div>
            </Router>
        );
    }
}


