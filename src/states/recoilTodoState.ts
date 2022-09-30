import { atom, selector } from "recoil";

export interface TodoItem {
    id: number;
    title: string;
    checked: boolean;
}

export interface CommonTodoState {
    todoList: TodoItem[]
};

const initialState: CommonTodoState = {
    todoList: []
}

export const recoilTodoState = atom({
    key: 'recoilTodoState',
    default: initialState
})

export const recoildTodoSelector = selector({
    key: 'recoilTodoSelector',
    get: ({get}) => {
        return get(recoilTodoState);
    },
    set: ({set}, value)=>{
        set(recoilTodoState, value);
    }
})