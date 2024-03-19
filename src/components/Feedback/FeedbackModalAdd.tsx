import { ButtonProps, Form, Input, Modal, Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useWindowSize } from '@uidotdev/usehooks';
import { useFeedbackModal } from '@hooks/useFeedbackModal.ts';
import { useCreateFeedbackMutation } from '@redux/api/feedbacksApi.ts';
import { useEffect } from 'react';
import { FeedbackModalProviderProps } from '../../hoc/FeedbackModalProvider.tsx';

export const FeedbackModalAdd = () => {
    const feedbackModal = useFeedbackModal() as FeedbackModalProviderProps;
    const size = useWindowSize();
    const [createFeedback, createFeedbackEvents] = useCreateFeedbackMutation();
    const [form] = Form.useForm();

    const writeFeedbackHandler = async () => {
        await createFeedback(form.getFieldsValue(['rating', 'message']));
        form.resetFields();
    };

    useEffect(() => {
        if (createFeedbackEvents.isError) {
            feedbackModal.setModalAdd(false);
            feedbackModal.setModalError(true);
            createFeedbackEvents.reset();
        }
    }, [createFeedbackEvents, createFeedbackEvents.isError, feedbackModal]);

    useEffect(() => {
        if (createFeedbackEvents.isSuccess) {
            feedbackModal.setModalAdd(false);
            feedbackModal.setModalSuccess(createFeedbackEvents.isSuccess);
        }
    }, [createFeedbackEvents.isSuccess, feedbackModal]);

    return (
        <Modal
            width={size.width && size.width > 800 ? 539 : 328}
            wrapClassName='add-feedback-blur'
            maskStyle={{ background: 'unset' }}
            title='Выш отзыв'
            centered={true}
            open={feedbackModal.modalAdd}
            onOk={() => writeFeedbackHandler()}
            onCancel={() => feedbackModal.setModalAdd(false)}
            cancelButtonProps={{ hidden: true }}
            okText='Опубликовать'
            okButtonProps={
                {
                    'data-test-id': 'new-review-submit-button',
                } as ButtonProps
            }
            bodyStyle={
                size.width && size.width > 800
                    ? {
                          display: 'block',
                          padding: '24px',
                      }
                    : { display: 'block', padding: '16px' }
            }
        >
            <Form form={form}>
                <Form.Item noStyle name='rating'>
                    <Rate
                        character={({ value, index }) => {
                            if (typeof value === 'number' && typeof index === 'number') {
                                return index < value ? <StarFilled /> : <StarOutlined />;
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item name='message'>
                    <Input.TextArea
                        autoSize={true}
                        placeholder='Расскажите, почему Вам понравилось наше приложение'
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
