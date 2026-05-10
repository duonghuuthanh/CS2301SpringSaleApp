import { useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Apis";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const userInfo = [{
        field: "firstName",
        title: "Tên",
        type: "text"
    }, {
        field: "lastName",
        title: "Họ và tên lót",
        type: "text"
    }, {
        field: "email",
        title: "Email",
        type: "email"
    }, {
        field: "phone",
        title: "Số điện thoại",
        type: "tel"
    }, {
        field: "username",
        title: "Tên đăng nhập",
        type: "text"
    }, {
        field: "password",
        title: "Mật khẩu",
        type: "password"
    }, {
        field: "confirm",
        title: "Xác nhận mật khẩu",
        type: "password"
    }];

    const [user, setUser] = useState({});
    const [err, setErr] = useState();
    const avatar = useRef();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const validate = () => {
        for (let u of userInfo)
            if (!(u.field in user) || !user[u.field]) {
                setErr(`Vui lòng nhập ${u.title}!`);
                return false;
            }

        if (user.password !== user.confirm) {
            setErr('Mật khẩu KHÔNG khớp!');
            return false;
        }

        return true;
    }

    const register = async (e) => {
        e.preventDefault();

        if (validate() === true) {
            let form = new FormData();
            for (let key of Object.keys(user)) {
                if (key !== 'confirm') {
                    form.append(key, user[key]);
                }
            }

            if (avatar.current.files.length > 0) {
                form.append('avatar', avatar.current.files[0]);
            }

            try {
                setLoading(true);
                let res = await Apis.post(endpoints['register'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (res.status === 201)
                    nav('/login');
                else
                    alert("Hệ thống bị lỗi!");
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            <h1 className="text-center text-success mt-1">ĐĂNG KÝ NGƯỜI DÙNG</h1>

            {err && <Alert variant="danger">{err}</Alert>}

            <Form onSubmit={register}>
                {userInfo.map(u => <Form.Group key={u.field} className="mb-3" controlId={u.field}>
                                        <Form.Label>{u.title}</Form.Label>
                                        <Form.Control type={u.type} placeholder={u.title} value={user[u.field]} 
                                                      onChange={e => setUser({...user, [u.field]: e.target.value})} />
                                    </Form.Group>)}

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Ảnh đại diện</Form.Label>
                    <Form.Control type="file" ref={avatar} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="button">
                    {loading === true ? <MySpinner />:<Button variant="success" type="submit">Đăng ký</Button>}
                </Form.Group>
                
            </Form>
        </>
    );
}

export default Register;