import React, { useCallback } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
import styled from "styled-components";
import {
  CommonCounterState,
  recoilCounterSelector,
  recoilCounterState,
} from "../states/recoilCounterState";

function RecoilCounter() {
  /**
   * useRecoilState : atom의 상태를 구독
   * (useStae 훅과 같이 배열의 첫번쨰 파라미터로 상태, 두번째 파라미터로 상태에 대한 setter함수를 반환)
   * useRecoilValue : setter함수 없이 atom의 상태만 반환
   * useSetRecoilState : atom 상태없이 setter 함수만 반환
   * useResetRecoilState : atom 상태를 디폴트 상태로 reset
   *
   */
  const [recoilCounter, setRecoilCounter] = useRecoilState(
    recoilCounterSelector
  );
  const recoilValue = useRecoilValue(recoilCounterState);
  const setCounter = useSetRecoilState(recoilCounterState);
  const resetCounter = useResetRecoilState(recoilCounterState);

  const defaultRecoilCounterState: CommonCounterState = { ...recoilCounter };

  const onIncrease = useCallback(() => {
    defaultRecoilCounterState.value = recoilCounter.value + 1;
    setRecoilCounter(defaultRecoilCounterState);
  }, [recoilCounter]);

  const onDecrease = useCallback(() => {
    defaultRecoilCounterState.value = recoilCounter.value - 1;
    setRecoilCounter(defaultRecoilCounterState);
  }, [recoilCounter]);

  return (
    <CounterContainer>
      <CounterP>I'm Counter : {recoilCounter.value}</CounterP>
      <ButtonContainer>
        <Button onClick={onIncrease}>+</Button>
        <Button onClick={onDecrease}>-</Button>
      </ButtonContainer>
    </CounterContainer>
  );
}

export default RecoilCounter;

const CounterContainer = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const ButtonContainer = styled.div``;

const CounterP = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
`;
const Button = styled.button`
  width: 50px;
  height: 50px;
  font-size: 2rem;
  color: white;
  background-color: blue;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 5px;
  &:active {
    transform: scale(1.5);
  }
`;
