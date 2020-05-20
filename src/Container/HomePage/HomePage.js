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
            search: ''
        };
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
            .patch(`http://localhost:5000/room/addUserFriend/${id}`)
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
                <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} className="SearchInput"/>

                {/*<div>*/}
                {/*    <ul>*/}
                {/*        {FilteredUsers.map((user,index)=>*/}
                {/*            <li key={index}>*/}
                {/*                {user.name}*/}
                {/*            </li>*/}
                {/*        )}*/}
                {/*    </ul>*/}
                {/*</div>*/}
                {
                    localStorage.token ? FilteredUsers.map((user) => {

                        if (user.statusId === 2){

                        }
                        return (

                            <div className={'Main'} key={user.id}>

                                <li className={'UserCard'} >

                                        <img src={userImg} alt=""   />

                                    <div>
                                        {user.name}
                                        {user.email}
                                    </div>



                                        {

                                            localStorage.token && user.statusId === 2 ?
                                                <div
                                                    className={'Control_Btn Reserve'}
                                                    onClick={() => {
                                                        this.addUserFriend(user.id).then(() => {
                                                            return this.getAll()
                                                        });
                                                    }}
                                                >
                                                    Add Friend


                                                </div> : ''

                                        }
                                    {

                                        localStorage.token && user.statusId === 1 ?
                                            <div className={"Pending"}>
                                                <p>Friend</p>
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
                                            </div>
                                            : ''

                                    }


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
                                                            this.deleteUser(user.id).then(() => {
                                                                return this.getAll()
                                                            });

                                                        }}
                                                    >
                                                        Delete {user.id}
                                                    </button>
                                                </div>
                                            </div> : ''
                                    }

                                </li>
                            </div>
                        )
                    }) : <div className={'loading_Room'}>
                        <CircularProgress/>
                    </div>
                }


                {/*<Footer/>*/}
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


