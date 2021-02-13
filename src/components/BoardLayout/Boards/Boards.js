import * as React from "react";
import css from './Boards.module.sass'
import {FileAddOutlined, PlusOutlined, HistoryOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Col, Divider, Modal, Row} from "antd";
import {Link} from "react-router-dom";
import {useState} from "react";

const Boards = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <div className={css.createNew}>
                <div>
                    <FileAddOutlined className = "anticon-xl" />
                </div>
                <p>
                    You need a new board!?
                </p>
                <div>
                    <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={showModal}>
                        Create your board
                    </Button>
                </div>
            </div>

            <div className={css.boards}>
                <Divider plain>Your boards</Divider>

                <Link to = "/" className={css.boardItem}>
                    <div>
                        <h2>
                            Board title
                        </h2>
                        <div>
                            <Row>


                                <Col xs={24} sm={24} md={24} lg={12} xl={12} alignemnt = "left">
                                    <div className={css.adminUser}>
                                        <UserOutlined /> Kasra Raoufi
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                                    <div className={css.deadline}>
                                        <HistoryOutlined /> 2021/21/09
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
            </div>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
}

export default Boards;
