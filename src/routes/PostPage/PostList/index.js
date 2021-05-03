import React, { useRef } from 'react';

import useListData from './useListData';
import { PostList } from './style';
import { Card, CardTitle } from '@/components/Card/index';
import VirtualWindow from '@/components/VirtualWindow';

function Post() {
    const listRef = useRef(undefined);
    const postsArr = useListData(listRef);

    return (
        <VirtualWindow Container={PostList} height={155} ref={listRef}>
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
