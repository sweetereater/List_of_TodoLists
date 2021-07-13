import React from 'react';

type ButtonPropsType = {
    handleClick: () => void
    children: string
}


export const Button = (props: ButtonPropsType) => {
    return (
        <button onClick={props.handleClick}>{props.children}</button>
    )
}