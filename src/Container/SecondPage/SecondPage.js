import React, {Component} from "react";
import Header from "../../Components/Header/Header";
import {connect} from "react-redux";
import {User} from "../../actions/getUser";
import '../../Container/HomePage/HomePage.css'
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import userImg from '../../assets/user.PNG';
import {Search} from "@material-ui/icons";

class UserList extends Component {
    constructor() {
        super();

        this.state = {
            name:'',
            email:'',
            search: '',
            arr2:[],
            arr1:[],
            arr3:[],
            arr4:[],
        };



        // this.onChange = this.onChange.bind(this);
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)})
    }
   
    componentDidMount() {
        this.props.fetchData("http://localhost:5000/users/findAllUser")
    }

    deleteUser = id => {
        return axios
            .delete(`http://localhost:5000/users/${id}`)
            .catch(err => {
                console.error(err);
            });
    };

    getAll =  () => {
        this.props.fetchData(`http://localhost:5000/users/findAllUser`)
    };

    addUserFriend = id => {
        return axios
            .patch(`http://localhost:5000/users/addFriend/${id}`)
            .catch(err => {
                console.error(err);
            });
    };
    cancelRequest = id => {
        return axios
            .patch(`http://localhost:5000/users/cancelRequest/${id}`)
            .catch(err => {
                console.error(err);
            });
    };


    render() {
        let FilteredUsers = this.props.users.filter(
            (user)=>{
                return user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        );


        return (
            <div>


                <Header/>

                {
                    FilteredUsers.map((user) => {
                        if (user.statusId === 2){

                            this.state.arr2.push(user);
                        }
                        if (user.statusId === 1){

                            this.state.arr1.push(user);
                        }
                        if (user.statusId === 3){

                            this.state.arr3.push(user);
                        }
                        if (user.statusId === 4){

                            this.state.arr4.push(user);
                        }

                    })
                }
                {<h1>  Pending Request </h1>}
                {<h2>  Incoming </h2>}
                {
                    this.state.arr4.map((user)=>{
                        return(
                            <div key={user.id}>
                                <div>
                                    <li className={'UserCard'}>
                                        <div>
                                            {user.name}
                                            {user.email}
                                        </div>

                                        <div>


                                            <button className={'Control_Btn Reserve'}
                                                    onClick={() => {
                                                        this.addUserFriend(user.id).then(() => {
                                                            // return this.getAll()
                                                        });
                                                    }}>
                                                Accept

                                            </button>

                                            <button

                                                className={'Control_Btn Delete'}
                                                onClick={() => {
                                                    this.deleteUser(user.id).then(() => {
                                                        return this.getAll()
                                                    });
                                                }}>


                                                Ignore
                                            </button>
                                        </div>
                                    </li>
                                </div>

                            </div>
                        )
                    })
                }




                {<h2>Outgoing</h2>}

                {
                    this.state.arr3.map((user)=>{
                        return(
                            <div key={user.id}>
                                <li className={'UserCard'}>
                                    <div>
                                        {user.name}
                                        {user.email}
                                    </div>
                                    {

                                        localStorage.token && user.statusId === 3 ?
                                            <div className={'Pending'}>
                                                pending request
                                                <div
                                                    className={"Friend"}
                                                >
                                                    <button
                                                        className={`Control_Btn Delete`}
                                                        onClick={() => {
                                                            this.cancelRequest(user.id).then(() => {
                                                                return this.getAll()
                                                            });

                                                        }}
                                                    >
                                                        Cancel request
                                                    </button>
                                                </div>
                                            </div> : ''
                                    }
                                </li>

                            </div>
                        )
                    })
                }

                {<h2>Friend</h2>}
                {
                    this.state.arr1.map((user)=>{


                        return(


                            <div >
                                <div key={user.id}>


                                    <li className={'UserCard'}>
                                        <div>
                                            {user.name}
                                            {user.email}
                                        </div>
                                        {

                                            localStorage.token && user.statusId === 1 ?
                                                <div className={'Pending'}>
                                                    <div>
                                                        <p>Friend</p>
                                                    </div>
                                                    <button
                                                        className={'Control_Btn Delete'}
                                                        onClick={() => {
                                                            this.deleteUser(user.id).then(() => {
                                                                return this.getAll()
                                                            });
                                                        }}
                                                    >
                                                        Delete {user.id}


                                                    </button>

                                                </div>: ''


                                        }
                                    </li>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}


const mapStateToProps = (store) => {
    console.log(store.search);
    return {
        users: store.UserReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        fetchData: url => dispatch(User(url))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);


