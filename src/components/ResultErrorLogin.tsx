import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";


const ResultErrorLogin = () => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH, {replace: true})
    };

    return (
        <Result
            status="warning"
            title="Вход не выполнен"
            subTitle="Что-то пошло не так. Попробуйте еще раз"
            extra={
                <Button type="primary" key="console" onClick={clickHandler}
                        data-test-id="login-retry-button">
                    Повторить
                </Button>
            }
        />
    );
};

export default ResultErrorLogin;
