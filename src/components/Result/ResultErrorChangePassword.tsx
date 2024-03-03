import {Button, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {replace} from "redux-first-history";
import {useLocation} from "react-router-dom";

const ResultErrorChangePassword = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const clickHandler = () => {
        dispatch(replace(location.state.from, {
            key: 'resend',
        }));
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
