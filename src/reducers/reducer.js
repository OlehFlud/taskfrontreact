import {FIND_ALL_USER} from "../actionTypes/actionsType";

const initialState = {
    users: []
};


const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case FIND_ALL_USER:
            const {users} = action;
            return {...state, users};

        default:
            return state;
    }
};

export default UserReducer
