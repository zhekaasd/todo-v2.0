import React, {useState} from 'react';
import {v1} from 'uuid';
import styles from './App.module.scss';
import Todolist from "./Todolist/Todolist";
import {Container, Grid, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    priority: number
}
export type FilterType = 'all' | 'active' | 'completed';
export type TasksType = Array<TaskType>;
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksTypeUpdate = {
    [key: string]: TasksType
}




function App() {

    enum Priority {
        Default = 0,
        Low ,
        Middle,
        High,
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] =  useState<TodolistType[]>([
        {id: todolistId1, title: 'Title todo #1', filter: 'all'},
        {id: todolistId2, title: 'Title todo #2', filter: 'all'}
    ]);

    let [tasks2, setTasks2] = useState<TasksTypeUpdate>({
        [todolistId1]: [
            {id: v1(), title: 'Lorem ipsum dolor.', isDone: false, priority: Priority.Default},
            {id: v1(), title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.', isDone: true, priority: Priority.High},
            {id: v1(), title: 'Lorem ipsum dolor sit amet.', isDone: true, priority: Priority.Low},
            {id: v1(), title: 'Lorem ipsum', isDone: false, priority: Priority.Default},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Lorem ipsum dolor.', isDone: true, priority: Priority.Default},
            {id: v1(), title: 'Lorem ', isDone: false, priority: Priority.Low},
            {id: v1(), title: 'Lorem ipsum dolor sit ', isDone: false, priority: Priority.Middle},
            {id: v1(), title: 'Lorem ipsum', isDone: true, priority: Priority.Middle},
        ]
    });




    function changeTodolistTitle(id: string, title: string) {
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

    function addTask(todolistId: string, title: string) {
        tasks2[todolistId] = [{id: v1(), title: title, isDone: false, priority: Priority.Default}, ...tasks2[todolistId]];
        setTasks2({...tasks2});
    }

    function removeTask(todolistId: string, id: string) {
        tasks2[todolistId] = tasks2[todolistId].filter( t => t.id !== id );
        setTasks2({...tasks2});
    }

    function changedCheckbox(todolistId: string, id: string, newValue: boolean) {
        tasks2[todolistId] = tasks2[todolistId].map( t => t.id !== id ? t : {...t, isDone: newValue} );
        setTasks2({...tasks2});
    }

    function changeFilter(todolistId: string, filter: FilterType) {
        let todolist = todolists.find(td => td.id === todolistId);
        if(todolist) {
            todolist.filter = filter;
        }

        setTodolists([...todolists]);
    }

    function changeTaskTitle(todolistId: string, id: string, newTitle: string) {
        let task = tasks2[todolistId].find( t => t.id === id );
        if (task) {
            task.title = newTitle;
        }
        setTasks2({...tasks2});
    }


    function addTodolist(title: string) {
        let todolistId = v1();
        setTodolists([{id: todolistId, title: title, filter: 'all'}, ...todolists]);
        setTasks2({...tasks2, [todolistId]: []});
    }


    let [tdlValue, setTdlValue] = useState<string>('');


    return (
        <div className={styles.app}>
            <Container fixed>
                <Grid xs={4} style={{margin: '0 auto'}}>
                    <div className={styles.addTodo}>
                        <p>T O D O S</p>
                        <input value={tdlValue}
                               onChange={ (e) => setTdlValue(e.currentTarget.value) }
                               onKeyPress={(e) => {
                                   if(e.charCode === 13 && tdlValue.trim() !== '') {
                                       addTodolist(tdlValue);
                                       setTdlValue('');
                                   }
                               }}
                               placeholder={'enter your message'} type="text"/>
                    </div>
                </Grid>

                <Grid style={{margin: '0 auto'}}>
                    <div className={styles.todolsits}>
                        {
                            todolists.map( td => {
                                let todolistTasks = tasks2[td.id];

                                if(td.filter === 'active') {
                                    todolistTasks = todolistTasks.filter( t => !t.isDone);
                                }

                                if(td.filter === 'completed') {
                                    todolistTasks = todolistTasks.filter( t => t.isDone);
                                }

                                return <Grid item style={{margin: '0 6px'}}>
                                    <Todolist
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                        key={td.id}
                                        id={td.id}
                                        title={td.title}
                                        tasks={todolistTasks}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        filter={td.filter}
                                        setFilter={changeFilter}
                                        changedCheckbox={changedCheckbox}
                                        removeTodolist={todolistRemove}
                                    />
                                </Grid>

                            })
                        }
                    </div>
                </Grid>
            </Container>
        </div>
    );
}

export default App;


