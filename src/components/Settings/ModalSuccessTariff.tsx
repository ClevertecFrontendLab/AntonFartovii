import { Modal, Result } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { setLogout } from '@redux/authSlice.ts';

export type ModalSuccess = {
    open: boolean;
    close: () => void;
};
const ModalSuccessTariff = ({ open }: ModalSuccess) => {
    const { user } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();

    const closeFromApp = () => dispatch(setLogout());

    return (
        <Modal
            open={open}
            closable
            onCancel={closeFromApp}
            footer={false}
            data-test-id='tariff-modal-success'
        >
            <Result
                title='Чек для оплаты у вас на почте'
                subTitle={
                    <>
                        Мы отправили инструкцию для оплаты вам на e-mail&nbsp;
                        <b>{user && user.email}</b>. После подтверждения оплаты войдите в приложение
                        заново.`
                    </>
                }
                children={'Не пришло письмо? Проверьте папку Спам.'}
            />
        </Modal>
    );
};

export default ModalSuccessTariff;
