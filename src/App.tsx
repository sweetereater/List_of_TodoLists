import React, { useState } from 'react';
import './App.css';
import { Todolist, TaskType } from './Components/Todolist';
import { v4 } from 'uuid';
import { Input } from './Components/Input';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export type filterType = "All" | "Active" | "Completed";

export type TodoListType = {
    id: string
    title: string
    filter: filterType
}

export function App() {

    const todoListsData: Array<TodoListType> = [
        {
            id: v4(),
            title: "What to learn",
            filter: "All",
        },
        {
            id: v4(),
            title: "What to buy",
            filter: "All"
        }
    ];

    const itemsForTodoLists = {
        [todoListsData[0].id]: [
            { id: v4(), title: "HTML&CSS", isDone: true },
            { id: v4(), title: "JS", isDone: true },
            { id: v4(), title: "React.js", isDone: true },
            { id: v4(), title: "Redux", isDone: false },
            { id: v4(), title: "typescript", isDone: false },
        ],
        [todoListsData[1].id]: [
            { id: v4(), title: "Bread", isDone: false },
            { id: v4(), title: "Milk", isDone: true },
            { id: v4(), title: "Meat", isDone: false },
            { id: v4(), title: "Fresh Water", isDone: true },
            { id: v4(), title: "Vegetables", isDone: false },
        ]
    };

    const [todos, setTodos] = useState<Array<TodoListType>>(todoListsData);
    const [tasks, setTasks] = useState(itemsForTodoLists);


    // Methods for tasks
    const addTask = (newTask: TaskType, todoListId: string) => {
        tasks[todoListId] = [newTask, ...tasks[todoListId]];
        console.log(tasks);
        setTasks({ ...tasks });
    }
    const removeTask = (id: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(task => task.id !== id);
        setTasks({ ...tasks });
    }
    const changeTaskStatus = (id: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].map(t => {
            if (t.id === id) {
                return { ...t, isDone: !t.isDone }
            }
            return t
        })
        setTasks({ ...tasks });
    }
    const changeTaskTitle = (id: string, title: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].map(t => {
            if (t.id === id) {
                return { ...t, title: title }
            }
            return t
        })
        setTasks({ ...tasks });
    }

    // Methods for todolists
    const changeTodoListFilter = (todoListId: string, filterType: filterType) => {
        const newTodoLists = todos.map(todo => {
            return todo.id === todoListId ? { ...todo, filter: filterType } : todo;
        })
        setTodos(newTodoLists);
    }
    const changeTodoListTitle = (todoListId: string, title: string) => {
        const newTodos = todos.map(todo => {
            return todo.id === todoListId ? { ...todo, title: title } : todo
        })
        setTodos(newTodos);
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v4();
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title,
            filter: "All"
        }

        setTasks({ ...tasks, [newTodoListId]: [] })

        setTodos([...todos, newTodoList]);
    }
    const removeTodoList = (todoListId: string) => {
        setTodos(todos => {
            return todos.filter(todo => todo.id !== todoListId)
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button variant="outlined" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <div className="newTaskInput"><Input label="Add new TodoList" handleChange={addTodoList} /></div>
                <Grid container>
                    {
                        todos.map(todolist => {

                            let visibleData;

                            switch (todolist.filter) {
                                case "Active":
                                    visibleData = tasks[todolist.id].filter(item => !item.isDone)
                                    break;
                                case "Completed":
                                    visibleData = tasks[todolist.id].filter(item => item.isDone)
                                    break;
                                default:
                                    visibleData = tasks[todolist.id];
                            }

                            return (
                                <Todolist
                                    key={todolist.id}
                                    todoListId={todolist.id}
                                    title={todolist.title}
                                    tasks={visibleData}
                                    filter={todolist.filter}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTodoListFilter={changeTodoListFilter}
                                    changeTodoListTitle={changeTodoListTitle}
                                    removeTodoList={removeTodoList}
                                />
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

