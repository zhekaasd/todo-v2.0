import {addTodolistAC, InitialStateTodolistsType, removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {InitialStateTasksType, tasksReducer} from "./tasks-reducer";


test('ids should be equals', () => {
    const startTasksState: InitialStateTasksType = {};
    const startTodolistsState: InitialStateTodolistsType = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)


    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});


test('property with todolistId should be deleted', () => {
    const startState: InitialStateTasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false, priority: 0 },
            { id: "2", title: "JS", isDone: true, priority: 0 },
            { id: "3", title: "React", isDone: false, priority: 0 }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false, priority: 0 },
            { id: "2", title: "milk", isDone: true, priority: 0 },
            { id: "3", title: "tea", isDone: false, priority: 0 }
        ]
    };
    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


test('new array should be added when new todolist is added', () => {
    const startState: InitialStateTasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false, priority: 0 },
            { id: "2", title: "JS", isDone: true, priority: 0 },
            { id: "3", title: "React", isDone: false, priority: 0 }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false, priority: 0 },
            { id: "2", title: "milk", isDone: true, priority: 0 },
            { id: "3", title: "tea", isDone: false, priority: 0 }
        ]
    };
    const action = addTodolistAC("new todolist");
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

