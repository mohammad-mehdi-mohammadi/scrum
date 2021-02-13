import * as React from "react";
import css from './Header.module.sass'
import {Drawer, Button, Col, Row, Popover} from "antd";
import {Link} from "react-router-dom";
import logo from './../../../assets/media/img/Agile-Scrum-logo.png'
import {useState} from "react";
import {ProfileOutlined} from '@ant-design/icons'
const Header = () => {
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
    const contentMenu = (
        <div>
            asdad
        </div>
    )
    return (
        <>
            <div className={css.header}>
                <Row align = "middle">
                    <Col flex="50px">

                        <Button type="dashed" shape="circle" icon={<ProfileOutlined />}  onClick={showDrawer}></Button>

                    </Col>
                    <Col flex="auto">
                        <div className={css.logo}>
                            <Link to = "/"><img src = {logo}/></Link>
                        </div>
                    </Col>
                    <Col flex="50px">
                        <div className={css.avatar}>
                            <Popover placement="bottomRight" title="" content={contentMenu} trigger="click">
                                <a href = "javascript:;">
                                    <img src = "https://s.gravatar.com/avatar/9c3a4bf73184f3a5c3f50c393b6d6aa3?size=496&default=retro"/>
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
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
}

export default Header;
