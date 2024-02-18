import {Button, Result} from "antd";
import {Paths} from "../routes/Paths.ts";

const ResultErrorCheckEmail = () => {
    const clickHandler = () => {
        navigate(Paths.MAIN + Paths.AUTH, {
            replace: true,
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
