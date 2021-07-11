import { reduce } from "async";
import { LOGIN,LOGOUT } from "../action/type";

const initialState={
    user_id:"",
    isLogin:false
}

const reducer = (state = initialState,action)=>{
    switch(action.type)
    {
        case LOGIN:
            
            return{
                ...state,
                isLogin:true
            }

        case LOGOUT:
            return {
                ...state,
                isLogin:false
            }
        default:
            return state;
    }
        
}

export default reducer;