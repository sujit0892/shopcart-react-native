import { reduce } from "async";
import { LOGIN, LOGOUT , CART,TOTAL_PRICE,CART_ID, ORDER} from "../action/type";

const initialState = {
    user_id: "",
    isLogin: false,
    cart: [],
    cart_id:[],
    total_price:0,
    order:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:

            return {
                ...state,
                isLogin: true
            }

        case LOGOUT:
            return {
                ...state,
                isLogin: false
            }
        case CART:
            return {
                ...state,
                cart: action.data
            }
        case TOTAL_PRICE:
                return {
                    ...state,
                    total_price: action.data
                }
        case CART_ID:
            return {
                ...state,
                cart_id:action.data
            }
        case ORDER:
            return {
                ...state,
                order:action.data
            }
        default:
            return state;
    }

}

export default reducer;