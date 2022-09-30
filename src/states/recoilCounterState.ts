import { atom, selector } from "recoil";

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