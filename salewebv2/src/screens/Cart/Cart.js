import { useContext, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import cookies from 'react-cookies'
import { MyCartContext, MyUserContext } from "../../configs/Contexts";
import { Link } from "react-router-dom";
import MySpinner from "../../components/MySpinner";
import { authApis, endpoints } from "../../configs/Apis";

const Cart = () => {
    const [cart, setCart] = useState(cookies.load('cart') || null);
    const [cartInfo, ] = useContext(MyCartContext);
    const [user, ] = useContext(MyUserContext);
    const [loading, setLoading] = useState(false);
    const [, cartDispatch] = useContext(MyCartContext);

    const pay = async () => {
        if (window.confirm("Bạn chắc chắn thanh toán?") === true) {
            let cart = cookies.load('cart') || null;
            if (cart !== null) {
                try {
                    setLoading(true);
    
                    let res = await authApis().post(endpoints['pay'], Object.values(cart));
                    if (res.status === 201) {
                        setCart([]);
                        cartDispatch({
                            "type": "PAID"
                        })
                    }
    
                } catch (ex) {
                    console.error(ex);
                } finally {
                    setLoading(false);
                }
            }
        }
        
    }

    const updateCart = (e, productId) => {
        if (cart !== null && productId in cart) {
            setCart({...cart, [productId]: {
                ... cart[productId],
                "quantity": parseInt(e.target.value)
            }});
            cookies.save('cart', cart);
            cartDispatch({
                "type": "UPDATE"
            })
        }
    }

    return (
        <>
            <h1 className="text-center text-success mt-1">GIỎ HÀNG</h1>

            {cart === null || cart.length == 0 ?<Alert variant="warning" className="mt-2">KHÔNG có sản phẩm nào trong giỏ!</Alert>:<>
            
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(cart).map(c => <tr key={c.id}>
                                                        <td>{c.id}</td>
                                                        <td>{c.name}</td>
                                                        <td>{c.price.toLocaleString()} VNĐ</td>
                                                        <td>
                                                            
                                                            <Form.Control type="number" value={c.quantity} onChange={e => updateCart(e, c.id)} />
                                                            
                                                        </td>
                                                        <td>

                                                            <Button variant="danger">&times;</Button>
                                                        </td>
                                                    </tr>)}
                        
                    </tbody>
                </Table>

                <Alert variant="info">
                    <h3>Tổng tiền: {cartInfo.totalAmount.toLocaleString()} VNĐ</h3>
                    <h3>Tổng sản phẩm: {cartInfo.totalQuantity}</h3>
                </Alert>
                <div className="mb-2">
                    {user === null?<Alert variant="warning">Vui lòng <Link to="/login?next=/cart">đăng nhập</Link> để thanh toán!</Alert>: <>
                        {loading === true ? <MySpinner />:<Button onClick={pay} variant="success">Thanh toán</Button>}
                    </>}
                </div>
            </>}
        </>
    );
}

export default Cart;