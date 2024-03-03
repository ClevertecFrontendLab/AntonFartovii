import {useFeedbackModal} from "@hooks/useFeedbackModal.ts";
import FeedbackModalProvider from "../../hoc/FeedbackModalProvider.tsx";
import {useWindowSize} from "@uidotdev/usehooks";
import {Button, Modal, Result} from "antd";
import {push} from "redux-first-history";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";

const FeedbackModalError500 = () => {
    const feedbackModal = useFeedbackModal() as FeedbackModalProvider;
    const size = useWindowSize();
    const dispatch = useAppDispatch();

    return (
        <Modal
            width={size.width! > 800 ? 539 : 328}
            wrapClassName="main-wrapper-blur"
            maskStyle={{background: "unset"}}
            centered
            closable={false}
            open={feedbackModal.modalError500}
            okButtonProps={{hidden: true}}
            cancelButtonProps={{hidden: true}}
        >
            <Result
                status="500"
                title="Что-то пошло не так"
                subTitle="Произошла ошибка, попробуйте ещё раз."
                extra={
                    <Button type="primary" onClick={() => dispatch(push('/main'))}>
                        Назад
                    </Button>
                }/>
        </Modal>
    );
};

export default FeedbackModalError500;
