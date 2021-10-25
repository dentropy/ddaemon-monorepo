// Provider.js
import { createContext, useReducer } from 'react';
import reducer from './reducer';

export const Context = createContext();

const initialState = {
  count: 0,
  "team_list": [{ label: 'getting teams' }],
  "team_selected": "dentropydaemon",
  "most":"text",
  "per" :"msg.sender.username",
  "graph_controls":"MOST_PER",
  "graph_metadata":undefined,
  "graph_rendered":undefined,
};

export default function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
}