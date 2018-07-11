import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'

import { setCurrentUser, logoutUser } from './actions/auth'
import { clearCurrentProfile } from './actions/profile'
import setAuthToken from './utils/setAuthToken'
import store from './store'

import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Landing from './components/Layout/Landing'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard/Dashboard'

import './App.css'

//Check for token
if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded))
    //Check for expired token
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser())
        store.dispatch(clearCurrentProfile())
        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <div className="container">
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/dashboard"
                                component={Dashboard}
                            />
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App
