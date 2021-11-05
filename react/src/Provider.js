// Provider.js
import { createContext, useReducer } from 'react';
import reducer from './reducer';

export const Context = createContext();

const initialState = {
  count: 0,
  dashboard_select: "keybase",
  "supported_bindings": { // TODO, better data structure
    "keybase":false,
    "discord":true,
    "matrix":true,
    "IRC":true
  },
  "team_list": [{ label: 'getting teams' }],
  "team_selected": "dentropydaemon",
  "most":"text",
  "per" :"msg.sender.username",
  "keybase_user_select" :"dentropy",
  "graph_controls":"MOST_PER_GRAPH_BAR",
  "graph_metadata":{
    "most":"text",
    "per":"msg.sender.username",
    "team_selected": "dentropydaemon",
    "topic_selected": "platforms",
    "user_selected": "dentropy",
    "team_list": [{ label: 'dentropydaemon' }]
  },
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