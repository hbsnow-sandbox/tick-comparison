import { useState } from "react";

export function Page() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-2xl">
        <a href="https://react.dev" target="_blank">
          React logo
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}
