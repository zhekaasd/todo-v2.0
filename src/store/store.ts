import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";


const reducers = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export type AppStateType = ReturnType<typeof reducers>;
export const store = createStore(reducers);


// @ts-ignore
window.store = store;