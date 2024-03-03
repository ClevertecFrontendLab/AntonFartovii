import {ButtonProps, Input, Modal, Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {useWindowSize} from "@uidotdev/usehooks";
import {useFeedbackModal} from "@hooks/useFeedbackModal.ts";
import FeedbackModalProvider from "../../hoc/FeedbackModalProvider.tsx";
import {useCreateFeedbackMutation} from "@redux/api/feedbacksApi.ts";
import {FormEvent, useEffect, useState} from "react";

const FeedbackModalAdd = () => {
    const feedbackModal = useFeedbackModal() as FeedbackModalProvider;
    const size = useWindowSize();
    const [createFeedback, createFeedbackEvents] = useCreateFeedbackMutation();

    const [message, setMessage] = useState<string>();
    const [rating, setRating] = useState<number>(1);

    const writeFeedbackHandler = async () => {
        await createFeedback({
            message,
            rating,
        })
    };

    const textareaHandler = (e: FormEvent<HTMLTextAreaElement>) => {
        setMessage((e.target as HTMLTextAreaElement).value);
    };

    useEffect(() => {
        if (createFeedbackEvents.isError) {
            feedbackModal.setModalAdd(false)
            feedbackModal.setModalError(true);
        }
    }, [createFeedbackEvents.isError]);

    useEffect(() => {
        if (createFeedbackEvents.isSuccess) {
            feedbackModal.setModalAdd(false)
            feedbackModal.setModalSuccess(createFeedbackEvents.isSuccess);
        }
    }, [createFeedbackEvents.isSuccess]);

    return (
        <Modal
            width={size.width! > 800 ? 539 : 328}
            wrapClassName="add-feedback-blur"
            maskStyle={{background: "unset"}}
            title="Выш отзыв"
            centered
            open={feedbackModal.modalAdd}
            onOk={() => writeFeedbackHandler()}
            onCancel={() => feedbackModal.setModalAdd(false)}
            cancelButtonProps={{hidden: true}}
            okText="Опубликовать"
            okButtonProps={{"data-test-id": "new-review-submit-button"} as ButtonProps}
            bodyStyle={size.width! > 800 ? {
                display: "block",
                padding: "24px"
            } : {display: "block", padding: "16px"}}
        >
            <Rate value={rating} character={({value, index}) => {
                return value && index! < value ? <StarFilled/> :
                    <StarOutlined/>
            }} onChange={setRating}
            />
            <Input.TextArea onInput={(e) => textareaHandler(e)}/>
        </Modal>
    );
};

export default FeedbackModalAdd;
