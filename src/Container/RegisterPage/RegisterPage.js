import React, {Component} from "react";
import {register} from "../../actions/UserFunctions";
import './RegisterPage.css'

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: '',
            email: '',
            password: '',

        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        register(newUser).then(res => {
            if (res) {
                console.log(22);
                this.props.history.push(`/User?Name=${this.state.name}`);

            } else {
                console.log(22);
            }
        })
    }

    render() {

        console.log(this.props);

        return (
            <div className='loginRegister'>
                <div className='container'>
                    <form noValidate onSubmit={this.onSubmit}>

                        <div className="base-container">

                            <div className="header">Register</div>
                            <div className="content">
                                <div className="image">
                                </div>
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="name">name</label>
                                        <input type="text"
                                               name="name"
                                               placeholder="name"
                                               value={this.state.name}
                                               onChange={this.onChange}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email"
                                               name="email"
                                               placeholder="email"
                                               value={this.state.email}
                                               onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password"
                                               name="password"
                                               placeholder="password"
                                               value={this.state.password}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="register-footer">

                                <button
                                    onClick={event => (!this.state.name  || !this.state.email || !this.state.password) ? event.preventDefault() : null}
                                    type="submit"
                                    className="btn"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}
