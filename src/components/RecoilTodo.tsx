import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useRecoilState } from "recoil";
import {
  CommonTodoState,
  recoilTodoState,
  TodoItem,
} from "../states/recoilTodoState";

function RecoilTodo() {
  const [recoilTodo, setRecoilTodo] = useRecoilState(recoilTodoState);
  const [inputTitle, setInputTitle] = useState<string>("");

  const defaultRecoilTodoState: CommonTodoState = { ...recoilTodo };

  console.log(defaultRecoilTodoState.todoList);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputTitle(e.currentTarget.value);
    },
    [inputTitle]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const insertItem: TodoItem = {
        id: !recoilTodo.todoList.length
          ? 0
          : Math.max(...recoilTodo.todoList.map((item) => item.id)) + 1,
        title: inputTitle,
        checked: false,
      };

      const setTodoList = [...recoilTodo.todoList, insertItem];

      defaultRecoilTodoState.todoList = setTodoList;
      setRecoilTodo(defaultRecoilTodoState);
      setInputTitle("");
    },
    [inputTitle, recoilTodo]
  );
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={inputTitle} onChange={onChange} />
        <button type="submit">Add!</button>
      </form>
      <div>
        {recoilTodo.todoList.map((item, idx) => (
          <div key={idx}>
            <input type="checkbox" checked={item.checked} readOnly={true} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecoilTodo;
