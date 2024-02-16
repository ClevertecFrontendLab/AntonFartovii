import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import {history, store} from '@redux/configure-store';
import {AuthPage, MainPage, ResultPage} from './pages';

import 'normalize.css';
import './index.css';
import Layout from "./layout/MainLayout/Layout.tsx";
import 'antd/lib/style/index.css';
import 'antd/dist/antd.css';
import {Paths} from "./routes/Paths.ts";
import FormLogin from "@components/FormLogin.tsx";
import FormRegistration from "@components/FormRegistration.tsx";
import AuthLayout from "./layout/AuthLayout/AuthLayout.tsx";
import ResultSuccess from "@components/ResultSuccess.tsx";
import ResultErrorUserExist from "@components/ResultErrorUserExist.tsx";
import ResultErrorLogin from "@components/ResultErrorLogin.tsx";
import ResultErrorCheckEmailNoExist from "@components/ResultErrorCheckEmailNoExist.tsx";
import ResultErrorCheckEmail from "@components/ResultErrorCheckEmail.tsx";
import ResultErrorChangePassword from "@components/ResultErrorChangePassword.tsx";
import ResultSuccessChangePassword from "@components/ResultSuccessChangePassword.tsx";
import ResultError from "@components/ResultError.tsx";
import PrivateResult from "./hoc/PrivateResult.tsx";
import {HistoryRouter} from "redux-first-history/rr6";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<MainPage/>}/>
                    </Route>
                    <Route element={<AuthLayout/>}>
                        <Route path={Paths.AUTH} element={<AuthPage/>}>
                            <Route index element={<FormLogin/>}/>
                            <Route path={Paths.REGISTRATION} element={<FormRegistration/>}/>
                        </Route>
                        <Route path={Paths.RESULT}
                               element={<PrivateResult><ResultPage/></PrivateResult>}>
                            <Route path={Paths.RESULT_SUCCESS} element={<ResultSuccess/>}/>
                            <Route path={Paths.RESULT_ERROR} element={<ResultError/>}/>
                            <Route path={Paths.RESULT_ERROR_USER_EXIST}
                                   element={<ResultErrorUserExist/>}/>
                            <Route path={Paths.RESULT_ERROR_LOGIN} element={<ResultErrorLogin/>}/>
                            <Route path={Paths.RESULT_ERROR_CHECK_EMAIL_NO_EXIST}
                                   element={<ResultErrorCheckEmailNoExist/>}/>
                            <Route path={Paths.RESULT_ERROR_CHECK_EMAIL}
                                   element={<ResultErrorCheckEmail/>}/>
                            <Route path={Paths.RESULT_ERROR_CHANGE_PASSWORD}
                                   element={<ResultErrorChangePassword/>}/>
                            <Route path={Paths.RESULT_SUCCESS_CHANGE_PASSWORD}
                                   element={<ResultSuccessChangePassword/>}/>
                        </Route>
                    </Route>
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
