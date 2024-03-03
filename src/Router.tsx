import {HistoryRouter} from "redux-first-history/rr6";
import {history} from "@redux/configure-store.ts";
import {Navigate, Route, Routes} from "react-router-dom";
import PrivateMain from "./hoc/PrivateMain.tsx";
import MainLayout from "./layout/MainLayout/MainLayout.tsx";
import {MainPage} from "@pages/main-page";
import AuthLayout from "./layout/AuthLayout/AuthLayout.tsx";
import {Paths} from "./routes/Paths.ts";
import {AuthPage} from "@pages/auth-page";
import FormLogin from "@components/FormLogin.tsx";
import FormRegistration from "@components/FormRegistration.tsx";
import PrivateResult from "./hoc/PrivateResult.tsx";
import {ResultPage} from "@pages/result-page";
import ResultSuccess from "@components/Result/ResultSuccess.tsx";
import ResultError from "@components/Result/ResultError.tsx";
import ResultErrorUserExist from "@components/Result/ResultErrorUserExist.tsx";
import ResultErrorLogin from "@components/Result/ResultErrorLogin.tsx";
import ResultErrorCheckEmailNoExist from "@components/Result/ResultErrorCheckEmailNoExist.tsx";
import ResultErrorCheckEmail from "@components/Result/ResultErrorCheckEmail.tsx";
import ResultErrorChangePassword from "@components/Result/ResultErrorChangePassword.tsx";
import ResultSuccessChangePassword from "@components/Result/ResultSuccessChangePassword.tsx";
import PrivateAuth from "./hoc/PrivateAuth.tsx";
import FlowConfirmEmail from "@components/FlowsPassword/FlowConfirmEmail.tsx";
import FlowChangePassword from "@components/FlowsPassword/FlowChangePassword.tsx";
import PrivateChangePassword from "./hoc/PrivateChangePassword.tsx";
import {FeedbacksPage} from "@pages/feedbacks-page";
import FeedbackModalProvider from "./hoc/FeedbackModalProvider.tsx";

const Router = () => {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path='/' element={<PrivateMain><MainLayout/></PrivateMain>}>
                    <Route index element={<Navigate to={'main'}/>}/>
                    <Route path={'main'} element={<MainPage/>}/>
                    <Route path={Paths.FEEDBACKS} element={
                        <FeedbackModalProvider><FeedbacksPage/></FeedbackModalProvider>}/>
                </Route>
                <Route element={<PrivateAuth><AuthLayout/></PrivateAuth>}>
                    <Route path={Paths.AUTH + '/' + Paths.CHANGE_PASSWORD}
                           element={
                               <PrivateChangePassword><FlowChangePassword/></PrivateChangePassword>}/>
                    <Route path={Paths.AUTH + '/' + Paths.CONFIRM_EMAIL}
                           element={
                               <PrivateChangePassword><FlowConfirmEmail/></PrivateChangePassword>}/>
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
