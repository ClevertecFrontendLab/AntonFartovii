import VerificationInput from "react-verification-input";
import {Result} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {Typography} from "antd/";
import {useConfirmEmailMutation} from "@redux/api/authApi.ts";
import {useEffect, useState} from "react";
import {ResultStatusType} from "antd/es/result";
import {Paths} from "../routes/Paths.ts";

const FlowForgotPassword = () => {
    const [status, setStatus] = useState<ResultStatusType | undefined>(undefined);
    const [response, setResponse] = useState<any>();
    const [value, setValue] = useState<string>('');
    const {state: {email}} = useLocation();
    const [confirmEmail, {isSuccess, isError, reset}] = useConfirmEmailMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            setStatus('error');
            setValue('');
        }
        if (isSuccess) {
            setStatus(undefined);
            setValue('');
            navigate(Paths.MAIN + Paths.AUTH + '/' + Paths.CHANGE_PASSWORD, {
                replace: true,
                state: {key: 'sad'}
            })
        }
        return reset();
    }, [response]);


    const completeHandler = async (code: string) => {
        const response = await confirmEmail({email, code});
        setResponse(response);
    };

    return (
        <div>
            <Result
                status={status}
                title={`Введите код\n для восстановления аккауанта`}
                subTitle={`Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже.`}
            >
                <VerificationInput placeholder=""
                                   length={6}
                                   autoFocus={false}
                                   validChars="0-9"
                                   value={value}
                                   onChange={setValue}
                                   onComplete={(code: string) => completeHandler(code)}
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
        </div>
    );
};

export default FlowForgotPassword;
