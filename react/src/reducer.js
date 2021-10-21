// reducer.js
export default function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + action.payload };
    case 'DECREMENT':
      return { ...state, count: state.count - action.payload };
    case 'MOST':
      return { ...state, most: action.payload };
    case 'PER':
      return { ...state, per: action.payload };
    case 'TEAMS_UPDATE':
      // var tmpTeam = state.team;
      // tmpTeam.list = action.payload;
      return {
        count: state.count,
        most: state.most,
        per: action.payload,
        team: action.payload
      };
    case 'TEAM_SELECT':
      // var tmpTeam = state.team;
      // tmpTeam.selected = action.payload;
      return {
        count: state.count,
        most: state.most,
        per: action.payload,
        team: action.payload
      };
    default:
      throw new Error();
  }
}