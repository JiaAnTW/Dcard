import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPost } from '@/data/models/post';
import { postSelector } from '@/data/selectors/post';

function usePost() {
    // mutex lock的功能
    const [fetchSignal, setFetchSignal] = useState(false);

    const dispatch = useDispatch();
    const postsArr = useSelector(postSelector);

    // 換城市的時候一定要重新抓
    useEffect(() => {
        dispatch(fetchPost());
    }, []);

    useEffect(() => {
        // 避免重複 or 抓到底後沒用的fetch
        if (fetchSignal) {
            dispatch(fetchPost(postsArr[postsArr.length - 1].id));
        }
    }, [fetchSignal]);

    // 當fetch結束後要還原lock
    useEffect(() => {
        setFetchSignal(false);
    }, [postsArr]);

    return {
        postsArr,
        setFetchSignal,
    };
}

export default usePost;
