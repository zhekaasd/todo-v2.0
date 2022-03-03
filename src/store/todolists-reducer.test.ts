import {useState} from "react";
import {TodolistType} from "../App";
import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let startState: TodolistType[];
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'Title todo #1', filter: 'all'},
        {id: todolistId2, title: 'Title todo #2', filter: 'all'}
    ];
})


test('add todolist should be correct', () => {
    let endState = todolistsReducer(startState, addTodolistAC('create todo'));

    expect(endState.length).toBe(3);
})


test('remove todolist should be correct', () => {
    let endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
})


test('update todolist title should be correct', () => {
    let endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, 'update todo title'));

    expect(endState[0].title).toBe('update todo title');
})


test('change todolist filter should be correct', () => {
    let endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId1, 'completed'));

    expect(endState[0].filter).toBe('completed');
    expect(endState[1].filter).toBe('all');
})