import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";

const ResultErrorCheckEmailNoExist = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH, {
            replace: true,
        });
    };
    return (
        <div>
            <Result
                status="error"
                title="Такой e-mail не зарегистрирован"
                subTitle="Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail."
                extra={
                    <Button type="primary" key="console" data-test-id="check-retry-button"
                            onClick={clickHandler}>
                        Попробовать снова
                    </Button>
                }
            />
        </div>
    );
};

export default ResultErrorCheckEmailNoExist;
