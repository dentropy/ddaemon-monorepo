// Provider.js
import { createContext, useReducer } from 'react';
import reducer from './reducer';

export const Context = createContext();

const initialState = {
  count: 0,
  dashboard_select: "discord",
  "supported_bindings": { // TODO, better data structure
    "keybase":false, // False means it is implimented
    "discord":false,
    "matrix":true,
    "IRC":true,
    "Telegram": true,
    "Pornhub":true
  }
};

export default function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
}