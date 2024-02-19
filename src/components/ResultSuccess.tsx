import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";

const ResultSuccess = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH, {replace: true})
    };

    return (
        <div>
            <Result
                status="success"
                title="Регистрация успешна"
                subTitle="Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль."
                extra={
                    <Button type="primary" key="console" data-test-id="registration-enter-button"
                            onClick={clickHandler}>
                        Войти
                    </Button>
                }
            />
        </div>
    );
};

export default ResultSuccess;
