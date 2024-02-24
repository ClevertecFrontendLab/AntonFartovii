import {Button, Result} from "antd";
import {Paths} from "../routes/Paths.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {replace} from "redux-first-history";

const ResultSuccess = () => {
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(replace(Paths.MAIN + Paths.AUTH));
    };

    return (
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
    );
};

export default ResultSuccess;
