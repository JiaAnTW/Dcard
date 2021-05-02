import {
    INIT_POST,
    ADD_POST,
    ADD_POST_REQUEST,
    SUB_POST_REQUEST,
} from '@/data/actions/post';

export const fetchPost = (lastId) => {
    const params = lastId ? `&before=${lastId}` : '';
    return (dispatch) => {
        dispatch({ type: ADD_POST_REQUEST });
        fetch(`/dcard/v2/posts?popular=true${params}`, { mode: 'no-cors' })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: lastId ? ADD_POST : INIT_POST,
                    payload: { data: data },
                });

                dispatch({ type: SUB_POST_REQUEST });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};
