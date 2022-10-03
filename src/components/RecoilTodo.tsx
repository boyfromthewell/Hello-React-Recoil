import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  CommonTodoState,
  recoildTodoSelector,
  TodoItem,
} from "../states/recoilTodoState";

function RecoilTodo() {
  const [recoilTodo, setRecoilTodo] = useRecoilState(recoildTodoSelector);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [modifyInputTitle, setModifyInputTitle] = useState<string>("");

  const [inputId, setInputId] = useState<number>();
  const [inputToggle, setInputToggle] = useState<boolean>(false);

  const defaultRecoilTodoState: CommonTodoState = { ...recoilTodo };

  console.log(defaultRecoilTodoState.todoList);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputTitle(e.currentTarget.value);
    },
    [inputTitle]
  );

  const modifyInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setModifyInputTitle(e.currentTarget.value);
    },
    [modifyInputTitle]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(inputTitle);

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

  const onToggle = useCallback(
    (inputId: number) => {
      const setTodoList = [...recoilTodo.todoList];
      const toggleIndex = setTodoList.findIndex((item) => item.id === inputId);
      const toggleItem = { ...setTodoList[toggleIndex] };
      console.log(toggleItem);

      toggleItem.checked = !toggleItem.checked;
      setTodoList[toggleIndex] = { ...toggleItem };

      defaultRecoilTodoState.todoList = setTodoList;
      setRecoilTodo(defaultRecoilTodoState);
    },
    [recoilTodo]
  );

  const onRemove = useCallback(
    (inputId: number) => {
      const setTodoList = [...recoilTodo.todoList];
      const filterItems = setTodoList.filter((item) => item.id !== inputId);

      defaultRecoilTodoState.todoList = filterItems;
      setRecoilTodo(defaultRecoilTodoState);
    },
    [recoilTodo]
  );

  const onModifyToggle = (inputId: number) => {
    setInputId(inputId);
    setInputToggle(!inputToggle);
  };

  const submitModify = (inputId: number) => {
    const setTodoList = [...recoilTodo.todoList];
    const toggleIndex = setTodoList.findIndex((item) => item.id === inputId);
    const toggleItem = { ...setTodoList[toggleIndex] };

    toggleItem.title = modifyInputTitle;
    setTodoList[toggleIndex] = { ...toggleItem };

    defaultRecoilTodoState.todoList = setTodoList;
    setRecoilTodo(defaultRecoilTodoState);
    setInputToggle(false);
  };
  return (
    <TodoContainer>
      <FormContainer onSubmit={onSubmit}>
        <input value={inputTitle} onChange={onChange} />
        <button type="submit">Add Todo!</button>
      </FormContainer>

      <TodoList>
        {recoilTodo.todoList.map((item, idx) => (
          <TodoItemContainer key={idx}>
            <TodoListForm>
              <input
                type="checkbox"
                checked={item.checked}
                readOnly={true}
                onClick={() => onToggle(item.id)}
              />
              <span
                style={{
                  textDecoration: item.checked ? "line-through" : "none",
                }}
              >
                {item.title}
              </span>
              <div>
                <ModifyBtn onClick={() => onModifyToggle(item.id)}>
                  수정
                </ModifyBtn>
                <DelBtn onClick={() => onRemove(item.id)}>X</DelBtn>
              </div>
            </TodoListForm>
            {inputId === item.id && inputToggle ? (
              <div style={{ display: "flex" }}>
                <input onChange={modifyInput} />
                <button onClick={() => submitModify(item.id)}>OK</button>
              </div>
            ) : null}
          </TodoItemContainer>
        ))}
      </TodoList>
    </TodoContainer>
  );
}

export default RecoilTodo;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormContainer = styled.form`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  input {
    width: 70%;
    height: 30px;
    border-radius: 10px;
    font-size: 1rem;
    color: gray;
    border: 1px solid gray;
    &:focus {
      outline: 1px solid blue;
      box-shadow: 0 0 10px;
    }
  }
  button {
    width: 15%;
    font-size: 1rem;
    color: white;
    background-color: blue;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 5px;
    &:active {
      transform: scale(1.2);
    }
  }
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  padding-top: 3vh;
  border-top: 3px solid lightgray;
`;

const TodoItemContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const TodoListForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;

  input {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  span {
    color: gray;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ModifyBtn = styled.button`
  width: 70px;
  height: 40px;
  font-size: 1rem;
  color: white;
  background-color: #59ad95;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 5px;
  &:active {
    transform: scale(1.2);
  }
`;

const DelBtn = styled(ModifyBtn)`
  background-color: tomato;
  width: 30px;
  height: 30px;
`;
