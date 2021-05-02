import {
    INIT_POST,
    ADD_POST,
    ADD_POST_REQUEST,
    SUB_POST_REQUEST,
} from '@/data/actions/post';

const initState = { isFetchAll: false, data: [], request: 0 };

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_POST:
            return { ...state, isFetchAll: false, data: action.payload.data };

        case ADD_POST:
            if (action.payload.data.length === 0)
                return { ...state, isFetchAll: true };
            return { ...state, data: state.data.concat(action.payload.data) };

        case ADD_POST_REQUEST:
            return { ...state, request: state.request + 1 };

        case SUB_POST_REQUEST:
            return { ...state, request: state.request - 1 };

        default:
            return state;
    }
};

export default postReducer;
