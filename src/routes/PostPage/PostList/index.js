import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useListData from './useListData';
import { PostList } from './style';
import { Card, CardTitle } from '@/components/Card/index';
import VirtualWindow from '@/components/VirtualWindow';

function Post() {
    const listRef = useRef(undefined);
    const postsArr = useListData(listRef);

    useEffect(() => {
        if (listRef.current) listRef.current.scrollTop = 0;
    }, [listRef]);

    return (
        <VirtualWindow Container={PostList} ref={listRef}>
            {postsArr.map(({ id, title, excerpt }) => (
                <Card key={id}>
                    <CardTitle>{title}</CardTitle>
                    {excerpt}
                </Card>
            ))}
        </VirtualWindow>
    );
}

export default Post;
