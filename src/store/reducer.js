import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    },
    total_price: 5, //base 5$
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
        default:
            return state;
    }
};

export default reducer;