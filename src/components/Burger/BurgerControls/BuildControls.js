import React from 'react';
import BurgerControl from './BuildControl/BuildControl';
import classes from './BuildControl/BuildControl.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}    
];

//key is required to keep track and label is unique and can work as key
const burger_control = (props) => (
    <div className={classes.BuildControl}>
        {controls.map( ctrl => (
            <BurgerControl 
                key={ctrl.label}
                label={ctrl.label}
                more_clicked={() => props.add_ingredient(ctrl.type)}/>
        ))}
    </div>
);

export default burger_control;