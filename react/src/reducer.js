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
      return { ...state, team_list: action.payload };
    case 'TEAM_SELECT':
      return { ...state, team_selected: action.payload };
    default:
      throw new Error();
  }
}