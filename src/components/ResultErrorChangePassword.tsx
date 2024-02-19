import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";

const ResultErrorChangePassword = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH + '/' + Paths.CHANGE_PASSWORD, {
            replace: true,
            state: {key: 'resend'}
        })
    };

    return (
        <div>
            <Result
                status="error"
                title="Данные не сохранились"
                subTitle="Что-то пошло не так. Попробуйте ещё раз"
                extra={
                    <Button type="primary" key="console" data-test-id='change-retry-button'
                            onClick={clickHandler}>
                        Повторить
                    </Button>
                }
            />
        </div>
    );
};

export default ResultErrorChangePassword;
