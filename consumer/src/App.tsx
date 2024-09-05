import React from "react";
import "./App.css";
import { RemoteConfig } from "./hooks/remote-config";
import { useFederatedModule } from "./hooks/useFederatedModule";

const configProducerA: RemoteConfig = {
  remoteEntryUrl: "http://localhost:9000/assets/remoteEntry.js",
  remoteName: "producerA",
  exposedModuleName: "moduleA",
};

const configProducerB: RemoteConfig = {
  remoteEntryUrl: "http://localhost:9001/assets/remoteEntry.js",
  remoteName: "producerB",
  exposedModuleName: "moduleB",
};

function App() {
  const [useProducerA, setUseProducerA] = React.useState(false);
  const [remoteConfig, setRemoteConfig] = React.useState(configProducerB);

  const {
    module: DynamicRemoteApp,
    isLoading,
    error,
  } = useFederatedModule(remoteConfig);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading component: {error.toString()}</div>;
  }

  if (!DynamicRemoteApp) {
    return <div>Component not found</div>;
  }

  const handleRemoteChange = (event: CustomEvent) => {
    console.log("Remote changed:", event);
  };

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    setUseProducerA(isChecked);
    const remoteConfig = isChecked ? configProducerA : configProducerB;
    setRemoteConfig(remoteConfig);
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
          <DynamicRemoteApp onChange={handleRemoteChange} />
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
