import {Button, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {push} from "redux-first-history";
import {useLocation} from "react-router-dom";

const ResultErrorCheckEmail = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const clickHandler = () => {
        dispatch(push(location.state.from, {
            key: 'resend',
        }));
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
