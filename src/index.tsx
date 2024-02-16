import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {store} from '@redux/configure-store';
import {AuthPage, MainPage} from './pages';

import 'normalize.css';
import './index.css';
import Layout from "./layout/Layout.tsx";
import 'antd/lib/style/index.css';
import 'antd/dist/antd.css';
import {Paths} from "./routes/Paths.ts";
import FormLogin from "@components/FormLogin.tsx";
import FormRegistration from "@components/FormRegistration.tsx";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<MainPage/>}/>
                    </Route>
                    <Route path={Paths.AUTH} element={<AuthPage/>}>
                        <Route index element={<FormLogin/>}/>
                        <Route path={Paths.REGISTRATION} element={<FormRegistration/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
