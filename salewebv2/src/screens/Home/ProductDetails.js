import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MySpinner from "../../components/MySpinner";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import moment from "moment";
import 'moment/locale/vi';
import { MyUserContext } from "../../configs/Contexts";


const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [user, ] = useContext(MyUserContext);
    const [comment, setComment] = useState("");
    const nav = useNavigate();

    const loadProduct = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['product-detais'](productId));
            setProduct(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const loadComments = async () => {
        let res = await Apis.get(endpoints['comments'](productId));
        setComments(res.data)
    }

    useEffect(() => {
        loadProduct();
        loadComments();
    }, [productId]);

    const addComment = async () => {
        let res = await authApis().post(endpoints['add-comment'](productId), {
            'content': comment
        });
        if (res.status === 201)
            setComments([res.data, ...comments]);
    }

    return (
        <>
            <h1 className="text-center text-success mt-2">CHI TIẾT SẢN PHẨM {productId}</h1>

            {loading && <MySpinner />}

            {product && <Row>
                <Col md={5} xs={12}>
                    <Image src={product.image} rounded fluid />
                </Col>
                <Col md={7} xs={12}>
                    <h2 className="text-info">{product.name}</h2>
                    <h3 className="text-danger">{product.price.toLocaleString()} VNĐ</h3>
                </Col>
            </Row>}

            {user === null?<>
                <Alert variant="warining">
                    Vui lòng <Button onClick={() => nav(`/login?next=/products/${product.id}`)}>đăng nhập</Button> để bình luận!
                </Alert>
            </>:<>
                <div className="mt-1 mb-1">
                    <Form.Control type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Nội dung bình luận..."/>
                    <Button className="mt-1" onClick={addComment}>Thêm bình luận</Button>
                </div>
            </>}

            <ListGroup>
                {comments.map(c => <ListGroup.Item key={c.id}>
                                        <Row>
                                            <Col md={1} xs={6}>
                                                <Image src={c.userId.avatar} fluid roundedCircle />
                                            </Col>
                                            <Col md={11} xs={6}>
                                                <p>{c.content}</p>
                                                <p><em>{moment(c.createdDate).fromNow()}</em></p>
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>)}
            </ListGroup>
        </>
    )
}

export default ProductDetails;