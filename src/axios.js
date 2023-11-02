import axios from "axios";

const loginApi = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getUser = () => {
    return axios.get('https://reqres.in/api/users/2')
}

const login = (email, password) => {
    return axios.post('https://localhost:7195/api/User/Login', { email: email, password: password }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }

    }
    )
}
export { loginApi, getUser };