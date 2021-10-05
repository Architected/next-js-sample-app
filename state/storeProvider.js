import { createContext, useReducer } from 'react';
import combineReducers from 'react-combine-reducers';
import { authReducer, initialAuthState } from './reducers/auth';
import { fileReducer, initialFileState } from './reducers/file';
import { globalReducer, initialGlobalState } from './reducers/global';

export const Store = createContext();

export function StoreProvider(props) {
  const [storeReducer, initialState] = combineReducers({
    auth: [authReducer, initialAuthState],
    file: [fileReducer, initialFileState],
    global: [globalReducer, initialGlobalState],
  });

  const [state, dispatch] = useReducer(storeReducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
