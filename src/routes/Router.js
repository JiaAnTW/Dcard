import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

// Page Component
import PostPage from './PostPage';

function Router() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" component={PostPage} />
            </Switch>
        </HashRouter>
    );
}

export default Router;
