import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

//props = {ing_name: ing_qty}
const order_summary = (props) => {
    const ingredients_list = Object.keys(props.ingredients)
        .map((ingredient_key) => {
            return (
                <li key={ingredient_key}>
                    <span style={{textTransform: 'capitalize'}}>
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
            <p><strong>Total Price: {props.total_price.toFixed(2)}</strong></p>
            <Button type={"Danger"} clicked={props.cancel_order}>Cancel</Button>
            <Button type={"Success"} clicked={props.complete_order}>Continue</Button>
        </Aux>
    );
}

export default order_summary;