import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter, Route, Routes} from 'react-router-dom';

import {store} from '@redux/configure-store';
import {MainPage} from './pages';

import 'normalize.css';
import './index.css';
import Layout from "./layout/Layout.tsx";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Layout>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                    </Routes>
                </Layout>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
);
