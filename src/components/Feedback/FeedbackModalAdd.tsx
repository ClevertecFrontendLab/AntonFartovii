import {ButtonProps, Form, Input, Modal, Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {useWindowSize} from "@uidotdev/usehooks";
import {useFeedbackModal} from "@hooks/useFeedbackModal.ts";
import FeedbackModalProvider from "../../hoc/FeedbackModalProvider.tsx";
import {useCreateFeedbackMutation} from "@redux/api/feedbacksApi.ts";
import {useEffect, useState} from "react";

const FeedbackModalAdd = () => {
    const feedbackModal = useFeedbackModal() as FeedbackModalProvider;
    const size = useWindowSize();
    const [createFeedback, createFeedbackEvents] = useCreateFeedbackMutation();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const writeFeedbackHandler = async () => {
        await createFeedback(form.getFieldsValue(['rating', 'message']));
        form.resetFields();
        setIsDisabled(true);
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

    const onChange = () => {
        if (form.getFieldValue('rating') > 0 || form.getFieldValue('message').length > 0) {
            setIsDisabled(false);
        }
    }

    return (
        <Modal
            width={size.width! > 800 ? 539 : 328}
            wrapClassName="add-feedback-blur"
            maskStyle={{background: "unset"}}
            title="Выш отзыв"
            centered={true}
            open={feedbackModal.modalAdd}
            onOk={() => writeFeedbackHandler()}
            onCancel={() => feedbackModal.setModalAdd(false)}
            cancelButtonProps={{hidden: true}}
            okText="Опубликовать"
            okButtonProps={{
                "disabled": isDisabled,
                "data-test-id": "new-review-submit-button"
            } as ButtonProps}
            bodyStyle={size.width! > 800 ? {
                display: "block",
                padding: "24px"
            } : {display: "block", padding: "16px"}}
        >
            <Form form={form} onValuesChange={onChange}>
                <Form.Item noStyle name="rating">
                    <Rate character={({value, index}) => {
                        return value && index! < value ? <StarFilled/> :
                            <StarOutlined/>
                    }}
                    />
                </Form.Item>
                <Form.Item noStyle name="message">
                    <Input.TextArea autoSize={true}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default FeedbackModalAdd;
