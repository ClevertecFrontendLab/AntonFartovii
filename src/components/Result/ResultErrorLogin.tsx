import { Button, Result } from 'antd';
import { useLocation } from 'react-router-dom';
import { replace } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';

export const ResultErrorLogin = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    console.log(location);
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
