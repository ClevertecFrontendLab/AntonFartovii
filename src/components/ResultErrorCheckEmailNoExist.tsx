import {Button, Result} from "antd";

const ResultErrorCheckEmailNoExist = () => {
    return (
        <div>
            <Result
                status="error"
                title=""
                subTitle=""
                extra={
                    <Button type="primary" key="console" data-test-id="check-retry-button">
                        Назад к регистрации
                    </Button>
                }
            />
        </div>
    );
};

export default ResultErrorCheckEmailNoExist;
