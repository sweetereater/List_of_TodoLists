import React, { ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons';

type InputPropsType = {
    handleChange: (title: string) => void
    label: string
}

export const Input = (props: InputPropsType) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    }

    const handleClick = (event: MouseEvent) => {
        const newTask = title.trim();
        if (newTask) {
            props.handleChange(title);
            setTitle("")
        } else {
            setError("Пожалуйста, впишите что-либо")
        }
    }

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" && title.trim()) {
            props.handleChange(title);
            setTitle("")
        }
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                error={!!error}
                variant="outlined"
                label={props.label}
            />
            <IconButton
                onClick={handleClick}
            >
                <Add />
            </IconButton>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}