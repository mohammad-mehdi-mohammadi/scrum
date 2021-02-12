import * as React from "react";
import styles from './Register.module.sass'
import {Button, Col, Form, Input, Row} from "antd";
import {Link} from "react-router-dom";

const Register = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className={styles.register}>
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
                    <label>Confirm Password:</label>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Row align="middle" className = {styles.registerButton}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                <Button type="primary" htmlType="submit" block>
                                    Register
                                </Button>
                            </Col>
                            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                <div className={styles.login}>
                                    <Link to="/login">Login</Link>

                                </div>
                            </Col>

                        </Row>

                    </Form.Item>
                </Form>
            </div>
        </>

    );
}

export default Register;
