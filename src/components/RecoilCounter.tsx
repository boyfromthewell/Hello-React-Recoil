import React, { useCallback } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
import {
  CommonCounterState,
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
  const [recoilCounter, setRecoilCounter] = useRecoilState(recoilCounterState);
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
    <div className="counter-container">
      <h1>{recoilCounter.value}</h1>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
}

export default RecoilCounter;
