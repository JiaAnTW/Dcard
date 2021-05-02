import React from 'react';
import { Provider } from 'react-redux';

import store from './data/store';
import GlobalStyle from '@/theme';
import Router from './routes/Router';

function App() {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <Router />
        </Provider>
    );
}

export default App;
