import { useContext, useEffect, useState } from "react";
import { Badge, Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { Link, useNavigate } from "react-router-dom";
import { MyCartContext, MyUserContext } from "../configs/Contexts";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [kw, setKw] = useState();
    const nav = useNavigate();
    const [user, dispatch] = useContext(MyUserContext);
    const [cartCounter, ] = useContext(MyCartContext);

    const loadCates = async () => {
        let res = await Apis.get(endpoints['categories']);
        setCategories(res.data);
    }

    useEffect(() => {
        loadCates();
    }, []);
    
    const search = (e) => {
        e.preventDefault();

        nav(`/?kw=${kw}`);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">eCommerce's OU</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Trang chủ</Link>
                        <NavDropdown title="Danh mục" id="basic-nav-dropdown">
                            {categories.map(c => {
                                const url = `/?cateId=${c.id}`;
                                return <Link key={c.id} className="dropdown-item" to={url}>{c.name}</Link>;
                            })}
                        </NavDropdown>
                        {user===null?<>
                            <Link className="nav-link text-danger" to="/register">Đăng ký</Link>
                            <Link className="nav-link text-success" to="/login">Đăng nhập</Link>
                        </>:<>
                            <Link className="nav-link text-danger" to="/register">
                                <img src={user.avatar} width="30" className="rounded-circle" />
                                Chào {user.username}!
                            </Link>
                            <Button value="danger" onClick={() => dispatch({"type": "LOGOUT"})}>Đăng xuất</Button>
                        </>}

                        <Link className="nav-link" to="/cart">Giỏ hàng <Badge className="bg-danger">{cartCounter.totalQuantity}</Badge></Link>
                    </Nav>
                    <Form inline onSubmit={search}>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                type="text" value={kw} onChange={e => setKw(e.target.value)}
                                placeholder="Tìm sản phẩm"
                                className=" mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit">Tìm</Button>
                            </Col>
                        </Row>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;