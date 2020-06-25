import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRICE_LIST = {
    salad: 0.5,
    meat: 1,
    bacon: 2,
    cheese: 1.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            salad: 0,
            cheese: 0,
            bacon: 0
        },
        total_price: 5, //base 5$
        can_order: false,
        ordered: false
    }

    canOrderHandler = (ingredients) => {
        console.log(ingredients);
        const sum = Object.keys(ingredients)
            .map((ingredient_key) => {
                return ingredients[ingredient_key];
            })
                .reduce((sum, ele) => {
                    return sum + ele;
                }, 0);
        // console.log(sum);
        // const can_order = sum > 0;
        this.setState({can_order: sum > 0});
    }

    addIngredientHandler = (type) => {
        const prev_count = this.state.ingredients[type];
        const new_count = prev_count + 1;
        let ingredient_list = {...this.state.ingredients}; //since state is immutable
        ingredient_list[type] = new_count;
        const old_price = this.state.total_price;
        const new_price = old_price + PRICE_LIST[type];
        this.setState({total_price: new_price, ingredients: ingredient_list});
        this.canOrderHandler(ingredient_list);
    }

    removeIngredientHandler = (type) => {
        const prev_count = this.state.ingredients[type];
        const new_count = prev_count - 1;
        let ingredient_list = {...this.state.ingredients}; //since state is immutable
        ingredient_list[type] = new_count;
        const old_price = this.state.total_price;
        const new_price = old_price - PRICE_LIST[type];
        this.setState({total_price: new_price, ingredients: ingredient_list});
        this.canOrderHandler(ingredient_list);
    }

    orderNowHandler = () => {//to display order bill (Modal)
        this.setState({ordered: true});
    }

    cancelOrderHandler = () => {//to display order bill (Modal)
        // console.log("This is it!")
        this.setState({ordered: false});
    }

    completeOrderHandler = () => {
        alert("You Bought it! No take backs!");
    }

    render(){
        let disabled_buttons = {...this.state.ingredients};
        for(let key in disabled_buttons){
            disabled_buttons[key] = disabled_buttons[key] <= 0;
        }//makes it key, boolean pair

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <Modal show={this.state.ordered} backdrop_clicked={this.cancelOrderHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancel_order={this.cancelOrderHandler}
                        complete_order={this.completeOrderHandler}
                        total_price={this.state.total_price}/>
                </Modal>
                <BurgerControls 
                    add_ingredient={this.addIngredientHandler} 
                    remove_ingredient={this.removeIngredientHandler}
                    disabled={disabled_buttons}
                    price={this.state.total_price}
                    order_disabled={this.state.can_order}
                    order_now={this.orderNowHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;