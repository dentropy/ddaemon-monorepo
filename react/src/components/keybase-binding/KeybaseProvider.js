// Provider.js
import { createContext, useReducer } from 'react';
import reducer from './KeybaseReducer';

export const KeybaseContext = createContext();

const initialState = {
  "team_list": [{ label: 'getting teams' }],
  "team_selected": "dentropydaemon",
  "keybase_most":"text",
  "keybase_per" :"msg.sender.username",
  "keybase_user_select" :"dentropy",
  "data_viz_controls":"MOST_PER_GRAPH_BAR",
  "graph_metadata":{
    "most":"text",
    "per":"msg.sender.username",
    "team_selected": "dentropydaemon",
    "topic_selected": "platforms",
    "user_selected": "dentropy",
    "team_list": [{ label: 'dentropydaemon' }]
  },
  "graph_rendered":undefined,
  "list_select":"ListTopicsUserHasPostedIn",
  "list_rendered": {
    "data":[
      ['John', 'john@example.com'],
      ['Mike', 'mike@gmail.com']
    ],
    "columns": ['Name', 'Email']
  }
};

export default function KeybaseProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <KeybaseContext.Provider value={[state, dispatch]}>
      {props.children}
    </KeybaseContext.Provider>
  );
}