// Provider.js
import { createContext, useReducer } from 'react';
import DiscordReducer from './DiscordReducer';

export const DiscordContext = createContext();

const initialState = {
  "discord_guild_list": {"sourcecred":{"id":"Gotta get that for you"}},
  "discord_guild_selected": "sourcecred",
  "discord_channel_list": {"general":{id:"Gotta get that for you"}},
  "discord_channel_selected":"general",
  "discord_user_list": {"mark":{id:"Gotta get that for you"}},
  "discord_user_selected":"mark",
  "discord_data_viz_controls":"ACTIVITY_PER_TIME",
  "graph_metadata":{
    "most":"text",
    "per":"msg.sender.username",
    "topic_selected": "platforms",
    "topic_list":["sourcecred"],
    "user_selected": "dentropy",
    "user_list":["dentropy"],
    "team_selected": "sourcecred",
    "team_list": [{ label: 'sourcecred' }]
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