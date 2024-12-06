import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { InitialStateShape } from "./stateTypes";
import { initialState } from "./initialState";
import { globalReducer } from "./reducers";
import { Action } from "./actions";

// Define the context type
interface GlobalStateContextType {
  state: InitialStateShape;
  dispatch: Dispatch<Action>;
}

// Create context with an initial value
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Provider component
interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export const useGlobalStateSelector = (selectorFn: any) => {
  const { state } = useGlobalState();
  return selectorFn(state);
};


