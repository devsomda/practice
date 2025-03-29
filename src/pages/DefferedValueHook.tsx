import React, { useDeferredValue, useMemo, useState } from "react";

// 무거운 연산
const heavyFunc = () => {
  for (let i = 0; i < 30000; i++) {
    console.log("heavy");
  }
  return 0;
};

export default function App() {
  const [input, setInput] = useState("");

  // 입력값을 지연시킴
  const deferredInput = useDeferredValue(input);

  // 👉 무거운 연산은 지연된 값으로만 수행
  const processed = useMemo(() => {
    heavyFunc();
    return deferredInput;
  }, [deferredInput]);


  return (
    <>
      <h3>useDeferredValue</h3>
      <p>특정 UI 업데이트를 나중으로 미루기 위해 사용되는 리액트 훅으로, 부하가 많거나 복잡한 작업을 처리하는 중에도 매끄러운 사용자 경험을 유지할 수 있게 합니다.</p>
      <hr/>
      <p>아래 input에 값을 넣는 게 무거운 작업이라고 가정했을 때, 출력되는 시점과 형태를 비교해 봅시다!</p>
        <input 
          type='test'
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <p>입력 값 (useState): {input}</p>
        <p>입력 값 (useDeferredValue): {processed}</p>
    </>
  );
}