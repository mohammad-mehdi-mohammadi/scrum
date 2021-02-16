import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from './column';
import {Button, Col, Dropdown, Form, Input, Menu, message, Modal, Row} from "antd";
import css from './Board.module.sass'
import MenuDown from "@2fd/ant-design-icons/lib/MenuDown";
import {endpoint} from "../../setupProxy";
import {getToken, removeToken} from "../../token";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";

const Container = styled.div`
  display: flex;

`;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': "Token " + getToken()
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        isModalVisible: false,
        visible: false,
        tasks: {

        },
        columns: {
            'todo': {
                id: 'todo',
                title: 'To do',
                taskIds: [],
            },
            'inprogress': {
                id: 'inprogress',
                title: 'In progress',
                taskIds: [],
            },
            'test': {
                id: 'test',
                title: 'Test',
                taskIds: [],
            },
            'done': {
                id: 'done',
                title: 'Done',
                taskIds: [],
            },
        },
        // Facilitate reordering of the columns
        columnOrder: ['todo', 'inprogress', 'test', 'done'],
    };


    formRef = React.createRef();

    showModal = () => {
        this.setState({
            isModalVisible: true
        });
    };

    handleOk = () => {
        this.setState({
            isModalVisible: false
        });
    };

    handleCancel = () => {
        this.setState({
            isModalVisible: false
        });
    };

    onFinish = (values) => {
        const data = {
            "board": parseInt(this.props.match.params.id),
            "title": values.name
        }
        this.submitForm(data)
    };
    onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            this.setState(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        this.setState(newState);


        endpoint.patch(`/boards/tasks/${result.draggableId}/`, {status: result.destination.droppableId}, {
            headers: headers
        })
            .then(function (response) {
                return ;

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
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.init(id);

    }
    init = async (id) => {
        const response = await endpoint.get(`/boards/board_operations/${id}/`, {
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
            tasks: response.tasks,
            columns: {
                ...this.state.columns,
                todo: {
                    ...this.state.columns.todo,
                    taskIds: response.todo
                },
                inprogress: {
                    ...this.state.columns.inprogress,
                    taskIds: response.inprogress
                },
                test: {
                    ...this.state.columns.test,
                    taskIds: response.test
                },
                done: {
                    ...this.state.columns.done,
                    taskIds: response.done
                }
            }
        })
    }
    submitForm = async (data) => {
        const _this = this;

        const response = await endpoint.post(`/boards/tasks/`, data, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        message.success("Task has beed created successfully")
                        _this.formRef.current.resetFields();
                        _this.handleCancel()


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
        this.init(parseInt(this.props.match.params.id));
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


    render() {

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
            <div>
                <div className={css.theBoard}>
                    <Row align="middle">
                        <Col flex="auto">

                            <Dropdown overlay={menu} trigger={['click']}>
                                <div className={css.boardName}>
                                    <a className="ant-dropdown-link" href="#"><b><h3>My board</h3>
                                        <div className={css.boardMenu}></div>
                                        <MenuDown/></b></a>
                                </div>
                            </Dropdown>

                        </Col>
                        <Col flex="116px"><Button type="primary" onClick={this.showModal}>Add new task</Button></Col>
                    </Row>


                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Container>
                        {this.state.columnOrder.map(columnId => {
                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map(
                                taskId => this.state.tasks[taskId],
                            );

                            return <Column key={column.id} column={column} tasks={tasks}/>;
                        })}
                    </Container>
                </DragDropContext>
                <Modal title="Create new board" visible={this.state.isModalVisible} onOk={this.handleOk}
                       onCancel={this.handleCancel}
                       footer={[
                           <Button key="back" onClick={this.handleCancel}>
                               Cancel
                           </Button>,
                           <Button form="newBoard" key="submit" htmlType="submit" type="primary">
                               Submit
                           </Button>

                       ]}>
                    <Form
                        ref={this.formRef}
                        name="newBoard"
                        onFinish={this.onFinish}
                    >
                        <label>Task title:</label>
                        <Form.Item
                            name="name"
                            rules={[{required: true, message: 'Please input your task name!'}]}
                        >
                            <Input/>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>

        );
    }
}

export default Board;
