import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";

const ResultErrorUserExist = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH + '/' + Paths.REGISTRATION, {replace: true})
    };

    return (
        <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail."
            extra={
                <Button type="primary" key="console" data-test-id="registration-back-button"
                        onClick={clickHandler}>
                    Назад к регистрации
                </Button>
            }
        />
    );
};

export default ResultErrorUserExist;
