import React from 'react';
import { filterType } from '../App';

type FilterButtonPropsType = {
    children: string
    handleClick: () => void
    filter: filterType
}



export const FilterButton = (props: FilterButtonPropsType) => {
    return (
        <button className={props.filter === props.children ? "active-filter" : ""} onClick={props.handleClick} >{props.children}</button>
    )
}