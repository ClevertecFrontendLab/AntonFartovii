import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

import {store} from '@redux/configure-store';

import 'normalize.css';
import './index.css';
import 'antd/lib/style/index.css';
import 'antd/dist/antd.css';
import App from "./App.tsx";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
);
