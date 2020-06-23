import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let mid_ingredients = Object.keys(props.ingredients)
    .map((ingredient_key) => {
            return ([...Array(props.ingredients[ingredient_key])]
            .map((_, i) => {
                    return (<BurgerIngredient key={ingredient_key + i} type={ingredient_key} />);
            }));
    })
    .reduce((arr, ele) => { return arr.concat(ele) }, []); //flattening the array to get actual length
    // console.log(mid_ingredients);
    
    if(mid_ingredients.length === 0){
        mid_ingredients = <p>Please add ingredients!</p>
    }


    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {mid_ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;