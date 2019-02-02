import API from "../lib/api";

export const user = {
    ping: () => API.post('/users/guest'),
    addProduct:(data) => API.post('/shops/digikala',data),
    products:() => API.get('/products'),
    remove:(data) => API.post('/products/delete',data)
}


