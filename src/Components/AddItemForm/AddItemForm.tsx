import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {createTheme, IconButton, TextField, ThemeProvider} from "@mui/material";
import {styled} from "@mui/material/styles";


import s from "./AddItemForm.module.scss";


type AddItemFormPropsType = {
    id: string
    addTask: (todolistId: string, title: string) => void
    removeItem: (id: string) => void
}

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#4A6163',
        }
    }
});

const customThemeInput = createTheme({
    palette: {
        primary: {
            main: '#4A6163',
        }
    }
});




const AddItemForm: React.FC<AddItemFormPropsType> = ({id, addTask, removeItem}) => {


    let [currentValue, setCurrentValue] = useState('');
    let [error, setError] = useState<null | string>(null);

    const onRemoveHandler = () => {
        removeItem(id);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setCurrentValue(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(currentValue.trim() !== '') {
            if (e.charCode === 13) {
                addTask(id, currentValue);
                setCurrentValue('');
            }
        } else {
            setCurrentValue('');
            setError('Field is required!');
        }
    }



    return <div className={s.addItemForm}>
        {/*<input className={ error ? s.error : ''}*/}
        {/*       placeholder={'enter your message'}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       value={currentValue}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       type="text"*/}
        {/*/>*/}


        <ThemeProvider theme={customThemeInput}>
            <TextField
                className={s.customInput}
                placeholder={'Send text..'}
                margin={'normal'}
                color={error ? 'error' : 'primary'}
                variant="standard"
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                value={currentValue}

            />
        </ThemeProvider>


        {error && <div className={s.errorMessage}> Field is not correct! </div>}

        <ThemeProvider theme={customTheme}>
            <IconButton disabled={!!error} onClick={onRemoveHandler}>
                <DeleteForeverIcon style={{opacity: '0.8'}} fontSize={'large'} color={error ? 'error' : 'primary'} />
            </IconButton>
        </ThemeProvider>

    </div>
}


export default AddItemForm;