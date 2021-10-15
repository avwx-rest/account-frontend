import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://avwx-account-dev.azurewebsites.net/',
    // baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default instance