import { fetchRequest } from "../../lib/fetchAPI";

export const mealsActionTypes = {
  GET_MEALS: "GET_MEALS",
  GET_MEALS_PENDING: "GET_MEALS_PENDING",
  GET_MEALS_SUCCESS: "GET_MEALS_SUCCESS",
};

const initialState = {
  meals: [],
  isLoading: false,
};

export const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case mealsActionTypes.GET_MEALS:
      return {
        ...state,
        meals: action.payload,
      };
    case mealsActionTypes.GET_MEALS_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case mealsActionTypes.GET_MEALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const getMeals = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: mealsActionTypes.GET_MEALS_PENDING });
      const response = await fetchRequest(`/foods`);
      dispatch({ type: mealsActionTypes.GET_MEALS_SUCCESS });

      dispatch({ type: mealsActionTypes.GET_MEALS, payload: response });
    } catch (error) {
      new Error(error);
    }
  };
};
