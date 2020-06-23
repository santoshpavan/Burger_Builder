import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    const mid_ingredients = Object.keys(props.ingredients)
    .map((ingredient_key) => {
            return ([...Array(props.ingredients[ingredient_key])]
            .map((_, i) => {
                    return (<BurgerIngredient key={ingredient_key + i} type={ingredient_key} />);
            }))
    });

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {mid_ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;