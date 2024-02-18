import {Button, Result} from "antd";

const ResultErrorChangePassword = () => {
    return (
        <div>
            <Result
                status="error"
                title=""
                subTitle=""
                extra={
                    <Button type="primary" key="console" data-test-id='change-retry-button'>
                        Назад к регистрации
                    </Button>
                }
            />
        </div>
    );
};

export default ResultErrorChangePassword;
