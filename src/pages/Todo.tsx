import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface TodoType {
  idx: number;
  content: string;
  isDone: boolean;
  createdAt: Date;
}

const URL = "http://localhost:3003";

export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [updateIdx, setUpdateIdx] = useState<number>(-1);

  // GET
  useEffect(() => {
    fetch(`${URL}/todos`)
      .then((res) => {
        // 응답을 JSON 형식으로 변환하여 반환
        return res.json();
      })
      .then((data) => {
        // JSON 형식으로 변환된 데이터를 사용
        setTodos(data.result);
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error fetching data:", error);
      });
  }, []);

  // POST
  const addTodo = async (todo: string) => {
    const newTodo = {
      idx: todos[-1] ? todos[-1].idx + 1 : 1,
      content: todo,
      isDone: false,
      createdAt: new Date(),
    };

    axios
      .post(`${URL}/todo`, {
        content: todo,
      })
      .then(() => {
        setTodos([...todos, newTodo]);
        setNewTodo("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newTodo);
    addTodo(newTodo);
  };

  // DELETE
  const deleteHandler = (idx: number) => {
    axios
      .delete(`${URL}/todo/${idx}`)
      .then(() => {
        const newTodos = todos.filter((todo) => todo.idx !== idx);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateHander = (idx: number, todo: string) => {
    axios
      .patch(`${URL}/todo`, {
        content: todo,
      })
      .then(() => {
        // todo 배열 갱신
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Todo App</h2>
      <p>※ 백엔드 서버 미배포 상태로, 기능이 동작하지 않을 수 있음</p>
      {todos.map((todo, i) => (
        <ul key={`${todo.idx}_${i}`}>
          {updateIdx === todo.idx ? (
            <>
              <input type="text" value={todo.content} />
              <button type="button" onClick={() => setUpdateIdx(-1)}>
                수정완료(api 미개발)
              </button>
            </>
          ) : (
            <>
              <li>{todo.content}</li>
              <button type="button" onClick={() => setUpdateIdx(todo.idx)}>
                수정하기
              </button>
            </>
          )}
          <button type="button" onClick={() => deleteHandler(todo.idx)}>
            delete
          </button>
        </ul>
      ))}
      <form
        onSubmit={(event) => {
          submitHandler(event);
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="할 일을 입력해 주세요"
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
