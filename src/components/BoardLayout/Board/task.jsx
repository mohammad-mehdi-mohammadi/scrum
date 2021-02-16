import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import {Button, Col, DatePicker, Dropdown, Input, Menu, message, Modal, Popover, Row, Select} from "antd";
import css from './Board.module.sass'
import {DislikeFilled, LikeFilled} from "@ant-design/icons";
import MenuDown from '@2fd/ant-design-icons/lib/MenuDown'
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import {endpoint} from "../../setupProxy";
import {getToken, removeToken} from "../../token";
import CheckSquareOutlined from "@ant-design/icons/lib/icons/CheckSquareOutlined";

const Container = styled.div`
  box-shadow: 0px 1px 2px rgba(0,0,0,0.2);
  border-radius: 6px;
  padding: 8px 12px;
  
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? '#d7d7d7' : '#f5f5f5')};
`;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': getToken()
}
export default class Task extends React.Component {

    state = {visible: false, editMode: false, colorize: '#fff', content: '', like: false}

    showModal = (id) => {
        this.setState({
            visible: true,
        });

        this.loadData(id)

    }
    loadData = async (id) => {
        const response = await endpoint.get(`/boards/tasks/${id}/`, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        return response.data;

                }

            })
            .catch(function (error) {
                if (error.response) {
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
                }
            });
        this.setState({
            content: response.content,
            like: response.is_confirmed
        })

    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,

        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            editMode: false,
        });
    }
    enableEditMode = () => {
        this.setState({
            editMode: true,
        });
    }
    disableEditMode = () => {
        this.setState({
            editMode: false,
        });
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    handleBlur() {
        console.log('blur');
    }

    handleFocus() {
        console.log('focus');
    }

    onDateChange(date, dateString) {
        console.log(date, dateString);
    }

    confirm = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: 'Are you sure you want to delete it?',
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    }
    setColorize = (color) => {
        this.setState({
            colorize: color
        });
    }
    likeit = () => {
        this.setState({
            like: !this.state.like
        })
    }
    render() {
        const {TextArea} = Input;
        const Option = Select.Option;
        const popContent = (
            <div className={css.labels}>
                <a href="javascript:;" className={css.noneLabel} onClick={() => this.setColorize('#fff')}>
                    <div></div>
                </a>
                <a href="javascript:;" className={css.greenLabel} onClick={() => this.setColorize('#3bc93b')}>
                    <div></div>
                </a>
                <a href="javascript:;" className={css.redLabel} onClick={() => this.setColorize('#fa1a1a')}>
                    <div></div>
                </a>
                <a href="javascript:;" className={css.orangeLabel} onClick={() => this.setColorize('#ffc600')}>
                    <div></div>
                </a>

            </div>
        )
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="javascript:;">Edit</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="javascript:;" onClick={this.confirm}>Delete</a>
                </Menu.Item>

            </Menu>
        );
        return (
            <div className={css.item}>
                <Draggable draggableId={this.props.task.id} index={this.props.index}
                >
                    {(provided, snapshot) => (
                        <div>


                            <Container
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                innerRef={provided.innerRef}
                                isDragging={snapshot.isDragging}
                            >
                                {
                                    this.props.task.priority === 'high' &&
                                    <div className={css.highPriority}></div>
                                }
                                {
                                    this.props.task.priority === 'low' &&
                                    <div className={css.lowPriority}></div>
                                }
                                {
                                    this.props.task.priority === 'medium' &&
                                    <div className={css.mediumPriority}></div>
                                }

                                <div onClick={() => this.showModal(this.props.task.id)}>
                                    {this.props.task.title}
                                </div>

                                <div className={css.menu}>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <a className={css.taskMenu} href="#"><MenuDown/></a>
                                    </Dropdown>
                                </div>
                            </Container>

                        </div>
                    )}

                </Draggable>

                <Modal
                    title={this.props.task.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="800px"
                    footer={null}
                >
                    <div>
                        <div>
                            <label>Description:</label>
                            {!this.state.editMode ?
                                <div onClick={this.enableEditMode} className={css.descriptionEditor}>
                                    {this.state.content}
                                </div> :
                                <TextArea rows={3} placeholder="Description here..." value={this.state.content}/>
                            }

                            {this.state.editMode &&
                            <div>
                                <Button type="primary">
                                    Save
                                </Button>
                                <Button type="default" onClick={this.disableEditMode}>
                                    Cancel
                                </Button>
                            </div>
                            }
                        </div>
                        <br/>
                        <div>
                            <Row gutter={[24, 24]} align="middle">
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <label>Assign to:</label>
                                    <Select
                                        showSearch
                                        style={{width: "100%"}}
                                        placeholder="Select a user"
                                        optionFilterProp="children"
                                        onChange={this.handleChange}
                                        onFocus={this.handleFocus}
                                        onBlur={this.handleBlur}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={2} xl={2}>
                                    <label>label:</label>
                                    <Popover placement="bottom" title="" content={popContent} trigger="click">
                                        <a href="javascript:;" className={css.label}>
                                            <div style={{backgroundColor: this.state.colorize}}></div>
                                        </a>
                                    </Popover>

                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <label>Due date:</label>
                                    <DatePicker onChange={this.onDateChange} style={{width: "100%"}}/>

                                </Col>
                                <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                                    <div className="likeDislike">

                                        <a href="javascript:;" className={this.state.like && css.active} onClick={this.likeit}><CheckSquareOutlined /></a>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
