import React from 'react';

import PostList from './PostList';
import { PostLayout } from './style';

function Post() {
    return (
        <PostLayout>
            <PostList />
        </PostLayout>
    );
}

export default Post;
