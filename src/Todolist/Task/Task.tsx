import styles from "./Task.module.scss";
import React, {useState} from "react";
import {TaskType} from "../../App";
import {Checkbox, createTheme, IconButton, ThemeProvider} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import EditableSpan from "../../Components/EditableSpan/EditableSpan";

type TaskPropsType = {
    t: TaskType
    id: string
    removeTask: (todolistId: string, id: string) => void
    changedCheckbox: (todolistId: string, id: string, newValue: boolean) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
}


const customThemeCheckbox = createTheme({
    palette: {
        primary: {
            main: '#4A6163',
        }
    }
});

const Task: React.FC<TaskPropsType> = ({t, id, removeTask, changedCheckbox, changeTaskTitle}) => {

    let [editMode, setEditMode] = useState<boolean>(false);

    const onClickHandler = () => {
        removeTask(id, t.id);
    }

    const onChangeHandler = () => {
        changedCheckbox(id, t.id, !t.isDone);
    }

    const updateTaskTitle = (newTitle: string) => {
        changeTaskTitle(id, t.id, newTitle);
    }


    const setClass = (priority: number) => {
        return priority === 1 ? styles.taskItemLow :
            priority === 2 ? styles.taskItemMiddle :
                priority === 3 ? styles.taskItemHigh : styles.taskItem
    }

    let [edt, setEdt] = useState<boolean>(false);



    return <li onBlur={() => setEditMode(false)} onDoubleClick={() => setEditMode(true)} className={ t.isDone ? styles.isDone + ' ' + setClass(t.priority) : setClass(t.priority) } key={t.id}>
        <div className={styles.taskGroupItem}>
            <ThemeProvider theme={customThemeCheckbox} >
                <Checkbox color={'primary'} checked={t.isDone} onChange={onChangeHandler} />
            </ThemeProvider>
            <EditableSpan updateTitle={updateTaskTitle} title={t.title} />
        </div>
        {/*<img style={{flex: "0 0 15%"}} onClick={onClickHandler} src="#" alt="icon"/>*/}

        <IconButton style={{flex: "0 0 10%"}} onClick={onClickHandler}>
            <ClearIcon />
        </IconButton>

        {/*{editMode ? <input type="checkbox"/> :  <IconButton style={{flex: "0 0 10%"}} onClick={onClickHandler}>*/}
        {/*    <ClearIcon />*/}
        {/*</IconButton>}*/}

    </li>
}

export default Task;
