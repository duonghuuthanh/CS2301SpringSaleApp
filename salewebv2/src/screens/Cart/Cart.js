import { useContext, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import cookies from 'react-cookies'
import { MyCartContext, MyUserContext } from "../../configs/Contexts";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState(cookies.load('cart') || null);
    const [cartInfo, ] = useContext(MyCartContext);
    const [user, ] = useContext(MyUserContext);

    return (
        <>
            <h1 className="text-center text-success mt-1">GIỎ HÀNG</h1>

            {cart === null?<Alert variant="warning" className="mt-2">KHÔNG có sản phẩm nào trong giỏ!</Alert>:<>
            
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
                                                        <td>{c.quantity}</td>
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
                    {user === null?<Alert variant="warning">Vui lòng <Link to="/login?next=/cart">đăng nhập</Link> để thanh toán!</Alert>:<Button variant="success">Thanh toán</Button>}
                </div>
            </>}
        </>
    );
}

export default Cart;