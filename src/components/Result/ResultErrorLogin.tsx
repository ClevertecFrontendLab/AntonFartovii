import { Button, Result } from 'antd';
import { replace } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';

export const ResultErrorLogin = () => {
    const dispatch = useAppDispatch();

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
