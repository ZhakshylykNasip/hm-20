import { fetchRequest } from "../../lib/fetchAPI";

const initialState = {
  basketData: [],
  isLoading: false,
};
export const basketActionTypes = {
  GET_BASKET: "GET_BASKET",

  DELETE_BASKET_ITEM: "DELETE_BASKET_ITEM",
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketActionTypes.GET_BASKET:
      return {
        ...state,
        basketData: action.payload,
      };

    default:
      return state;
  }
};

export const getBasket = () => {
  return async (dispatch) => {
    const response = await fetchRequest(`/basket`);

    dispatch({ type: basketActionTypes.GET_BASKET, payload: response.items });
  };
};

export const updateBasketItem = (data) => {
  console.log(data);
  return async (dispatch) => {
    try { 
      await fetchRequest(`/basketitem/${data.id}/update`, {
        method: "PUT",
        body: { amount: data.amount },
      });

      dispatch(getBasket());
    } catch (error) {
      new Error(error);
    }
  };
};

export const deleteBasketItem = (id) => {
  return async (dispatch) => {
    try {
      await fetchRequest(`/basketitem/${id}/delete`, {
        method: "DELETE",
      });

      dispatch(getBasket());
    } catch (error) {
      new Error(error);
    }
  };
};

export const addToBasket = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetchRequest(`/foods/${data.id}/addToBasket`, {
        method: "POST",
        body: { amount: data.amount },
      });


      dispatch(getBasket());

      return response.items;
    } catch (error) {
      new Error(error);
    }
  };
};
