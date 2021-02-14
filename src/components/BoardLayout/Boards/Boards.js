import * as React from "react";
import css from './Boards.module.sass'
import {FileAddOutlined, PlusOutlined, HistoryOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Col, Divider, Form, Input, message, Modal, Row} from "antd";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import {endpoint} from './../../../components/setupProxy'
import {getToken, removeToken} from "../../token";

const Boards = () => {
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
        console.log('Success:', values);
    };
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }

        endpoint.get(`/boards/board_operations/`)
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        message.success('Logged in successfully');
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

                        message.error("Email or possword is incorrect")
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

    }, []);

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
                    <Link to="/board/1" className={css.boardItem}>
                        <div>
                            <h2>
                                Board title
                            </h2>
                            <div>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12} alignemnt="left">
                                        <div className={css.adminUser}>
                                            <UserOutlined/> Kasra Raoufi
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                                        <div className={css.deadline}>
                                            <HistoryOutlined/> 2021/21/09
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
                    </Link> :
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
                    name="newBoard"
                    onFinish={onFinish}
                >
                    <label>Board name:</label>
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
