import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    ingredients: null,
    total_price: 5, //base 5$
    error: false //true if loading fails
};

const PRICE_LIST = {
    salad: 0.5,
    meat: 1,
    bacon: 2,
    cheese: 1.5
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                total_price: state.total_price + PRICE_LIST[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                total_price: state.total_price - PRICE_LIST[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                //resetting the price and error
                total_price: 5,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;