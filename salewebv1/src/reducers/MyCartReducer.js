import cookies from 'react-cookies'

export default (current, action) => {
    if (action.type === 'UPDATE') {
        let cart = cookies.load('cart') || null;
        if (cart != null) {
            let totalAmount = 0;
            let totalQuantity = 0;
            for (let c of Object.values(cart)) {
                totalQuantity += c.quantity;
                totalAmount += c.quantity * c.price;
            }

            return {
                "totalQuantity": totalQuantity,
                "totalAmount": totalAmount
            }
        }
    }

    return current;
}