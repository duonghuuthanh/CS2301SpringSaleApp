import cookies from 'react-cookies'

export default (current, action) => {
    if (action.type === 'UPDATE') {
        let cart = cookies.load('cart') || null;
        let totalAmount = 0;
        let totalQuantity = 0;
        if (cart !== null) {
           
            for (let c of Object.values(cart)) {
                totalQuantity += c.quantity;
                totalAmount += c.quantity * c.price;
            }
        }

        return {
            "totalAmount": totalAmount,
            "totalQuantity": totalQuantity
        }
    }

    return current;
}