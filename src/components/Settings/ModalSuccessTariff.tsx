import { Modal, Result } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { setLogout } from '@redux/authSlice.ts';
import classes from '@pages/settings-page/settings.module.less';
import { CheckCircleFilled } from '@ant-design/icons';
import { useWindowSize } from '@uidotdev/usehooks';

export const ModalSuccessTariff = ({ open }: { open: boolean }) => {
    const { user } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const size = useWindowSize();
    const closeFromApp = () => dispatch(setLogout());

    return (
        <Modal
            closable
            centered
            maskClosable={!!(size.width && size.width < 650)}
            width={size.width && size.width > 650 ? 539 : 328}
            closeIcon={size.width && size.width < 650}
            className={classes['modal-success']}
            wrapClassName='calendar-wrapper-blur'
            maskStyle={{ background: 'unset' }}
            open={open}
            onCancel={closeFromApp}
            footer={false}
            data-test-id='tariff-modal-success'
        >
            <Result
                icon={<CheckCircleFilled />}
                title={<>Чек для оплаты у&nbsp;вас&nbsp;на&nbsp;почте</>}
                subTitle={
                    <>
                        Мы&nbsp;отправили&nbsp;инструкцию&nbsp;для&nbsp;оплаты вам на e-mail&nbsp;
                        <b>{user && user.email}</b>.
                        После&nbsp;подтверждения&nbsp;оплаты&nbsp;войдите в приложение заново.`
                    </>
                }
                children={'Не пришло письмо? Проверьте папку Спам.'}
            />
        </Modal>
    );
};
