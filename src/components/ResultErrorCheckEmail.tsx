import {Button, Result} from "antd";

const ResultErrorCheckEmail = () => {
    return (
        <Result
            status="error"
            title=""
            subTitle=""
            extra={
                <Button type="primary" key="console" data-test-id="check-back-button">
                    Назад к регистрации
                </Button>
            }
        />
    );
};

export default ResultErrorCheckEmail;
