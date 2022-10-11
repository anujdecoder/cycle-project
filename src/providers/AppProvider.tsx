import React, { useCallback } from "react";
import { User } from "firebase/auth";
import { useImmer } from "use-immer";
import AuthService from "../services/AuthService";

interface Props {
  children?: React.ReactNode;
}

type AppProviderType = {
  initializing?: boolean;
  loggedIn?: boolean;
  user?: User | null;
};

const defaultValue: AppProviderType = {
  initializing: true,
  loggedIn: false,
  user: null,
};

const AppContext = React.createContext<AppProviderType>(defaultValue);

export const useApp = () => React.useContext(AppContext);

const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useImmer(defaultValue);
  const handleUserChange = useCallback(
    (user: User | null) => {
      setState((draft) => {
        draft.user = user;
        draft.loggedIn = !!user;
        draft.initializing = false;
      });
    },
    [setState]
  );
  React.useEffect(() => {
    AuthService.subscribeToAuthChange(handleUserChange);
  }, [handleUserChange]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppProvider;
