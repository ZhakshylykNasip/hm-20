import { applyMiddleware, combineReducers, createStore } from "redux";
import { mealReducer } from "./meals/mealsReducer";
import thunk from "redux-thunk";
import { basketReducer } from "./basket/basketReducer";


const rootReducer = combineReducers({
  meals:mealReducer,
  basket:basketReducer
  
})


export const store = createStore(rootReducer,applyMiddleware(thunk))