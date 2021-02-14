// // import * as React from "react";
// import css from './Board.module.sass'
// // import {
// //
// //     useParams
// // } from "react-router-dom";
// //
// // const Board = () => {
// //     let { id } = useParams();
// //
// //
// //     return (
// //         <>
// //             <div className={css.board}>
// //
// //             </div>
// //         </>
// //     );
// // }
// //
// // export default Board;
// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
//
// // fake data generator
// const getItems = (count, offset = 0) =>
//     Array.from({length: count}, (v, k) => k).map(k => ({
//         id: `item-${k + offset}`,
//         content: `item ${k + offset}`
//     }));
//
// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//
//     return result;
// };
//
// /**
//  * Moves an item from one list to another list.
//  */
// const move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);
//
//     destClone.splice(droppableDestination.index, 0, removed);
//
//     const result = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destClone;
//
//     return result;
// };
//
// const grid = 8;
//
// const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: 'none',
//     padding: grid * 2,
//     margin: `0 0 ${grid}px 0`,
//
//     // change background colour if dragging
//     background: isDragging ? 'lightgreen' : 'grey',
//
//     // styles we need to apply on draggables
//     ...draggableStyle
// });
//
// const getListStyle = isDraggingOver => ({
//     background: isDraggingOver ? 'lightblue' : 'lightgrey',
//     padding: grid,
//     width: 250
// });
//
// class Board extends React.Component {
//     state = {
//         items: getItems(10),
//         selected: getItems(5, 10)
//     };
//
//     /**
//      * A semi-generic way to handle multiple lists. Matches
//      * the IDs of the droppable container to the names of the
//      * source arrays stored in the state.
//      */
//     id2List = {
//         droppable: 'items',
//         droppable2: 'selected'
//     };
//
//     getList = id => this.state[this.id2List[id]];
//
//     onDragEnd = result => {
//         const {source, destination} = result;
//
//         // dropped outside the list
//         if (!destination) {
//             return;
//         }
//
//         if (source.droppableId === destination.droppableId) {
//             const items = reorder(
//                 this.getList(source.droppableId),
//                 source.index,
//                 destination.index
//             );
//
//             let state = {items};
//
//             if (source.droppableId === 'droppable2') {
//                 state = {selected: items};
//             }
//
//             this.setState(state);
//         } else {
//             const result = move(
//                 this.getList(source.droppableId),
//                 this.getList(destination.droppableId),
//                 source,
//                 destination
//             );
//
//             this.setState({
//                 items: result.droppable,
//                 selected: result.droppable2
//             });
//         }
//     };
//
//     // Normally you would want to split things out into separate components.
//     // But in this example everything is just done in one place for simplicity
//     render() {
//         return (
//             <div className={css.board}>
//
//                 <DragDropContext onDragEnd={this.onDragEnd}>
//                     <Droppable droppableId="droppable">
//                         {(provided, snapshot) => (
//                             <div
//                                 ref={provided.innerRef}
//                                 style={getListStyle(snapshot.isDraggingOver)}>
//                                 {this.state.items.map((item, index) => (
//                                     <Draggable
//                                         key={item.id}
//                                         draggableId={item.id}
//                                         index={index}>
//                                         {(provided, snapshot) => (
//                                             <div
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 style={getItemStyle(
//                                                     snapshot.isDragging,
//                                                     provided.draggableProps.style
//                                                 )}>
//                                                 {item.content}
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                             </div>
//                         )}
//                     </Droppable>
//                     <Droppable droppableId="droppable2">
//                         {(provided, snapshot) => (
//                             <div
//                                 ref={provided.innerRef}
//                                 style={getListStyle(snapshot.isDraggingOver)}>
//                                 {this.state.selected.map((item, index) => (
//                                     <Draggable
//                                         key={item.id}
//                                         draggableId={item.id}
//                                         index={index}>
//                                         {(provided, snapshot) => (
//                                             <div
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 style={getItemStyle(
//                                                     snapshot.isDragging,
//                                                     provided.draggableProps.style
//                                                 )}>
//                                                 {item.content}
//                                             </div>
//                                         )}
//                                     </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                             </div>
//                         )}
//                     </Droppable>
//                 </DragDropContext>
//             </div>
//         );
//     }
// }
//
// export default Board;
import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
  display: flex;

`;

class Board extends React.Component {
    state = initialData;

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

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

    render() {
        return (
            <div>
                <div>
                    My board
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Container>
                        {this.state.columnOrder.map(columnId => {
                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map(
                                taskId => this.state.tasks[taskId],
                            );

                            return <Column key={column.id} column={column} tasks={tasks} />;
                        })}
                    </Container>
                </DragDropContext>
            </div>

        );
    }
}
export default Board;
