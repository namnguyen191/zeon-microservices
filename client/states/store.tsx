import axios from 'axios';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext
} from 'react';

type GlobalState = {
  user: any;
};

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalState>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalState>>>
});

const GlobalStateProvider = ({
  children,
  value = {} as GlobalState
}: {
  children: React.ReactNode;
  value?: Partial<GlobalState>;
}) => {
  const [state, setState] = useState(value);

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
