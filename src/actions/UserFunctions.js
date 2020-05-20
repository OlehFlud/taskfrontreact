import axios from 'axios'
export const register = newUser => {
    return axios
        .post(' http://localhost:5000/users/signup ', {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log('Registered')
        })
};

export const login = user => {
    return axios
        .post(' http://localhost:5000/users/login ', {
            email: user.email,
            name: user.name,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('token', response.data.access_token);
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
};



