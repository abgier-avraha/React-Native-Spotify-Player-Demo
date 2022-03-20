import { useState } from "react";
import { createServiceProvider } from "./createServiceProvider";

export interface AppState {
  selectedSongId?: number;
}

interface AppStateContext<T> {
  state: T;
  set: (value: T) => void;
}

const [ServiceProvider, useHook] = createServiceProvider<AppStateContext<AppState>>();

interface Props {
  children?: React.ReactNode;
}

export const SettingsProvider = (props: Props) => {
  const [state, setState] = useState<AppState>({});

  function set(newState: AppState): void {
    setState((currentState) => {
      return { ...currentState, ...newState };
    });
  }

  return <ServiceProvider value={{ state, set }}>{props.children}</ServiceProvider>;
};


export const useSettings = () => useHook();