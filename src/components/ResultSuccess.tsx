import {Button, Result} from "antd";
import {Paths} from "../routes/Paths.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {push} from "redux-first-history";

const ResultSuccess = () => {
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(push(Paths.MAIN + Paths.AUTH));
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
