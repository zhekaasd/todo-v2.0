import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import styles from "./Todolist.module.scss";
//import styles from "../App.module.scss";
import {FilterType, TasksType} from "../App";
import Task from "./Task/Task";
import AddItemForm from "../Components/AddItemForm/AddItemForm";
import EditableSpan from "../Components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material";
import { red } from "@mui/material/colors";


type TodolistPropsType = {
    id: string
    title: string
    tasks: TasksType
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, id: string) => void
    filter: FilterType
    setFilter: (todolistId: string ,filterValue: FilterType) => void
    changedCheckbox: (todolistId: string, id: string, newValue: boolean) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

const themeCustomButton = createTheme({
    palette: {
        primary: {
            main: '#4A6163'
        }
    }
});

const Todolist = (props: TodolistPropsType) => {

    debugger

    const onAllFilterClickHandler = () => {
        props.setFilter(props.id ,'all');
    }

    const onActiveFilterClickHandler = () => {
        props.setFilter(props.id ,'active')
    }

    const onCompletedFilterClickHandler = () => {
        props.setFilter(props.id ,'completed')
    }

    const updateTdTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    /*-- get current day --*/
    function getCurrentDay(date: any) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }

    return <div className={styles.todolist}>
        <div className={styles.addTask}>
            <h1 className={styles.title} >
                <EditableSpan title={props.title} updateTitle={updateTdTitle} />
            </h1>
            <AddItemForm addTask={props.addTask} removeItem={props.removeTodolist} id={props.id} />
        </div>



        <div className={styles.tasks}>
            <div className={styles.date}>
                <h2>{getCurrentDay(new Date())}</h2>
                <p>{new Date().toLocaleDateString()}</p>
            </div>

            <ul>
                {
                    props.tasks.map(t => <Task changeTaskTitle={props.changeTaskTitle} key={t.id} id={props.id} t={t} removeTask={props.removeTask} changedCheckbox={props.changedCheckbox} />)
                }
            </ul>

            {
                props.tasks.length > 0 ? <div className={styles.sortBlock}>
                    <ThemeProvider theme={themeCustomButton}>
                        <Button onClick={onAllFilterClickHandler} variant={props.filter === 'all' ? 'contained' : 'outlined'}>ALL</Button>
                        <Button onClick={onActiveFilterClickHandler} variant={props.filter === 'active' ? 'contained' : 'outlined'}>ACTIVE</Button>
                        <Button onClick={onCompletedFilterClickHandler} variant={props.filter === 'completed' ? 'contained' : 'outlined'}>COMPLETED</Button>
                    </ThemeProvider>
                </div> : ''
            }
        </div>
    </div>
}


export default Todolist;