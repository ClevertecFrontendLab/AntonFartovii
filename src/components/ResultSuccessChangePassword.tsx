import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";

const ResultSuccessChangePassword = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH, {replace: true})
    };

    return (
        <div>
            <Result
                status="success"
                title="Пароль успешно сохранён"
                subTitle="Теперь можно войти в аккаунт, используя свой логин и новый пароль"
                extra={
                    <Button type="primary" key="console" data-test-id='change-entry-button'
                            onClick={clickHandler}>
                        Вход
                    </Button>
                }
            />
        </div>
    );
};

export default ResultSuccessChangePassword;
