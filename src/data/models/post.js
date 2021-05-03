import { INIT_POST, ADD_POST } from '@/data/actions/post';

export const fetchPost = (lastId) => {
    const params = lastId ? `&before=${lastId}` : '';
    return (dispatch) => {
        fetch(`/dcard/v2/posts?popular=true${params}`, { mode: 'no-cors' })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: lastId ? ADD_POST : INIT_POST,
                    payload: { data: data },
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};
