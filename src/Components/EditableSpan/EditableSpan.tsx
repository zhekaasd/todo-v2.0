import React, {ChangeEvent, useState} from "react";

import s from "./EditableSpan.module.scss";

type EditableSpanPropsType = {
    title: string
    updateTitle: (newTitle: string) => void
}
const EditableSpan: React.FC<EditableSpanPropsType> = ({title, updateTitle}) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [currentTitle, setCurrentTitle] = useState<string>(title);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value);
    }

    const onBlurHandler = () => {
        if (currentTitle.trim() === '') {
            setCurrentTitle(title);
        } else {
            updateTitle(currentTitle);
            setEditMode(false);
        }
    }

    return !editMode ? <div className={s.title} onDoubleClick={() => {
            setEditMode(true);
        }}>{title}</div>
        : <input
            value={currentTitle}
            className={s.editModeInput}
            autoFocus
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            type="text"
        />
}


export default EditableSpan;