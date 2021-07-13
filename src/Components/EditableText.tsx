import React, { useState, ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

type EditableTextPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export default function EditableText(props: EditableTextPropsType) {

    const [title, setTitle] = useState<string>(props.title);
    const [editable, setEditable] = useState<boolean>(false);

    const handleDoubleClick = () => {
        setEditable(true);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const handleBlur = () => {
        setEditable(false);
        if (title.trim().length > 0) {
            props.changeTitle(title);
        }
    }

    return (
        <span onDoubleClick={handleDoubleClick}>
            {editable ?
                <TextField
                    value={title}
                    autoFocus={true}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                : title ? title : props.title}
        </span>
    )
}

