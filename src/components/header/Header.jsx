import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OrderBucket } from "./OrderBucket";
import { useSelector } from "react-redux";

export const Header = ({ onToggle }) => {
  const [animationClass, setAnimationClass] = useState("");
  const { basketData } = useSelector((state) => state.basket);

  useEffect(() => {
    setAnimationClass("bump");

    const id = setTimeout(() => {
      setAnimationClass("");
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [basketData]);

  return (
    <header>
      <Container>
        <h1>ReactMeals </h1>
        <OrderBucket onToggle={onToggle} className={animationClass}>
          Your card
        </OrderBucket>
      </Container>
    </header>
  );
};

const Container = styled.div`
  width: 100%;
  height: 101px;
  background-color: #8a2b06;
  padding: 0px 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  h1 {
    color: #fff;
  }

  .bump {
    animation: bump 300ms ease-out;
  }

  @keyframes bump {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
`;
