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
    'Authorization': getToken()
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        isModalVisible: false,
        visible: false,
        tasks: {
            1: {id: 1, content: 'Take out the garbage'},
            2: {id: 2, content: 'Watch my favorite show'},
            3: {id: 3, content: 'Charge my phone'},
            4: {id: 4, content: 'Cook dinneXXr'},
        },
        columns: {
            'todo': {
                id: 'todo',
                title: 'To do',
                taskIds: [1, 2, 3, 4],
            },
            'inprogress': {
                id: 'inprogress',
                title: 'In progress',
                taskIds: [],
            },
            'done': {
                id: 'done',
                title: 'Done',
                taskIds: [],
            },
        },
        // Facilitate reordering of the columns
        columnOrder: ['todo', 'inprogress', 'done'],
    };

    formRef = React.createRef();

    onFinish = (values) => {
        const data = {
            "title": values.name
        }

        endpoint.post(`/boards/tasks/`, data, {
            headers: headers
        })
            .then(function (response) {
                switch (response.status) {

                    // message actions
                    case 200:
                    case 201:
                        message.success("Task has beed created successfully")
                        // form.resetFields();
                        // loadData();
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
    onDragEnd = result => {
        console.log(result)
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
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        // endpoint.get(`/boards/${id}`, {
        //     headers: headers
        // })
        //     .then(function (response) {
        //         switch (response.status) {
        //
        //             // message actions
        //             case 200:
        //             case 201:
        //
        //                 // form.resetFields();
        //                 // loadData();
        //                 break;
        //
        //         }
        //         return response.data;
        //     })
        //     .catch(function (error) {
        //         switch (error.response.status) {
        //
        //             case 400:
        //
        //                 message.error("Bad request")
        //                 break;
        //             case 404:
        //                 message.error("User not found")
        //                 break;
        //             case 500:
        //                 message.error("Server error")
        //                 break;
        //
        //             case 401:
        //                 removeToken();
        //                 this.props.history.push('/login')
        //                 break;
        //             case 403:
        //                 this.props.history.push('/')
        //                 break;
        //
        //         }
        //     });
    }

    confirm = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: 'Bla bla ...',
            okText: 'Delete',
            cancelText: 'Cancel',
        });
    }

    render() {

        const showModal = () => {
            this.setState({
                isModalVisible: true
            });
        };

        const handleOk = () => {
            this.setState({
                isModalVisible: false
            });
        };

        const handleCancel = () => {
            this.setState({
                isModalVisible: false
            });
        };
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
                            <b>My board <div className={css.boardMenu}>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" href="#"><MenuDown/></a>
                                </Dropdown>
                            </div></b>
                        </Col>
                        <Col flex="116px"><Button type="primary" onClick={showModal}>Add new task</Button></Col>
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
                <Modal title="Create new board" visible={this.state.isModalVisible} onOk={handleOk}
                       onCancel={handleCancel}
                       footer={[
                           <Button key="back" onClick={handleCancel}>
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
