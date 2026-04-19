import axios from "axios";

export const endpoints = {
    'categories': '/categories',
    'products': '/products'
}

export default axios.create({
    baseURL: 'http://localhost:8080/SpringSaleAppV2/api/'
})