import {Button, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {replace} from "redux-first-history";
import {useLocation} from "react-router-dom";

const ResultError = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const clickHandler = () => {
        dispatch(replace(location.state.from, {
            key: 'resend',
        }));
    };

    return (
        <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз."
            extra={
                <Button type="primary" key="console" data-test-id="registration-retry-button"
                        onClick={clickHandler}>
                    Повторить
                </Button>
            }
        />
    );
};

export default ResultError;
