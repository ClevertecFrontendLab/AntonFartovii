import {Button, Modal, Result} from "antd";
import classes from "@pages/feedbacks-page/feedbacks.module.less";
import {useFeedbackModal} from "@hooks/useFeedbackModal.ts";
import FeedbackModalProvider from "../hoc/FeedbackModalProvider.tsx";
import {useWindowSize} from "@uidotdev/usehooks";

const FeedbackModalError = () => {
    const feedbackModal = useFeedbackModal() as FeedbackModalProvider;
    const size = useWindowSize();

    return (
        <Modal
            centered
            width={size.width! > 800 ? 539 : "auto"}
            maskStyle={{background: "unset"}}
            okButtonProps={{hidden: true}}
            cancelButtonProps={{hidden: true}}
            open={feedbackModal.modalError}
            wrapClassName="main-wrapper-blur"
        >
            <Result
                status="error"
                title="Данные не сохранились"
                subTitle="Что-то пошло не так. Попробуйте еще раз"
                extra={
                    [<Button type="primary"
                             onClick={() => feedbackModal.setModalSuccess(false)}>
                        Написать отзыв
                    </Button>,
                        <Button className={classes["btn-close-error"]}
                                onClick={() => feedbackModal.setModalError(false)}
                                data-test-id="write-review-not-saved-modal">
                            Закрыть
                        </Button>]
                }
            />
        </Modal>
    );
};

export default FeedbackModalError;
