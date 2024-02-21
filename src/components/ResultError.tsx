import {Button, Result} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";

const ResultError = () => {
    const navigate = useNavigate();
    const {state: {body}} = useLocation();

    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH + '/' + Paths.REGISTRATION, {
            replace: true,
            state: {key: 'resend', body}
        })
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
