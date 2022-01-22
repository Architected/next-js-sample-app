import { createContext, useReducer } from 'react';
import combineReducers from 'react-combine-reducers';
import {
  authReducer,
  initialAuthState,
} from 'architected-client/app-state/reducers/iam.js';
import {
  fileReducer,
  initialFileState,
} from 'architected-client/app-state/reducers/file.js';
import {
  profileReducer,
  initialProfileState,
} from 'architected-client/app-state/reducers/profile.js';

export const Store = createContext();

export function StoreProvider(props) {
  const [storeReducer, initialState] = combineReducers({
    auth: [authReducer, initialAuthState],
    file: [fileReducer, initialFileState],
    global: [profileReducer, initialProfileState],
  });

  const [state, dispatch] = useReducer(storeReducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
