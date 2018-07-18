import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {loginUser} from '../../actions/auth'
import TextFieldGroup from '../Common/TextFieldGroup'

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {},
    }

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.errors) {
            return {
                errors: nextProps.errors,
            }
        }
    }

    componentDidUpdate() {
        const {isAuthenticated} = this.props.auth
        if (isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSubmit = e => {
        e.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(userData)
    }

    render() {
        const {errors} = this.state
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Sign in to your DevConnector account
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    error={errors.email}
                                    onChange={this.onChange}
                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    error={errors.password}
                                    onChange={this.onChange}
                                />
                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
})

export default connect(
    mapStateToProps,
    {loginUser},
)(Login)
