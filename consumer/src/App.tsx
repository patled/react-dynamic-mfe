import React, { useEffect } from "react";
import "./App.css";

import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  // @ts-ignore
} from "__federation__";

interface RemoteConfig {
  url: string;
  name: string;
  module: string;
}

function DetermineRemote(useProducerA: boolean): RemoteConfig {
  const remoteConfig = useProducerA
    ? {
        url: "http://localhost:9000/assets/remoteEntry.js",
        name: "producerA",
        module: "./ProducerA",
      }
    : {
        url: "http://localhost:9001/assets/remoteEntry.js",
        name: "producerB",
        module: "./ProducerB",
      };
  return remoteConfig;
}

function App() {
  const [useProducerA, setUseProducerA] = React.useState(false);
  const [remoteConfig, setRemoteConfig] = React.useState({
    url: "",
    name: "",
    module: "",
  });

  useEffect(() => {
    const remoteConfig = DetermineRemote(useProducerA);
    setRemoteConfig(remoteConfig);
  }, [useProducerA]);

  const DynamicRemoteApp = React.lazy(() => {
    const { url, name, module } = remoteConfig;

    __federation_method_setRemote(name, {
      url: () => Promise.resolve(url),
      format: "esm",
      from: "vite",
    });

    return __federation_method_getRemote(name, module);
  });

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    setUseProducerA(isChecked);
  }

  return (
    <div className="app">
      <h1>This is the Consumer</h1>
      <div>
        <input
          type="checkbox"
          id="producerA"
          name="producerA"
          checked={useProducerA}
          onChange={(e) => {
            handleCheckboxChange(e);
          }}
        />{" "}
        Producer A
      </div>

      <div className="app-container">
        <React.Suspense fallback="Loading">
          <DynamicRemoteApp />
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
