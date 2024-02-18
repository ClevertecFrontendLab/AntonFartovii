import {Button, Result} from "antd";

const ResultSuccessChangePassword = () => {
    return (
        <div>
            <Result
                status="error"
                title=""
                subTitle=""
                extra={
                    <Button type="primary" key="console" data-test-id='change-entry-button'>
                        Назад к регистрации
                    </Button>
                }
            />
        </div>
    );
};

export default ResultSuccessChangePassword;
