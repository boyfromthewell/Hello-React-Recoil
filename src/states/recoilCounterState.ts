import { atom, selector } from "recoil";
/***
 * selector : 순수함수이며 파생된 상태이다 (다른 데이터에 의존하는 동적인 데이터를 만들수 있는 개념)
 * 
 * key: 내부적으로 selector 식별하는 고유값
 * get: 파생된 상태를 반환, atom, selector, Promise를 반환
 * set: 쓰기 가능한 상태를 반환
 *      atom이나 다른 selector의 상태를 업데이트, (자기자신의 selector를 업데이트하면 무한루프 돔)
 * 
 */
export interface CommonCounterState {
    value: number;
}

const initialState: CommonCounterState = {
    value: 0
}

export const recoilCounterState = atom({
    key:'recoilCounterState',
    default:initialState
});

export const recoilCounterSelector = selector({
    key:'recoilCounterSelector',
    get: ({get}) => {
        return get(recoilCounterState)
    },
    set: ({set}, value) => {
        set(recoilCounterState, value)
    }
});