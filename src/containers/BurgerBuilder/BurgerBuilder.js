import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        ordered: false
    }

    // runs at the last
    componentDidMount() {
        this.props.onInitIngredients();
    }

    canOrderHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((ingredient_key) => {
                return ingredients[ingredient_key];
            })
                .reduce((sum, ele) => {
                    return sum + ele;
                }, 0);
        return sum > 0;
    }

    orderNowHandler = () => {//to display order bill (Modal)
        this.setState({ordered: true});
    }

    cancelOrderHandler = () => {//to display order bill (Modal)
        this.setState({ordered: false});
    }

    completeOrderHandler = () => {
        this.props.history.push('/checkout'); //routing to /checkout
    }

    render(){
        let disabled_buttons = {...this.props.ings};
        for(let key in disabled_buttons){
            disabled_buttons[key] = disabled_buttons[key] <= 0;
        }//makes it key, boolean pair

        let orderSummary = null;        
        let burger = this.props.error ? <p>The Ingredients are not loading.</p> : <Spinner/>;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        add_ingredient={this.props.onIngredientAdded} 
                        remove_ingredient={this.props.onIngredientRemoved}
                        disabled={disabled_buttons}
                        price={this.props.price}
                        order_disabled={this.canOrderHandler(this.props.ings)}
                        order_now={this.orderNowHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                cancel_order={this.cancelOrderHandler}
                complete_order={this.completeOrderHandler}
                total_price={this.props.price}/>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.total_price,
        error: state.error
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));