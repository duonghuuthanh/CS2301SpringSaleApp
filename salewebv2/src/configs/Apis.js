import axios from "axios";
import cookies from 'react-cookies'

export const endpoints = {
    'categories': '/categories',
    'products': '/products',
    'register': '/users',
    'login': '/login',
    'current-user': '/secure/profile'
}

export const authApis = () => {
    return axios.create({
        baseURL: 'http://localhost:8080/SpringSaleAppV2/api/',
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: 'http://localhost:8080/SpringSaleAppV2/api/'
})