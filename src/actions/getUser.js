import {FIND_ALL_USER} from "../actionTypes/actionsType";

export function UserSuccess(users) {
    return{
        type: FIND_ALL_USER,
        users
    }
}

export function User(url) {
    return (dispatch) =>{
        fetch(url)
            .then(response =>{
                if (!response.ok){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(users => dispatch(UserSuccess(users)))
            .catch(()=>{});
    }
}
