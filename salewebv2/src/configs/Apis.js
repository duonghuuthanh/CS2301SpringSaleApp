import axios from "axios";
import cookies from 'react-cookies'

export const endpoints = {
    'categories': '/categories',
    'products': '/products',
    'register': '/users',
    'login': '/login',
    'current-user': '/secure/profile',
    'pay': '/secure/pay',
    'product-detais': (productId) => `/products/${productId}`,
    'comments': (productId) => `/products/${productId}/comments`,
    'add-comment': (productId) => `/secure/products/${productId}/comments`
}

export const authApis = () => {
    return axios.create({
        baseURL: 'http://localhost:8080/SpringSaleAppV1/api/',
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: 'http://localhost:8080/SpringSaleAppV1/api/'
})