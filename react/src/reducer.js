// reducer.js
export default function reducer(state, action) {
  let tmp_metadata = 1;
  switch (action.type) {
    case 'DASHBOARD_SELECT':
      return { ...state, dashboard_select: action.payload };
    case 'INCREMENT':
      return { ...state, count: state.count + action.payload };
    case 'DECREMENT':
      return { ...state, count: state.count - action.payload };
    case 'GRAPH_CONTROLS':
      return { ...state, graph_controls: action.payload };
    case 'GRAPH_RENDERED':
      return { ...state, graph_rendered: action.payload };
    // keybase
    // case 'GRAPH_METADATA':
    //   return { ...state, graph_metadata: action.payload };
    case 'MOST':
      tmp_metadata = state.graph_metadata;
      tmp_metadata.most = action.payload;
      return { ...state, graph_metadata: tmp_metadata };
      return { ...state, most: action.payload };
    case 'PER':
      tmp_metadata = state.graph_metadata;
      tmp_metadata.per = action.payload;
      return { ...state, graph_metadata: tmp_metadata };
      return { ...state, per: action.payload };
    case 'TEAMS_UPDATE':
      tmp_metadata = state.graph_metadata;
      tmp_metadata.team_list = action.payload;
      return { ...state, graph_metadata: tmp_metadata };
      return { ...state, team_list: action.payload };
    case 'TEAM_SELECT':
      tmp_metadata = state.graph_metadata;
      tmp_metadata.team_selected = action.payload;
      return { ...state, graph_metadata: tmp_metadata };
      return { ...state, team_selected: action.payload };
    case 'KEYBASE_USER_SELECT':
      return { ...state, keybase_user_select: action.payload } 
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