import { useCallback } from 'react';

import usePost from '@/data/utils/usePost';
import useScrollBottomEffect from '@/utils/useScrollBottomEffect';

function useListData(ref) {
    const { postsArr, setFetchSignal } = usePost();

    const handleFetchData = useCallback(() => {
        setFetchSignal(true);
    }, [postsArr]);

    useScrollBottomEffect(handleFetchData, ref);

    return postsArr;
}

export default useListData;
