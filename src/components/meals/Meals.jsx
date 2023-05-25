import React, { useEffect } from "react";
import styled from "styled-components";
import { MealSummaryCard } from "./MealSummaryCard";
import { MealItem } from "./MealItem";
import { useDispatch, useSelector } from "react-redux";
import { getMeals } from "../../store/meals/mealsReducer";

export const Meals = () => {
  const { meals, isLoading } = useSelector((state) => state.meals);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getMeals());
  }, [dispatch]);

  return (
    <>
      <MealSummaryCard />
      <Container>
        {isLoading && "Loading..."}
        {meals?.map((meal) => (
          <MealItem key={meal._id} meal={meal} />
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #fff;
  width: 80%;
  margin: 50px auto;
  padding: 40px;
  border-radius: 16px;
  margin-top: 40px;
`;
