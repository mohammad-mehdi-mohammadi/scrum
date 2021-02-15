import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Task from './task';
import {Col, Modal, Row} from "antd";

const Container = styled.div`
  margin: 15px;

  background-color: #fff;
  border-radius: 6px;
  width: 300px;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
  margin-bottom: 10px;
`;
const TaskList = styled.div`
  padding: 8px;
  
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#fff7dd' : '#fff')};
  flex-grow: 1;
  min-height: 100px;
`;


export default class Column extends React.Component {


    render() {
        return (
            <div>
                <Container>
                    <Title>{this.props.column.title}</Title>
                    <Droppable droppableId={this.props.column.id}>
                        {(provided, snapshot) => (
                            <TaskList
                                innerRef={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {this.props.tasks.map((task, index) => (
                                    <Task key={task.id} task={task} index={index}/>
                                ))}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>

            </div>
        );
    }
}
