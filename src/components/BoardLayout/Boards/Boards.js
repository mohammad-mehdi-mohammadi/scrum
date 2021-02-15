import * as React from "react";
import css from './Boards.module.sass'
import {FileAddOutlined, PlusOutlined, HistoryOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Col, Divider, Form, Input, message, Modal, Row} from "antd";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import {endpoint} from './../../../components/setupProxy'
import {getToken, removeToken} from "../../token";

const Boards = () => {
    const [form] = Form.useForm();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': getToken()
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [boards, setBoards] = useState([])
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish = (values) => {
        const data = {
            "title": values.name
        }

        endpoint.post(`/boards/board_operations/`, data, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        message.success("Board has beed created successfully")
                        form.resetFields();
                        loadData();
                        break;

                }
                return response.data;
            })
            .catch(function (error) {
                switch (error.response.status) {

                    case 400:

                        message.error("Bad request")
                        break;
                    case 404:
                        message.error("User not found")
                        break;
                    case 500:
                        message.error("Server error")
                        break;

                    case 401:
                        removeToken();
                        this.props.history.push('/login')
                        break;
                    case 403:
                        this.props.history.push('/')
                        break;

                }
            });
    };
    useEffect(() => {
        loadData();
    }, []);

    function loadData() {

        endpoint.get(`/boards/board_operations/`, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        if (response.data.length > 0) {
                            setBoards(response.data)
                        }
                        break;

                }
                return response.data;
            })
            .catch(function (error) {
                switch (error.response.status) {

                    case 400:

                        message.error("Bad request")
                        break;
                    case 404:
                        message.error("User not found")
                        break;
                    case 500:
                        message.error("Server error")
                        break;

                    case 401:
                        removeToken();
                        this.props.history.push('/login')
                        break;
                    case 403:
                        this.props.history.push('/')
                        break;

                }
            });

    }

    return (
        <>
            <div className={css.createNew}>
                <div>
                    <FileAddOutlined className="anticon-xl"/>
                </div>
                <p>
                    You need a new board!?
                </p>
                <div>
                    <Button type="primary" shape="round" icon={<PlusOutlined/>} onClick={showModal}>
                        Create your board
                    </Button>
                </div>
            </div>
            <div className={css.boards}>
                <Divider plain>Your boards</Divider>
                {boards.length > 0 ?
                    boards.map((item) =>
                        <Link to={"/board/" + item.id} className={css.boardItem}>
                            <div>
                                <h2>
                                    {item.title}
                                </h2>
                                <div>
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12} alignemnt="left">
                                            <div className={css.adminUser}>
                                                <UserOutlined/> {item.admin}
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                                            <div className={css.deadline}>
                                                <HistoryOutlined/> {item.due_date}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className={css.progressHolder}>
                                    <div className={css.progressbar}>
                                        <div className={css.green} style={{"width": "88%"}}></div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                    :
                    <div className={css.noBoard}>No board :(</div>
                }

            </div>
            <Modal title="Create new board" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                   footer={[
                       <Button key="back" onClick={handleCancel}>
                           Cancel
                       </Button>,
                       <Button form="newBoard" key="submit" htmlType="submit" type="primary">
                           Submit
                       </Button>

                   ]}>
                <Form
                    form={form}
                    name="newBoard"
                    onFinish={onFinish}
                >
                    <label>Board title:</label>
                    <Form.Item
                        name="name"
                        rules={[{required: true, message: 'Please input your board name!'}]}
                    >
                        <Input/>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
}

export default Boards;
