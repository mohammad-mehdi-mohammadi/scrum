import * as React from "react";
import styles from './Login.module.sass'
import {Button, Col, Form, Input, message, Row} from "antd";
import {Link} from "react-router-dom";
import {endpoint} from '../../components/setupProxy'
import {useHistory} from "react-router-dom";
import {setToken} from "../token";

const Login = () => {
    const history = useHistory();
    const onFinish = (values) => {

        const data = {
            "username": values.username,
            "password": values.password
        }
        endpoint.post(`/accounts/login/`, data)
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        setToken(response.data.token)
                        message.success('Logged in successfully');
                        setTimeout(() => history.push("/board"), 200);
                        break;

                }
                return response.data;
            })
            .catch(function (error) {
                switch (error.response.status) {

                    case 400:

                        message.error("Email or possword is incorrect")
                        break;
                    case 404:
                        message.error("User not found")
                        break;
                    case 500:
                        message.error("Server error")
                        break;

                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className={styles.login}>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <label>Username:</label>
                    <Form.Item
                        name="username"
                        rules={[

                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <label>Password:</label>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item>
                        <Row align="middle" className={styles.loginButton}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                <Button type="primary" htmlType="submit" block>
                                    Login
                                </Button>
                            </Col>
                            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                <div className={styles.newAccount}>
                                    <Link to="/register">Create a new account!</Link>

                                </div>
                            </Col>

                        </Row>

                    </Form.Item>
                </Form>
            </div>
        </>

    );
}

export default Login;
