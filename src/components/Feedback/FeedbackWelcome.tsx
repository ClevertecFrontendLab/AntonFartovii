import classes from "@pages/feedbacks-page/feedbacks.module.less";
import {Button, Typography} from "antd";

const FeedbackWelcome = () => {
    return (
        <div className={classes["welcome-container"]}>
            <div className={classes["welcome-card"]}>
                <Typography.Title level={4} className={classes["welcome-title"]}>Оставьте
                    свой отзыв первым</Typography.Title>
                <Typography.Text className={classes["welcome-text"]}>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                    Поделитесь&nbsp;своим мнением и опытом&nbsp;с другими пользователями, и
                    помогите
                    им сделать правильный выбор.
                </Typography.Text>
            </div>
            <Button type="primary" className={classes["btn-add-feedback"]}
                    data-test-id="write-review" onClick={() => setModal(true)}>Написать
                отзав</Button>
        </div>
    );
};

export default FeedbackWelcome;
