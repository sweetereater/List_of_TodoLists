import { TodoListType, filterType } from '../App';
import { v1 } from 'uuid';
import { TitleRounded } from '@material-ui/icons';

export type RemoveTodoList = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}

export type AddTodoList = {
    type: "ADD-TODOLIST"
    title: string
}

export type changeTodoListFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    todoListId: string
    filter: filterType
}

export type changeTodoListTitle = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListId: string
    title: string
}

export type actionType = RemoveTodoList |
    AddTodoList |
    changeTodoListFilter |
    changeTodoListTitle


export const todoListsReducer = (todoLists: Array<TodoListType>, action: actionType) => {
    switch (action.type) {

        case "REMOVE-TODOLIST":
            return todoLists.filter(tdList => tdList.id !== action.todoListId);

        case "ADD-TODOLIST":
            const newTodoListId = v1();
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: "All"
            }
            return [...todoLists, newTodoList]

        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(todo => {
                return todo.id === action.todoListId ? { ...todo, filter: action.filter } : todo;
            })

        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(todo => {
                return todo.id === action.todoListId ? { ...todo, title: action.title } : todo
            })

        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodoList => {
    return {
        type: "REMOVE-TODOLIST",
        todoListId: todoListId
    }
}

export const AddTodoListAC = (title: string): AddTodoList => {
    return {
        type: "ADD-TODOLIST",
        title: title
    }
}

export const changeTodoListTitleAC = (todoListId: string, title: string): changeTodoListTitle => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todoListId: todoListId,
        title: title
    }
}

export const changeTodoListFilterAC = (todoListId: string, filter: filterType): changeTodoListFilter => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoListId: todoListId,
        filter: filter
    }
}