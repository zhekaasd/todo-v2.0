import {
    addTaskAC,
    changeCheckboxAC,
    changeTaskTitleAC,
    InitialStateTasksType,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {v1} from "uuid";

let startState: InitialStateTasksType;
let todolistId1: string;

beforeEach(() => {

    todolistId1 = v1();

    enum Priority {
        Default = 0,
        Low ,
        Middle,
        High,
    }

    startState = {
        [todolistId1]: [
            {id: '1', title: 'Lorem ipsum dolor.', isDone: false, priority: Priority.Default},
            {id: '2', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', isDone: true, priority: Priority.High},
            {id: '3', title: 'Lorem ipsum dolor sit amet.', isDone: true, priority: Priority.Low},
            {id: '4', title: 'Lorem ipsum', isDone: false, priority: Priority.Default},
        ],
    }

})

test('add task should be correct', () => {
    let endState = tasksReducer(startState, addTaskAC(todolistId1, 'new title'));

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][0].title).toBe('new title');
});


test('remove task should be correct', () => {
    let endState = tasksReducer(startState, removeTaskAC(todolistId1, '4'));

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][2].title).toBe('Lorem ipsum dolor sit amet.');
});


test('update task title should be correct', () => {
    let endState = tasksReducer(startState, changeTaskTitleAC(todolistId1,'4', 'update title'));

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][3].title).toBe('update title');
});


test('update checkbox task should be correct', () => {
    let endState = tasksReducer(startState, changeCheckboxAC(todolistId1,'4', true));

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][3].isDone).toBe(true);
    expect(endState[todolistId1][3].isDone).toBeTruthy();
});