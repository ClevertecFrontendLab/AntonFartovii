export enum Paths {
    MAIN = '/',
    MAIN_PAGE = 'main',
    CALENDAR_PAGE = 'calendar',
    PROFILE_PAGE = 'profile',
    SETTINGS_PAGE = 'settings',
    AUTH = 'auth',
    PAGE_404 = '404',
    FEEDBACKS_PAGE = 'feedbacks',
    REGISTRATION = 'registration',
    CHANGE_PASSWORD = 'change-password',
    FORGOT_PASSWORD = 'forgot-password',
    CONFIRM_EMAIL = 'confirm-email',
    RESULT = 'result',
    RESULT_SUCCESS = 'success',
    RESULT_ERROR = 'error',
    RESULT_ERROR_USER_EXIST = 'error-user-exist',
    RESULT_ERROR_LOGIN = 'error-login',
    RESULT_ERROR_CHECK_EMAIL_NO_EXIST = 'error-check-email-no-exist',
    RESULT_ERROR_CHECK_EMAIL = 'error-check-email',
    RESULT_ERROR_CHANGE_PASSWORD = 'error-change-password',
    RESULT_SUCCESS_CHANGE_PASSWORD = 'success-change-password',
}

export enum PathsFull {
    CONFIRM_EMAIL = Paths.MAIN + Paths.AUTH + '/' + Paths.CONFIRM_EMAIL,
    RESULT_ERROR = Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_ERROR,
    RESULT_ERROR_LOGIN = Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_ERROR_LOGIN,
    RESULT_ERROR_USER_EXIST = Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_ERROR_USER_EXIST,
    RESULT_ERROR_CHECK_EMAIL = Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_ERROR_CHECK_EMAIL,
    RESULT_ERROR_CHANGE_PASSWORD = Paths.MAIN +
        Paths.RESULT +
        '/' +
        Paths.RESULT_ERROR_CHANGE_PASSWORD,
    RESULT_ERROR_CHECK_EMAIL_NO_EXIST = Paths.MAIN +
        Paths.RESULT +
        '/' +
        Paths.RESULT_ERROR_CHECK_EMAIL_NO_EXIST,
    FORGOT_PASSWORD = Paths.MAIN + Paths.RESULT + '/' + Paths.FORGOT_PASSWORD,
    RESULT_SUCCESS = Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_SUCCESS,
    RESULT_SUCCESS_CHANGE_PASSWORD = Paths.MAIN +
        Paths.RESULT +
        '/' +
        Paths.RESULT_SUCCESS_CHANGE_PASSWORD,
}

export const PathNames: { [key: string]: string } = {
    [Paths.MAIN_PAGE]: 'Главная',
    [Paths.FEEDBACKS_PAGE]: 'Отзывы пользователей',
    [Paths.CALENDAR_PAGE]: 'Календарь',
    [Paths.PROFILE_PAGE]: 'Профиль',
    [Paths.SETTINGS_PAGE]: 'Настройки',
};
