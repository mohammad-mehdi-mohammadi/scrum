import * as React from "react";
import styles from './Login.module.sass'
import {Button, Col, Form, Input, Row} from "antd";
import {Link} from "react-router-dom";

const Login = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
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
                    <label>Email:</label>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
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
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Row align="middle" className = {styles.loginButton}>
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
