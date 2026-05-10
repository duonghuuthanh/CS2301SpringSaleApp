import { useContext, useEffect, useState } from "react";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Apis";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import cookies from 'react-cookies'
import { MyCartContext } from "../../configs/Contexts";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [q] = useSearchParams();
    const [, dispatch] = useContext(MyCartContext);

    const loadProducts = async () => {
        try {
            setLoading(true);

            let url = `${endpoints['products']}?page=${page}`;

            const cateId = q.get('cateId');
            if (cateId) {
                url = `${url}&cateId=${cateId}`;
            }

            const kw = q.get('kw');
            if (kw) {
                url = `${url}&kw=${kw}`;
            }

            let res = await Apis.get(url);
            if (res.data.length == 0)
                setPage(0);

            if (page === 1)
                setProducts(res.data);
            else if (page > 1)
                setProducts([...products, ...res.data]);
        } catch (ex) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (page > 0)
            loadProducts();
    }, [q, page]);

    useEffect(() => {
        setPage(1);
    }, [q]);
    
    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }

    const order = (p) => {
        let cart = cookies.load('cart') || null;
        if (cart === null)
            cart = {}

        if (p.id in cart) {
            cart[p.id]['quantity']++;
        } else {
            cart[p.id] = {
                'id': p.id,
                'name': p.name,
                'price': p.price,
                'quantity': 1
            }
        }

        cookies.save('cart', cart);

        dispatch({
            'type': 'UPDATE'
        })
    }

    return (
        <>
            {products.length === 0 && <Alert variant="warning" className="mt-2">KHÔNG có sản phẩm nào!</Alert>}
            <Row>
                {products.map(p => <>
                    <Col md={3} xs={6} className="p-2">
                        <Card>
                            <Card.Img variant="top" src={p.image} />
                            <Card.Body>
                                <Card.Title>{p.name}</Card.Title>
                                <Card.Text>{p.price.toLocaleString()} VNĐ</Card.Text>
                                <Button variant="danger" className="me-1" onClick={() => order(p)}>Đặt hàng</Button>
                                <Button variant="info">Xem chi tiết</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </>)}
            </Row>

            {page > 0 &&  <div className="text-center mb-1">
                <Button variant="success" onClick={loadMore}>Xem thêm...</Button>
            </div>}

            {loading && <MySpinner />}
        </>
    );
}

export default Home;