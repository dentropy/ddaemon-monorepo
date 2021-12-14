// Provider.js
import { createContext, useReducer } from 'react';
import DiscordReducer from './DiscordReducer';

export const DiscordContext = createContext();

const initialState = {
  "discord_guild_list": [{ label: 'getting teams' }],
  "discord_guild_selected": "dentropydaemon",
  "discord_user_select" :"dentropy",
  "discord_data_viz_controls":"MOST_PER_GRAPH_BAR",
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
  "list_select":"ListTopicsUserHasPostedIn",
  "list_rendered": {
    "data":[
      ['John', 'john@example.com'],
      ['Mike', 'mike@gmail.com']
    ],
    "columns": ['Name', 'Email']
  }
};

export default function DiscordProvider(props) {
  const [state, dispatch] = useReducer(DiscordReducer, initialState);
  return (
    <DiscordContext.Provider value={[state, dispatch]}>
      {props.children}
    </DiscordContext.Provider>
  );
}