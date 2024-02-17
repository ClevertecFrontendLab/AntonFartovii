import {HistoryRouter} from "redux-first-history/rr6";
import {history} from "@redux/configure-store.ts";
import {Route, Routes} from "react-router-dom";
import PrivateMain from "./hoc/PrivateMain.tsx";
import Layout from "./layout/MainLayout/Layout.tsx";
import {MainPage} from "@pages/main-page";
import AuthLayout from "./layout/AuthLayout/AuthLayout.tsx";
import {Paths} from "./routes/Paths.ts";
import {AuthPage} from "@pages/auth-page";
import FormLogin from "@components/FormLogin.tsx";
import FormRegistration from "@components/FormRegistration.tsx";
import PrivateResult from "./hoc/PrivateResult.tsx";
import {ResultPage} from "@pages/result-page";
import ResultSuccess from "@components/ResultSuccess.tsx";
import ResultError from "@components/ResultError.tsx";
import ResultErrorUserExist from "@components/ResultErrorUserExist.tsx";
import ResultErrorLogin from "@components/ResultErrorLogin.tsx";
import ResultErrorCheckEmailNoExist from "@components/ResultErrorCheckEmailNoExist.tsx";
import ResultErrorCheckEmail from "@components/ResultErrorCheckEmail.tsx";
import ResultErrorChangePassword from "@components/ResultErrorChangePassword.tsx";
import ResultSuccessChangePassword from "@components/ResultSuccessChangePassword.tsx";
import PrivateAuth from "./hoc/PrivateAuth.tsx";

const Router = () => {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path='/' element={<PrivateMain><Layout/></PrivateMain>}>
                    <Route index element={<MainPage/>}/>
                </Route>
                <Route element={<PrivateAuth><AuthLayout/></PrivateAuth>}>
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
                        <Route path={Paths.RESULT_ERROR_LOGIN}
                               element={<ResultErrorLogin/>}/>
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
    );
};

export default Router;
