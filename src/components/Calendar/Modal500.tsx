import { useWindowSize } from '@uidotdev/usehooks';
import { Button, Modal, Result } from 'antd';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import { useNavigate } from 'react-router-dom';

export const Modal500 = () => {
    const { modal500, setModal500, setSkip } = useMainContext() as MainContextType;
    const size = useWindowSize();
    const navigate = useNavigate();

    const buttonHandler = () => {
        setSkip(true);
        setModal500(false);
    };

    return (
        <Modal
            width={size.width && size.width > 800 ? 539 : 328}
            wrapClassName='main-wrapper-blur'
            data-test-id='modal-no-review'
            maskStyle={{ background: 'unset' }}
            centered
            closable={false}
            open={modal500}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
        >
            <Result
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                extra={
                    <Button type='primary' onClick={buttonHandler}>
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};
