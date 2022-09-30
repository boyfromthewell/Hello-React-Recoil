import React from "react";
import styled from "styled-components";
import RecoilCounter from "../components/RecoilCounter";
import RecoilTodo from "../components/RecoilTodo";

function Home() {
  return (
    <HomeContainer>
      <RecoilCounter />
      <RecoilTodo />
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;
