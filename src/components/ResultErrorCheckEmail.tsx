import {Button, Result} from "antd";
import {Paths} from "../routes/Paths.ts";
import {useNavigate} from "react-router-dom";

const ResultErrorCheckEmail = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH, {
            replace: true, state: {key: 'resend'}
        });
    };

    return (
        <Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла ошибка, попробуйте отправить форму ещё раз."
            extra={
                <Button type="primary" key="console" data-test-id="check-back-button"
                        onClick={clickHandler}>
                    Назад
                </Button>
            }
        />
    );
};

export default ResultErrorCheckEmail;
