import {v1} from "uuid"
import {AddTodolistType, RemoveTodolistType} from "./todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    priority: number
}
type TasksType = Array<TaskType>;
export type InitialStateTasksType = {
    [key: string]: TasksType
}

enum Priority {
    Default = 0,
    Low ,
    Middle,
    High,
}

type ActionsType = AddTaskType | RemoveTaskType
    | ChangeCheckboxType | ChangeTaskTitle | AddTodolistType | RemoveTodolistType;

// let [tasks2, setTasks2] = useState<TasksTypeUpdate>({
//     [todolistId1]: [
//         {id: v1(), title: 'Lorem ipsum dolor.', isDone: false, priority: Priority.Default},
//         {id: v1(), title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', isDone: true, priority: Priority.High},
//         {id: v1(), title: 'Lorem ipsum dolor sit amet.', isDone: true, priority: Priority.Low},
//         {id: v1(), title: 'Lorem ipsum', isDone: false, priority: Priority.Default},
//     ],
//     [todolistId2]: [
//         {id: v1(), title: 'Lorem ipsum dolor.', isDone: true, priority: Priority.Default},
//         {id: v1(), title: 'Lorem ', isDone: false, priority: Priority.Low},
//         {id: v1(), title: 'Lorem ipsum dolor sit ', isDone: false, priority: Priority.Middle},
//         {id: v1(), title: 'Lorem ipsum', isDone: true, priority: Priority.Middle},
//     ]
// });


const initialState: InitialStateTasksType = {

}


export const tasksReducer = (state: InitialStateTasksType = initialState, action: ActionsType): InitialStateTasksType => {
    switch (action.type) {
        case ADD_TASK: {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false, priority: Priority.Default}, ...state[action.todolistId]]
            }
        }

        case REMOVE_TASK: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter( t => t.id !== action.id)
            }
        }

        case CHANGE_CHECKBOX: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {...t, isDone: !t.isDone} : t)
            }
        }

        case CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map( t => t.id === action.id ? {...t, title: action.title} : t )
            }
        }

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.id]: []
            }
        }

        case "REMOVE-TODOLIST": {
            let stateCopy = {...state};
            delete stateCopy[action.id];

            return stateCopy;
        }

        default:
            return state;
    }
}



const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const CHANGE_CHECKBOX = 'CHANGE_CHECKBOX';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';

type AddTaskType = {
    type: typeof ADD_TASK
    todolistId: string
    title: string
}

export const addTaskAC = (todolistId: string, title: string): AddTaskType => {
    return {type: ADD_TASK, todolistId, title}
}

type RemoveTaskType = {
    type: typeof REMOVE_TASK
    todolistId: string
    id: string
}
export const removeTaskAC = (todolistId: string, id: string): RemoveTaskType => {
    return {type: REMOVE_TASK, todolistId, id}
}

type ChangeCheckboxType = {
    type: typeof CHANGE_CHECKBOX
    todolistId: string
    id: string
    value: boolean
}

export const changeCheckboxAC = (todolistId: string, id: string, value: boolean): ChangeCheckboxType => {
    return {type: CHANGE_CHECKBOX, todolistId, id, value}
}

type ChangeTaskTitle = {
    type: typeof CHANGE_TASK_TITLE
    todolistId: string
    id: string
    title: string
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitle => {
    return {type: CHANGE_TASK_TITLE, todolistId, id, title}
}

/*
*

    function changeTaskTitle(todolistId: string, id: string, newTitle: string) {
        let task = tasks2[todolistId].find( t => t.id === id );
        if (task) {
            task.title = newTitle;
        }
        setTasks2({...tasks2});
    }
    *
    *
* */