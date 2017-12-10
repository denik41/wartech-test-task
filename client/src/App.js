import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';

import CollectionsContainer from './components/collections-container';
import Collection from './components/collection';
import BooksList from './components/books-list';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="nav-links-container">
                        <NavLink to="/"
                                 className="nav-link"
                                 activeClassName="nav-link-active"
                                 exact={true}>
                            Collections
                        </NavLink>
                        <NavLink to="/books"
                                 className="nav-link"
                                 activeClassName="nav-link-active"
                                 exact={true}>
                            Books
                        </NavLink>
                    </div>
                    <Route exact path="/" component={CollectionsContainer}/>
                    <Route path="/collection/:id" component={Collection}/>
                    <Route path="/books" component={BooksList}/>
                </div>
            </Router>
        );
    }
}