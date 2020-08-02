import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const PRICE_LIST = {
    salad: 0.5,
    meat: 1,
    bacon: 2,
    cheese: 1.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        total_price: 5, //base 5$
        can_order: false,
        ordered: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-4309a.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(e => {
                this.setState({error: true});
            });
    }

    canOrderHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((ingredient_key) => {
                return ingredients[ingredient_key];
            })
                .reduce((sum, ele) => {
                    return sum + ele;
                }, 0);
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
        // start the loading
        this.setState({loading: true});
        //dummy data for the order details
        const order =  {
            ingredients: this.state.ingredients,
            price: this.state.total_price,
            customer: {
                name: 'Santosh',
                address: {
                    street: 'Test Adress',
                    zipcode: '27606',
                    country: 'US'
                },
                email: 'santosh@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                // stop the loading and close the modal
                this.setState({loading: false, ordered: false});
            })
            .catch(error => {
                this.setState({loading: false, ordered: false});
            });
    }

    render(){
        let disabled_buttons = {...this.state.ingredients};
        for(let key in disabled_buttons){
            disabled_buttons[key] = disabled_buttons[key] <= 0;
        }//makes it key, boolean pair

        let orderSummary = null;        
        let burger = this.state.error ? <p>The Ingredients are not loading.</p> : <Spinner/>;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                    add_ingredient={this.addIngredientHandler} 
                    remove_ingredient={this.removeIngredientHandler}
                    disabled={disabled_buttons}
                    price={this.state.total_price}
                    order_disabled={this.state.can_order}
                    order_now={this.orderNowHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            cancel_order={this.cancelOrderHandler}
            complete_order={this.completeOrderHandler}
            total_price={this.state.total_price}/>
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return(
            <Aux>                
                <Modal show={this.state.ordered} backdrop_clicked={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);