import React from "react";
import styles from "./App.module.css";

function App() {
  function dispatchChangeEvent(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("dispatchChangeEvent: ", e);
    const changeEvent = new CustomEvent("custom-change", {
      detail: {
        message: "Hello from Module A",
      },
      bubbles: true,
    });
    e.currentTarget.dispatchEvent(changeEvent);
  }

  return (
    <>
      <h1 className={styles.main}>This is Module A from Producer A</h1>
      <button onClick={(e) => dispatchChangeEvent(e)}>Click me</button>
    </>
  );
}

export default App;
