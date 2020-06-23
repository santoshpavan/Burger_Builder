import React from 'react';
import classes from './BuildControl.css';

const burger_control = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Less} 
            onClick={props.less_clicked}
            disabled={props.disabled}>Less</button>
        <button 
            className={classes.More} 
            onClick={props.more_clicked}>More</button>
    </div>
);

export default burger_control;