import React from 'react';
import Aux from '../../../hoc/Aux';
//props = {ing_name: ing_qty}
const order_summary = (props) => {
    const ingredients_list = Object.keys(props.ingredients)
        .map((ingredient_key) => {
            return (
                <li>
                    <span>
                        {ingredient_key}: {props.ingredients[ingredient_key]}
                    </span>
                </li>
            );
        })

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>The ingredients selected are:</p>
            {ingredients_list}
        </Aux>
    );
}

export default order_summary;