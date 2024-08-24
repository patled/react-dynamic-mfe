import React, { useState, useEffect } from "react";
import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  // @ts-ignore
} from "__federation__";
import { RemoteConfig } from "./remote-config.ts";

interface FederatedModuleState {
  module: React.ComponentType<any> | null;
  isLoading: boolean;
  error: unknown;
}

async function loadFederatedModule(remoteConfig: RemoteConfig) {
  const FederatedModule = React.lazy(async () => {
    try {
      const {
        remoteEntryUrl,
        remoteName,
        exposedModuleName: exposedModule,
      } = remoteConfig;

      __federation_method_setRemote(remoteName, {
        url: () => Promise.resolve(remoteEntryUrl),
        format: "esm",
        from: "vite",
      });

      const remoteModule = await __federation_method_getRemote(
        remoteName,
        exposedModule
      );
      return remoteModule;
    } catch (e) {
      console.error(e);
    }
    return Promise.resolve(null);
  });

  return FederatedModule;
}

export function useFederatedModule(remoteConfig: RemoteConfig) {
  const [state, setState] = useState<FederatedModuleState>({
    module: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    console.log("loading remote...");

    loadFederatedModule(remoteConfig)
      .then((federatedModule) => {
        console.log("federatedModule:", federatedModule);
        setState((prevState) => ({
          ...prevState,
          module: federatedModule,
          isLoading: false,
        }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, error, isLoading: false }));
      });
  }, [remoteConfig]);

  return state;
}
