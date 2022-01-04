// reducer.js
export default function DiscordReducer(state, action) {
    switch (action.type) {
      case 'DASHBOARD_SELECT':
        return { ...state, discord_dashboard_select: action.payload };
      case 'DISCORD_GUILD_SELECTED':
        return { ...state, discord_guild_selected: action.payload };
      case 'DISCORD_GUILD_LIST':
        return { ...state, discord_guild_list: action.payload };
      case 'DISCORD_CHANNEL_SELECTED':
        return { ...state, discord_channel_selected: action.payload };
      case 'DISCORD_CHANNEL_LIST':
        return { ...state, discord_channel_list: action.payload };
      case 'DISCORD_USER_SELECTED':
        return { ...state, discord_user_selected: action.payload };
      case 'DISCORD_USER_LIST':
        return { ...state, discord_user_list: action.payload };
      case 'DATA_VIZ_SELECT':
        return { ...state, discord_data_viz_controls: action.payload };
      case 'DISCORD_RENDER_VIZ':
        return { ...state, discord_render_viz: action.payload };
      case 'DISCORD_CHANNEL_SELECTED_ID':
        return { ...state, discord_channel_id: action.payload };
      case 'DISCORD_USER_SELECTED_ID':
        return { ...state, discord_user_id: action.payload };
      case 'DISCORD_GUILD_SELECTED_ID':
        return { ...state, discord_guild_id: action.payload };
      case 'DISCORD_CHANNEL_LIST_ID':
        return { ...state, discord_channel_list_id: action.payload };
      case 'DISCORD_USER_LIST_ID':
        return { ...state, discord_user_list_id: action.payload };
      case 'DISCORD_GUILD_LIST_ID':
        return { ...state, discord_guild_list_id: action.payload };
      default:
        throw new Error();
    }
  }
  
  /*
  
      case 'MOST':
        var tmp_metadata = state.graph_metadata;
        tmp_metadata.most = action.payload
        return { ...state, graph_metadata: tmp_metadata };
      case 'PER':
        var tmp_metadata = state.graph_metadata;
        tmp_metadata.per = action.payload
        return { ...state, graph_metadata: tmp_metadata };
      case 'TEAMS_UPDATE':
        var tmp_metadata = state.graph_metadata;
        tmp_metadata.team_list = action.payload
        return { ...state, graph_metadata: tmp_metadata };
      case 'TEAM_SELECT':
        console.log("TEAM_SELECT")
        console.log(action.payload)
        var tmp_metadata = state.graph_metadata;
        tmp_metadata.team_selected = action.payload
        return { ...state, graph_metadata: tmp_metadata };
      case 'KEYBASE_USER_SELECT':
        return { ...state, keybase_user_select: action.payload } 
  
  */