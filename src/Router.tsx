import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store.ts';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateMain } from './hoc/PrivateMain.tsx';
import { MainLayout } from './layout/MainLayout/MainLayout.tsx';
import {
    AuthPage,
    CalendarPage,
    FeedbacksPage,
    MainPage,
    Page404,
    ProfilePage,
    ResultPage,
    SettingsPage,
} from '@pages/index.ts';
import { AuthLayout } from './layout/AuthLayout/AuthLayout.tsx';
import { Paths } from './routes/Paths.ts';
import { FormLogin } from '@components/FormLogin.tsx';
import { FormRegistration } from '@components/FormRegistration.tsx';
import { PrivateResult } from './hoc/PrivateResult.tsx';
import { ResultSuccess } from '@components/Result/ResultSuccess.tsx';
import { ResultError } from '@components/Result/ResultError.tsx';
import { ResultErrorUserExist } from '@components/Result/ResultErrorUserExist.tsx';
import { ResultErrorLogin } from '@components/Result/ResultErrorLogin.tsx';
import { ResultErrorCheckEmailNoExist } from '@components/Result/ResultErrorCheckEmailNoExist.tsx';
import { ResultErrorCheckEmail } from '@components/Result/ResultErrorCheckEmail.tsx';
import { ResultErrorChangePassword } from '@components/Result/ResultErrorChangePassword.tsx';
import { ResultSuccessChangePassword } from '@components/Result/ResultSuccessChangePassword.tsx';
import { PrivateAuth } from './hoc/PrivateAuth.tsx';
import { FlowConfirmEmail } from '@components/FlowsPassword/FlowConfirmEmail.tsx';
import { FlowChangePassword } from '@components/FlowsPassword/FlowChangePassword.tsx';
import { PrivateChangePassword } from './hoc/PrivateChangePassword.tsx';
import { FeedbackModalProvider } from './hoc/FeedbackModalProvider.tsx';

export const Router = () => (
    <HistoryRouter history={history}>
        <Routes>
            <Route
                path={Paths.MAIN}
                element={
                    <FeedbackModalProvider>
                        <PrivateMain>
                            <MainLayout />
                        </PrivateMain>
                    </FeedbackModalProvider>
                }
            >
                <Route index element={<Navigate to={Paths.MAIN_PAGE} />} />
                <Route path={Paths.CALENDAR_PAGE} element={<CalendarPage />} />
                <Route path={Paths.MAIN_PAGE} element={<MainPage />} />
                <Route path={Paths.FEEDBACKS_PAGE} element={<FeedbacksPage />} />
                <Route path={Paths.PROFILE_PAGE} element={<ProfilePage />} />
                <Route path={Paths.SETTINGS_PAGE} element={<SettingsPage />} />
            </Route>
            <Route
                element={
                    <PrivateAuth>
                        <AuthLayout />
                    </PrivateAuth>
                }
            >
                <Route
                    path={Paths.AUTH + '/' + Paths.CHANGE_PASSWORD}
                    element={
                        <PrivateChangePassword>
                            <FlowChangePassword />
                        </PrivateChangePassword>
                    }
                />
                <Route
                    path={Paths.AUTH + '/' + Paths.CONFIRM_EMAIL}
                    element={
                        <PrivateChangePassword>
                            <FlowConfirmEmail />
                        </PrivateChangePassword>
                    }
                />
                <Route path={Paths.AUTH} element={<AuthPage />}>
                    <Route index element={<FormLogin />} />
                    <Route path={Paths.REGISTRATION} element={<FormRegistration />} />
                </Route>
                <Route
                    path={Paths.RESULT}
                    element={
                        <PrivateResult>
                            <ResultPage />
                        </PrivateResult>
                    }
                >
                    <Route path={Paths.RESULT_SUCCESS} element={<ResultSuccess />} />
                    <Route path={Paths.RESULT_ERROR} element={<ResultError />} />
                    <Route
                        path={Paths.RESULT_ERROR_USER_EXIST}
                        element={<ResultErrorUserExist />}
                    />
                    <Route path={Paths.RESULT_ERROR_LOGIN} element={<ResultErrorLogin />} />
                    <Route
                        path={Paths.RESULT_ERROR_CHECK_EMAIL_NO_EXIST}
                        element={<ResultErrorCheckEmailNoExist />}
                    />
                    <Route
                        path={Paths.RESULT_ERROR_CHECK_EMAIL}
                        element={<ResultErrorCheckEmail />}
                    />
                    <Route
                        path={Paths.RESULT_ERROR_CHANGE_PASSWORD}
                        element={<ResultErrorChangePassword />}
                    />
                    <Route
                        path={Paths.RESULT_SUCCESS_CHANGE_PASSWORD}
                        element={<ResultSuccessChangePassword />}
                    />
                </Route>
            </Route>
            <Route path={Paths.PAGE_404} element={<Page404 />} />
            <Route path='*' element={<Navigate to={`/${Paths.PAGE_404}`} />} />
        </Routes>
    </HistoryRouter>
);
