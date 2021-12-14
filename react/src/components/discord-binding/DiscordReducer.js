// reducer.js
export default function DiscordReducer(state, action) {
    switch (action.type) {
      case 'DASHBOARD_SELECT':
        return { ...state, discord_dashboard_select: action.payload };
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