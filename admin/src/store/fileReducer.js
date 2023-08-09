const initialState = {
    uploadedFile: null
}

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_UPLOADED_FILE':
            return {
                ...state,
                uploadedFile: action.payload
            };
        case 'CLEAR_UPLOADED_FILE':
            return {
                ...state,
                uploadedFile: null
            };
        default:
            return state;
    }
};

export const setUploadedFile = (file) => ({
    type: 'SET_UPLOADED_FILE',
    payload: file
});

export const clearUploadedFile = () => ({
    type: 'CLEAR_UPLOADED_FILE'
})

export default fileReducer;