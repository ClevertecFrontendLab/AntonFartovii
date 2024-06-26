import { Button, Result } from 'antd';
import { replace } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { useLocation } from 'react-router-dom';

export const ResultErrorLogin = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const clickHandler = () => {
        dispatch(replace(location.state.from));
    };

    return (
        <Result
            status='warning'
            title='Вход не выполнен'
            subTitle='Что-то пошло не так. Попробуйте еще раз'
            extra={
                <Button
                    type='primary'
                    key='console'
                    onClick={clickHandler}
                    data-test-id='login-retry-button'
                >
                    Повторить
                </Button>
            }
        />
    );
};
