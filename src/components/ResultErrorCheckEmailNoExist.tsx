import {Button, Result} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {replace} from "redux-first-history";
import {useLocation} from "react-router-dom";

const ResultErrorCheckEmailNoExist = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const clickHandler = () => {
        dispatch(replace(location.state.formReducer));
    };

    return (
        <Result
            status="error"
            title="Такой e-mail не зарегистрирован"
            subTitle={<>Мы не нашли в базе вашего e-mail. Попробуйте<br/> войти с другим e-mail</>}
            extra={
                <Button type="primary" key="console" data-test-id="check-retry-button"
                        onClick={clickHandler}>
                    Попробовать снова
                </Button>
            }
        />
    );
};

export default ResultErrorCheckEmailNoExist;
