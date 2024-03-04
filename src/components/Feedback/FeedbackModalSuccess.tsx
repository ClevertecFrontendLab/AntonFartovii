import { Button, Modal, Result } from 'antd';
import { useFeedbackModal } from '@hooks/useFeedbackModal.ts';
import { FeedbackModalProviderProps } from '../../hoc/FeedbackModalProvider.tsx';
import { useWindowSize } from '@uidotdev/usehooks';

export const FeedbackModalSuccess = () => {
    const feedbackModal = useFeedbackModal() as FeedbackModalProviderProps;
    const size = useWindowSize();

    return (
        <Modal
            centered
            closable={false}
            width={size.width && size.width > 800 ? 539 : 328}
            cancelButtonProps={{ hidden: true }}
            okButtonProps={{ hidden: true }}
            wrapClassName='main-wrapper-blur'
            maskStyle={{ background: 'unset' }}
            open={feedbackModal.modalSuccess}
        >
            <Result
                status='success'
                title='Отзыв успешно опубликован'
                extra={
                    <Button type='primary' onClick={() => feedbackModal.setModalSuccess(false)}>
                        Отлично
                    </Button>
                }
            />
        </Modal>
    );
};
