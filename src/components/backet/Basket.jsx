import React, { useEffect } from "react";
import { Modal } from "../UI/Modal";
import { BasketItem } from "./BasketItem";
import { TotalAmount } from "./TotalAmount";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBasketItem,
  getBasket,
  updateBasketItem,
} from "../../store/basket/basketReducer";

export const Basket = ({ onToggle }) => {
  const { basketData, isLoading } = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  const incrementAmount = (id, amount) => {
    dispatch(updateBasketItem({ amount: amount + 1, id: id }));
  };

  const derementAmount = (id, amount) => {
    if (amount > 1) {
      dispatch(updateBasketItem({ amount: amount - 1, id: id }));
    } else {
      dispatch(deleteBasketItem(id));
    }
  };

  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);

  const getTotalPrice = () => {
    return basketData.reduce(
      (sum, { price, amount }) => (sum += price * amount),
      0
    );
  };

  return (
    <Modal onClose={onToggle}>
      <Content>
        {isLoading && "Loading"}
        {basketData?.length ? (
          <FixedWidthContainer>
            {basketData?.map((item) => {
              if (item.amount > 0) {
                return (
                  <BasketItem
                    incrementAmount={() =>
                      incrementAmount(item._id, item.amount)
                    }
                    derementAmount={() => derementAmount(item._id, item.amount)}
                    title={item.title}
                    price={item.price}
                    amount={item.amount}
                    id={item._id}
                    key={item._id}
                  />
                );
              }
              return null;
            })}
          </FixedWidthContainer>
        ) : null}

        <TotalAmount totalPrice={getTotalPrice()} onClose={onToggle} />
      </Content>
    </Modal>
  );
};
const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
`;

const FixedWidthContainer = styled.div`
  max-height: 250px;
  overflow-y: auto;
`;
