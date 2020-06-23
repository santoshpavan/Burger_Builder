import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}    
];

//key is required to keep track and label is unique and can work as key
const burger_control = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( ctrl => (
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                more_clicked={() => props.add_ingredient(ctrl.type)}
                less_clicked={() => props.remove_ingredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
    </div>
);

export default burger_control;