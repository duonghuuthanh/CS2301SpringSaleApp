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
        <Navbar.Brand href="#home">eSaleApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Trang chủ</Nav.Link>
           
            <NavDropdown title="Danh mục" id="basic-nav-dropdown">
                {categories.map(c => {
                    let url = `/?cateId=${c.id}`;
                    return <Link className="dropdown-item" key={c.id} to={url}>{c.name}</Link>;
                })}
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={search}>
            <Row>
                <Col xs="auto">
                <Form.Control 
                        placeholder="Tìm sản phẩm"
                        aria-label="Tìm sản phẩm"
                        aria-describedby="basic-addon1"
                        value={kw}
                        onChange={e => setKw(e.target.value)}
                    />
                </Col>
                <Col xs="auto">
                    <Button type="submit" value="success">Tìm</Button>
                </Col>
            </Row>
        </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default Header;