import {v1} from "uuid";


export type FilterType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type ActionsType = AddTodolistType | RemoveTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType;
export type InitialStateTodolistsType = TodolistType[];
const initialState: InitialStateTodolistsType = [

]

export const todolistsReducer = (state: InitialStateTodolistsType = initialState, action: ActionsType): InitialStateTodolistsType => {
    switch (action.type) {
        case ADD_TODOLIST: {
            return [
                ...state,
                {id: action.id, title: action.title, filter: 'all'}
            ]
        }

        case REMOVE_TODOLIST: {
            let stateCopy = [...state];
            stateCopy = stateCopy.filter( t => t.id !== action.id);
            return stateCopy;
        }

        case CHANGE_TODOLIST_TITLE: {
            return state.map( t => t.id === action.id ? {...t, title: action.title} : t );
        }

        case CHANGE_TODOLIST_FILTER: {
            return state.map( t => t.id === action.id ? {...t, filter: action.filter} : t );
        }

        default:
            return state;
    }
}


const ADD_TODOLIST = 'ADD-TODOLIST';
export type AddTodolistType = {
    type: typeof ADD_TODOLIST
    title: string
    id: string
}
export const addTodolistAC = (title: string): AddTodolistType => {
    return {type: ADD_TODOLIST, title, id: v1()}
}


const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export type RemoveTodolistType = {
    type: typeof REMOVE_TODOLIST
    id: string
}
export const removeTodolistAC = (id: string): RemoveTodolistType => {
    return {type: REMOVE_TODOLIST, id}
}


const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
type ChangeTodolistTitleType = {
    type: typeof CHANGE_TODOLIST_TITLE
    id: string
    title: string
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
    return {type: CHANGE_TODOLIST_TITLE, id, title}
}


const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';
type ChangeTodolistFilterType = {
    type: typeof CHANGE_TODOLIST_FILTER
    id: string
    filter: FilterType
}
export const changeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterType => {
    return {type: CHANGE_TODOLIST_FILTER, id, filter}
}


/*
*
* function changeTodolistTitle(id: string, title: string) {
        let todolist = todolists.find( td => td.id === id);
        if (todolist) {
            todolist.title = title;
        }

        setTodolists([...todolists]);
    }

    function todolistRemove(id: string) {
        todolists = todolists.filter( td => td.id !== id);
        setTodolists([...todolists]);
        delete tasks2[id];
        setTasks2({...tasks2});
    }
    *
    *
    *     function changeFilter(todolistId: string, filter: FilterType) {
        let todolist = todolists.find(td => td.id === todolistId);
        if(todolist) {
            todolist.filter = filter;
        }

        setTodolists([...todolists]);
    }
    *
    *
    function addTodolist(title: string) {
        let todolistId = v1();
        setTodolists([{id: todolistId, title: title, filter: 'all'}, ...todolists]);
        setTasks2({...tasks2, [todolistId]: []});
    }
*
* */