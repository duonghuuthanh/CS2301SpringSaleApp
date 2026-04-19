import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [kw, setKw] = useState();
    const nav = useNavigate();

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