const initialState = {
    date: new Date()
}

const startOfSemesterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                date: action.payload
            }
        case 'CLEAR_DATE':
            return {
                ...state,
                date: new Date()
            }
        default:
            return state;
    }
};

export const setStartOfSemester = (date) => ({
    type: 'SET_DATE',
    payload: date
});

export const clearStartOfSemester = () => ({
   type: 'CLEAR_DATE'
});

export default startOfSemesterReducer;