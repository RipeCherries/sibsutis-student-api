const initialState = {
  date: null,
};

const lastUpdateReducer = (action, state = initialState) => {
  switch (action.type) {
    case 'SET_LAST_UPDATE_DATE':
      return {
        ...state,
        date: action.payload,
      };
    case 'CLEAR_LAST_UPDATE_DATE':
      return {
        ...state,
        date: null,
      };
    default:
      return state;
  }
};

export const setLastUpdate = (date) => ({
  type: 'SET_LAST_UPDATE_DATE',
  payload: date,
});

export const clearLastUpdate = () => ({
  type: 'CLEAR_LAST_UPDATE_DATE',
});

export default lastUpdateReducer;
