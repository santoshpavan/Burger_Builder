import React, { Component } from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component{
    render(){
        let ingredient = null;

        switch(props.type){
            case('bread-bottom'):
                ingredient = <div className={classes.BreatBottom}></div>;
                break;

            case('bread-top'):
                ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>;
                    <div className={classes.Seeds2}></div>;
                </div>
                )
                break;
            
            case('meat'):
                ingredient = <div className={classes.Meat}></div>;
                break;
            
            case('cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;

            case('salad'):
                ingredient = <div className={Salad}></div>;
                break;

            case('bacon'):
                ingredient = <div className={Bacon}></div>;
                break;

            default:
                ingredient = null;
        }

        return ingredient;
    }
}

//prop types is a JS object
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;