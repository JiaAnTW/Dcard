import { INIT_POST, ADD_POST } from '@/data/actions/post';

const initState = { isFetchAll: false, data: [] };

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_POST:
            return { ...state, isFetchAll: false, data: action.payload.data };

        case ADD_POST:
            if (action.payload.data.length === 0)
                return { ...state, isFetchAll: true };
            return { ...state, data: state.data.concat(action.payload.data) };

        default:
            return state;
    }
};

export default postReducer;
