import {Button, Result} from "antd";
import {Paths} from "../routes/Paths.ts";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {replace} from "redux-first-history";

const ResultSuccessChangePassword = () => {
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(replace(Paths.MAIN + Paths.AUTH));
    };

    return (
        <Result
            status="success"
            title="Пароль успешно изменён"
            subTitle="Теперь можно войти в аккаунт, используя свой логин и новый пароль"
            extra={
                <Button type="primary" key="console" data-test-id='change-entry-button'
                        onClick={clickHandler}>
                    Вход
                </Button>
            }
        />
    );
};

export default ResultSuccessChangePassword;
