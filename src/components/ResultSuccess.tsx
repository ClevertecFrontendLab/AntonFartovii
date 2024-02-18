import {Button, Result} from "antd";

const ResultSuccess = () => {
    return (
        <div>
            <Result
                status="success"
                title="Регистрация успешна"
                subTitle="Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль."
                extra={
                    <Button type="primary" key="console" data-test-id="registration-enter-button">
                        Войти
                    </Button>
                }
            />
        </div>
    );
};

export default ResultSuccess;
