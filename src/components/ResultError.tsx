import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";

const ResultError = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH + '/' + Paths.REGISTRATION, {
            replace: true,
            state: 'send_post'
        })
    };

    return (
        <div>
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
        </div>
    );
};

export default ResultError;
