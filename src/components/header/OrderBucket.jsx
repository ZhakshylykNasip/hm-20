import React, { useEffect} from "react";
import styled from "styled-components";
import { ReactComponent as BascketIcon } from "../../assets/icons/HeaderIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getBasket } from "../../store/basket/basketReducer";

export const OrderBucket = ({ children, onToggle, className }) => {
  const { basketData } = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);

  const orderAmount = basketData?.reduce(
    (prev, current) => prev + current.amount,
    0
  );

  return (
    <Button className={className} onClick={onToggle}>
      <BascketIcon />
      <OrderBucketTitle> {children} </OrderBucketTitle>
      <OrderBucketCount>{orderAmount}</OrderBucketCount>
    </Button>
  );
};

const Button = styled.button`
  width: 249px;
  height: 59px;
  background: #5a1f08;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4d1601;
  }

  &:active {
    background-color: #993108;
  }
`;
const OrderBucketTitle = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin: 0 24px 0 13px;
`;

const OrderBucketCount = styled.span`
  background: #8a2b06;
  border-radius: 30px;
  padding: 4px 13px;
  color: #fff;
`;
