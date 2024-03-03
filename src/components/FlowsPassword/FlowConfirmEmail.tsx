import VerificationInput from "react-verification-input";
import {Result} from "antd";
import {Typography} from "antd/";
import {useConfirmEmailMutation} from "@redux/api/authApi.ts";
import {useEffect, useState} from "react";
import {ResultStatusType} from "antd/es/result";
import {Paths} from "../../routes/Paths.ts";
import {useLoader} from "@hooks/useLoader.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {replace} from "redux-first-history";

const FlowConfirmEmail = () => {
    const [status, setStatus] = useState<ResultStatusType | undefined>(undefined);
    const [value, setValue] = useState<string>('');
    const [confirmEmail, {isSuccess, isError, isLoading}] = useConfirmEmailMutation();
    const {setLoader} = useLoader();
    const dispatch = useAppDispatch();
    const {formLogin: {email}} = useAppSelector((state) => state.formReducer);

    useEffect(() => {
        setLoader && setLoader(isLoading)
    }, [isLoading]);

    useEffect(() => {
        if (isError) {
            setStatus('error');
            setValue('');
        }
        if (isSuccess) {
            setStatus(undefined);
            setValue('');
            dispatch(replace(Paths.MAIN + Paths.AUTH + '/' + Paths.CHANGE_PASSWORD, {
                    key: 'result_redirect'
                },
            ));
        }
    }, [isSuccess, isError]);


    const completeHandler = async (code: string) => {
        email && await confirmEmail({email, code});
    };

    return (
        <Result
            status={status}
            title={status === 'error' ?
                <>Неверный код. Введите код<br/> для восстановления аккауанта</> :
                <>Введите код<br/>для восстановления аккауанта</>}
            subTitle={<>Мы отправили вам на e-mail <span
                style={{fontWeight: '700'}}>{email}</span><br/>шестизначный код. Введите его в
                поле ниже.</>}
        >
            <VerificationInput placeholder=""
                               length={6}
                               autoFocus={false}
                               validChars="0-9"
                               value={value}
                               onChange={setValue}
                               onComplete={(code: string) => completeHandler(code)}
                               inputProps={{"data-test-id": "verification-input"}}

                               classNames={{
                                   character: "verification-character",
                                   container: "verification-container",
                                   characterInactive: isError ? 'verification-character-inactive error' : 'verification-character-inactive',
                                   characterSelected: "verification-character-selected",
                                   characterFilled: "verification-character-filled",
                               }}/>
            <Typography.Text type="secondary">
                Не пришло письмо? Проверьте папку Спам.
            </Typography.Text>
        </Result>
    );
};

export default FlowConfirmEmail;
