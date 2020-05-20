import React, {Component} from "react";
import {Link} from "react-router-dom";
import './Header.css'


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolled: false,
            search: ''
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 10;
            if (isTop !== true) {
                this.setState({scroller: true});
            } else {
                this.setState({scroller: false});
            }
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => {
        });
    }

    // logOut(e) {
    //     e.preventDefault();
    //     localStorage.removeItem('token');
    //     this.props.history.push('/')
    // }


    render() {




        return (

            <div className={this.state.scroller ? 'scroller Header' : 'Header'}>



                <div className={"NavBar"}>

                    <div className={'NavContainer '}>

                            <li  className= {"ulNav"}>
                                <div className={'Authentications_Box'}>
                                    {/*<Link*/}
                                    {/*    onClick={this.logOut.bind(this)}*/}
                                    {/*    className="Authentications_link"*/}
                                    {/*    to={''}*/}
                                    {/*>Logout</Link>*/}
                                    <Link to={`/`}

                                        className="Authentications_link"
                                    >
                                        User
                                    </Link>
                                </div>

                                <div className={'Authentications_Box'}>

                                <Link to={`/Friends`}

                                        className="Authentications_link"
                                    >
                                    Friends
                                    </Link>
                                </div>





                            </li>

                    </div>

                </div>


                {/*{*/}
                {/*    localStorage.token ?*/}
                {/*        <div className={'Authentications_Box'}>*/}
                {/*            /!*<Link*!/*/}
                {/*            /!*    onClick={this.logOut.bind(this)}*!/*/}
                {/*            /!*    className="Authentications_link"*!/*/}
                {/*            /!*    to={''}*!/*/}
                {/*            /!*>Logout</Link>*!/*/}
                {/*            <Link*/}

                {/*                className="Authentications_link"*/}
                {/*            >*/}
                {/*                Support*/}
                {/*            </Link>*/}
                {/*        </div>*/}
                {/*        :*/}
                {/*        <div className={'Authentications_Box'}>*/}
                {/*            <Link*/}
                {/*                className={`Authentications_link`}*/}
                {/*                to={'/login'}*/}
                {/*            >*/}
                {/*                Sign in</Link>*/}
                {/*            <Link*/}
                {/*                className={`Authentications_link`}*/}
                {/*                to={'/register'}*/}
                {/*            >Sign up</Link>*/}
                {/*        </div>*/}
                {/*}*/}


            </div>

        )
    }
}
