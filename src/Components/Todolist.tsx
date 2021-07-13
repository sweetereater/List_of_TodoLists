import React from 'react';
import { filterType } from '../App';
import { Input } from './Input';
import { v4 } from 'uuid';
import EditableText from './EditableText';
import { Button, Checkbox, ButtonGroup, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: string
    addTask: (newTask: TaskType, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void,
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    changeTaskStatus: (id: string, todoListId: string) => void
    changeTodoListFilter: (todoListId: string, filter: filterType) => void,
    changeTodoListTitle: (id: string, title: string) => void
    removeTodoList: (id: string) => void
}

export function Todolist(props: PropsType) {

    const handleChangeStatus = (id: string) => {
        props.changeTaskStatus(id, props.todoListId);
    }

    const handleAddNewTask = (title: string) => {
        props.addTask({
            id: v4(),
            title: title,
            isDone: false
        }, props.todoListId)
    };

    const handleChangeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.todoListId, title);
    }

    const deleteTodoList = (id: string) => {
        props.removeTodoList(id);
    }

    return <div className="todolist">
        <h3>
            <EditableText title={props.title} changeTitle={handleChangeTodoListTitle} />
            <IconButton
                onClick={() => deleteTodoList(props.todoListId)}
                size="small">
                <Delete />
            </IconButton>
        </h3>

        <div className="newTaskInput"><Input label="Add new task" handleChange={handleAddNewTask}></Input></div>
        <ul>
            {
                props.tasks.map(task => {

                    const handleChangeTitle = (title: string) => {
                        props.changeTaskTitle(task.id, title, props.todoListId)
                    }
                    const handleRemoveTask = () => {
                        props.removeTask(task.id, props.todoListId)
                    }
                    const handleChangeTaskStatus = () => handleChangeStatus(task.id)

                    return (<li key={task.id}>
                        {/*
                            Old button
                         <Button handleClick={handleRemoveTask}> old_x </Button> 
                        */}
                        <IconButton
                            onClick={handleRemoveTask}
                            size="small"
                        > <Delete /> </IconButton>
                        <Checkbox
                            color="primary"
                            checked={task.isDone}
                            onChange={handleChangeTaskStatus}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <EditableText
                            title={task.title}
                            changeTitle={handleChangeTitle} />
                    </li>)
                })
            }
        </ul>

        <div className="buttonGroup">
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">

                <Button
                    color={props.filter === "All" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={() => props.changeTodoListFilter(props.todoListId, "All")}>
                    All
                </Button>

                <Button
                    color={props.filter === "Active" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={() => props.changeTodoListFilter(props.todoListId, "Active")}>
                    Active
                </Button>

                <Button
                    color={props.filter === "Completed" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={() => props.changeTodoListFilter(props.todoListId, "Completed")}>
                    Completed
                </Button>

            </ButtonGroup>
        </div>

    </div>
}
