import { ButtonProps, Form, Input, Modal, Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useCreateFeedbackMutation } from '@redux/api/feedbacksApi.ts';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/Paths.ts';

type ModalFeedbackAddType = {
    open: boolean;
    close: (bool: boolean) => void;
};

export const ModalFeedbackAdd = ({ open, close }: ModalFeedbackAddType) => {
    const [createFeedback] = useCreateFeedbackMutation();
    const [form] = Form.useForm();
    const { xs } = useBreakpoint();
    const dispatch = useAppDispatch();

    const writeFeedbackHandler = async () => {
        await createFeedback(form.getFieldsValue(['rating', 'message']));
        form.resetFields();
        close(false);
        dispatch(push(`/${Paths.FEEDBACKS_PAGE}`));
    };

    const rateCharacter = ({ value, index }: { value?: number; index?: number }) => {
        if (typeof value === 'number' && typeof index === 'number') {
            return index < value ? <StarFilled /> : <StarOutlined />;
        }
    };

    return (
        <Modal
            width={xs ? 328 : 539}
            maskStyle={{ background: 'unset' }}
            wrapClassName='settings-wrapper-blur'
            title='Выш отзыв'
            centered={true}
            open={open}
            onOk={writeFeedbackHandler}
            onCancel={() => close(false)}
            cancelButtonProps={{ hidden: true }}
            okText='Опубликовать'
            okButtonProps={
                {
                    'data-test-id': 'new-review-submit-button',
                } as ButtonProps
            }
            bodyStyle={xs ? { padding: '16px' } : { padding: '24px' }}
        >
            <Form form={form}>
                <Form.Item noStyle name='rating'>
                    <Rate character={rateCharacter} />
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
