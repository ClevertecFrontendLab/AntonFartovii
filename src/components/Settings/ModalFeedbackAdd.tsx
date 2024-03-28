import { ButtonProps, Form, Input, Modal, Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useWindowSize } from '@uidotdev/usehooks';
import { useCreateFeedbackMutation } from '@redux/api/feedbacksApi.ts';

export type ModalFeedbackAdd = {
    open: boolean;
    close: (bool: boolean) => void;
};

export const ModalFeedbackAdd = ({ open, close }: ModalFeedbackAdd) => {
    const size = useWindowSize();
    const [createFeedback] = useCreateFeedbackMutation();
    const [form] = Form.useForm();

    const writeFeedbackHandler = async () => {
        await createFeedback(form.getFieldsValue(['rating', 'message']));
        form.resetFields();
    };

    return (
        <Modal
            width={size.width && size.width > 800 ? 539 : 328}
            maskStyle={{ background: 'unset' }}
            wrapClassName='settings-wrapper-blur'
            title='Выш отзыв'
            centered={true}
            open={open}
            onOk={() => writeFeedbackHandler()}
            onCancel={() => close(false)}
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
