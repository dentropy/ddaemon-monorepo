// reducer.js
export default function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.payload,
        most: state.most,
        per: state.per
      };
    case 'DECREMENT':
      return {
        count: state.count - action.payload,
        most: state.most,
        per: state.per
      };
    case 'MOST':
      return {
        count: state.count,
        most: action.payload,
        per: state.per
      };
    case 'PER':
      return {
        count: state.count,
        most: state.most,
        per: action.payload
      };
    default:
      throw new Error();
  }
}