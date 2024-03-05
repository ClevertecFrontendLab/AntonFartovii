import { Button, Result } from 'antd';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { replace } from 'redux-first-history';
import { useLocation } from 'react-router-dom';

export const ResultErrorUserExist = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const clickHandler = () => {
        dispatch(replace(location.state.from));
    };

    return (
        <Result
            status='error'
            title='Данные не сохранились'
            subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
            extra={
                <Button
                    type='primary'
                    key='console'
                    data-test-id='registration-back-button'
                    onClick={clickHandler}
                >
                    Назад к регистрации
                </Button>
            }
        />
    );
};
