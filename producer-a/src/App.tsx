import React from "react";
import styles from "./App.module.css";

type AppProps = {
  onChange?: (e: CustomEvent) => void;
};

function App(props: AppProps) {
  function dispatchChangeEvent(e: React.MouseEvent<HTMLButtonElement>) {
    if (props.onChange) {
      console.log("dispatchChangeEvent: ", e);

      const changeEvent = new CustomEvent("custom-change", {
        detail: {
          message: "Hello from Module A",
        },
        bubbles: true,
      });
      props.onChange(changeEvent);
    }
  }

  return (
    <>
      <h1 className={styles.main}>This is Module A from Producer A</h1>
      <button onClick={(e) => dispatchChangeEvent(e)}>Click me</button>
    </>
  );
}

export default App;
