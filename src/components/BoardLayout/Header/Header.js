import * as React from "react";
import css from './Header.module.sass'
import {Drawer, Button, Col, Row, Popover, message} from "antd";
import {Link, useHistory} from "react-router-dom";
import logo from './../../../assets/media/img/Agile-Scrum-logo.png'
import {useEffect, useState} from "react";
import {HistoryOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons'
import {getToken, removeToken} from "../../token";
import {endpoint} from "../../setupProxy";

const Header = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': getToken()
    }
    const [boards, setBoards] = useState([])
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    }
    const handleVisibleMenu = () => {
        setVisibleMenu(true);
    }
    const logout = () => {
        endpoint.get(`/accounts/logout/`, {
            headers: headers
        })
            .then(function (response) {

            })
            .catch(function (error) {

            });
        removeToken()
        history.push("/login");
    }

    const contentMenu = (
        <div>
            <a href="javascript:;" className={css.logout} onClick={logout}>Logout</a>
        </div>
    )

    const loadData = () => {

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

    useEffect(() => {
        loadData();
    }, []);
    return (
        <>
            <div className={css.header}>
                <Row align="middle">
                    <Col flex="50px">

                        <Button type="dashed" shape="circle" icon={<ProfileOutlined/>} onClick={showDrawer}></Button>

                    </Col>
                    <Col flex="auto">
                        <div className={css.logo}>
                            <Link to="/"><img src={logo}/></Link>
                        </div>
                    </Col>
                    <Col flex="50px">
                        <div className={css.avatar}>
                            <Popover placement="bottomRight" title="" content={contentMenu} trigger="click">
                                <a href="javascript:;">
                                    <img
                                        src="https://s.gravatar.com/avatar/9c3a4bf73184f3a5c3f50c393b6d6aa3?size=496&default=retro"/>
                                </a>
                            </Popover>

                        </div>
                    </Col>
                </Row>
            </div>
            <Drawer
                title="Boards"
                placement="left"
                closable={true}
                onClose={onClose}
                visible={visible}
            >
                {boards.length > 0 ?
                    boards.map((item) =>
                        <Link to={"/board/" + item.id} className={css.boardItem}>
                            <div>
                                <h4>
                                    {item.title}
                                </h4>
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

                            </div>
                        </Link>
                    )
                    :
                    <div className={css.noBoard}>No board :(</div>
                }
            </Drawer>
        </>
    );
}

export default Header;
