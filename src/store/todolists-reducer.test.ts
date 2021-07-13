import { todoListsReducer } from "./todolists-reducer";
import { v1 } from 'uuid';
import { TodoListType } from "../App";
import {
    RemoveTodoListAC,
    AddTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC
} from './todolists-reducer'

let startState: Array<TodoListType>;
let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(() => {

    startState = [
        { id: todolistId1, title: "What to learn", filter: "All" },
        { id: todolistId2, title: "What to buy", filter: "All" },
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe("What to buy");
})

test('create new todoList', () => {
    const newTodoListTitle = "Biba + boba";
    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('Biba + boba');
})

test('test changing todolist FILTER', () => {
    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, "Active"))

    expect(endState[1].filter).toBe("Active");
})

test('test changing todolist TITLE', () => {
    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistId1, "What to drink hehe"))

    expect(endState[0].title).toBe("What to drink hehe");
})