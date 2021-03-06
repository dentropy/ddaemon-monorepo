// Provider.js
import { createContext, useReducer } from 'react';
import reducer from './KeybaseReducer';

export const KeybaseContext = createContext();

const initialState = {
  "team_list": [{
      "name": "sourcecred",
      "user_id": "453243919774253079"
  }],
  "team_selected": "dentropydaemon",
  "keybase_most":"text",
  "keybase_per" :"msg.sender.username",
  "keybase_user_select" :"dentropy",
  "data_viz_controls":"MOST_PER_GRAPH_BAR",
  "graph_metadata":{
    "most":"text",
    "per":"msg.sender.username",
    "topic_selected": "platforms",
    "topic_list":["dentropydaemon"],
    "user_selected": "dentropy",
    "user_list":["dentropy"],
    "team_selected": "dentropydaemon",
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