import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import {Button, Col, DatePicker, Dropdown, Input, Menu, message, Modal, Popover, Row, Select} from "antd";
import css from './Board.module.sass'
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
    'Authorization': "Token " + getToken()
}


export default class Task extends React.Component {

    state = {
        visible: false,
        editMode: false,
        colorize: '#fff',
        content: '',
        like: false,
        taskId: 0,
        users: [],
        user: 'loading...',
        date: ''
    }

    showModal = (id) => {
        this.setState({
            visible: true,
            taskId: id
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
        const users = await endpoint.get(`/boards/get_users/`, {
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
        const user = await endpoint.get(`/boards/task_user/${id}/`, {
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
        let userX = '';
        if (user.username) {
            userX = user.username
        }
        let dateX = ''
        if (response.end_time) {
            dateX = moment(response.end_time)
        }
        let colorX = '#fff'
        if (response.priority === "high") {
            colorX = '#fa1a1a'
        } else if (response.priority === "medium") {
            colorX = '#ffc600'
        } else if (response.priority === "low") {
            colorX = '#3bc93b'
        }

        if (response.end_time) {
            dateX = moment(response.end_time)
        }
        this.setState({
            content: response.content,
            like: response.is_confirmed,
            users: users,
            user: userX,
            date: dateX,
            colorize: colorX
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

    handleChange(value, taskId) {
        this.setState({
            user: value
        })
        endpoint.post(`/boards/task_user/`, {task_id: taskId, user_id: value}, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        message.success("User has been updated");
                        return;

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
    }

    onDateChange(date, dateString, taskId) {
        let event = null;
        if (date) {
            event = new Date(date._d)
        } else {
            event = null
        }
        this.setState({
            date: moment(date)
        })
        endpoint.patch(`/boards/tasks/${taskId}/`, {end_time: event}, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        message.success("Due date has been updated");
                        return;

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
    setColorize = (color, priority) => {
        this.setState({
            colorize: color
        });
        let priorityStatus = 'none'
        switch (priority) {
            case "high":
                priorityStatus = 'high';
                break;
            case "medium":
                priorityStatus = 'medium';
                break;
            case "low":
                priorityStatus = 'low';
                break;
            default:
                return;
        }
        endpoint.patch(`/boards/tasks/${this.state.taskId}/`, {priority: priorityStatus}, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        message.success("Priority has been updated");
                        return;

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
    }
    likeit = () => {
        this.setState({
            like: !this.state.like
        })
        endpoint.patch(`/boards/tasks/${this.state.taskId}/`, {is_confirmed: this.state.like}, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        message.success("Confirmation has been updated");
                        return;

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
    }
    updateDescription = () => {
        const _this = this;
        endpoint.patch(`/boards/tasks/${this.state.taskId}/`, {content: this.state.content}, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        _this.disableEditMode();
                        message.success("Description has been updated");
                        return;

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
    }
    changeValue = (value) => {
        this.setState({
            content: value
        })

    }
    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }


    render() {
        const {TextArea} = Input;
        const Option = Select.Option;
        const popContent = (
            <div className={css.labels}>
                <a href="javascript:;" className={css.noneLabel} onClick={() => this.setColorize('#fff', 'none')}>
                    <div></div>
                </a>
                <a href="javascript:;" className={css.greenLabel} onClick={() => this.setColorize('#3bc93b', 'low')}>
                    <div></div>
                </a>
                <a href="javascript:;" className={css.redLabel} onClick={() => this.setColorize('#fa1a1a', 'high')}>
                    <div></div>
                </a>
                <a href="javascript:;" className={css.orangeLabel}
                   onClick={() => this.setColorize('#ffc600', 'medium')}>
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
                                <TextArea rows={3} placeholder="Description here..." value={this.state.content}
                                          onChange={e => this.changeValue(e.target.value)}/>
                            }

                            {this.state.editMode &&
                            <div>
                                <Button type="primary" onClick = {this.updateDescription}>
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
                                        onChange={value => this.handleChange(value, this.state.taskId)}
                                        value={this.state.user}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >

                                        {this.state.users.map((person, index) => (
                                            <Option value={person.id}>{person.username}</Option>
                                        ))}
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
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        value={this.state.date}
                                        disabledDate={this.disabledDate}
                                        onChange={(value, dateString) => this.onDateChange(value, dateString, this.state.taskId)}/>

                                </Col>
                                <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                                    <div className="likeDislike">

                                        <a href="javascript:;" className={this.state.like && css.active}
                                           onClick={this.likeit}><CheckSquareOutlined/></a>

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
