import {
    Feedback,
    useCreateFeedbackMutation,
    useGetFeedbacksQuery
} from "@redux/api/feedbacksApi.ts";
import {Avatar, Button, Card, Input, Modal, Rate, Result} from "antd";
import classes from './feedbacks.module.less';
import {UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useLoader} from "@hooks/useLoader.ts";

const {Meta} = Card;

export const FeedbacksPage = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [modalError, setModalError] = useState<boolean>(false);
    const [modalSuccess, setModalSuccess] = useState<boolean>(false);
    const [disableOkButton, setDisableOkButton] = useState<boolean>(true);
    const {data, isLoading, isError} = useGetFeedbacksQuery(1);
    const [createFeedback, createFeedbackEvents] = useCreateFeedbackMutation();
    const {setLoader} = useLoader();
    const [message, setMessage] = useState<string>();
    const [rating, setRating] = useState<number>();

    const writeFeedbackHandler = async () => {
        await createFeedback({
            message,
            rating,
        })
    };

    useEffect(() => {
        if (createFeedbackEvents.isError) {
            setModal(false)
            setModalError(true);
        }
    }, [createFeedbackEvents.isError]);

    useEffect(() => {
        if (createFeedbackEvents.isSuccess) {
            setModal(false)
            setModalSuccess(createFeedbackEvents.isSuccess);
        }
    }, [createFeedbackEvents.isSuccess]);

    useEffect(() => {
        if (isError) {
            console.log('isError')
        }
    }, [isError]);


    const expandHandler = async () => {
        console.log('1');
    };

    const textareaHandler = (e: any) => {
        if (e.target.value.length > 10) {
            setDisableOkButton(false);
        }
        setMessage(e.target.value);
    };

    const formatDate = (value: string) => {
        const date = new Date(value);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    }

    return (
        <div className={classes["feedbacks-container"]}>
            <div className={classes["feedbacks-wrap"]}>
                {
                    data ? data.slice(0, 4).map((feedback: Feedback) =>
                            <Card key={feedback.id}>
                                <Meta avatar={
                                    <>
                                        <Avatar size={42} icon={feedback.imageSrc ?
                                            <img src={feedback.imageSrc}/> : <UserOutlined/>}/>
                                        {feedback.fullName || "Пользователь"}
                                    </>}
                                      title={<><Rate allowHalf
                                                     defaultValue={feedback.rating}/>{formatDate(feedback.createdAt)}</>}
                                      description={feedback.message}/>
                            </Card>) :
                        <div className={classes["welcome-card"]}>
                            <h4>Оставьте свой отзыв первым</h4>
                            <span>
                                Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим мнением и опытом с другими пользователями, и помогите им сделать правильный выбор.
                            </span>
                        </div>
                }
            </div>
            <div className={classes["tools-wrap"]}>
                <Button type="primary" onClick={() => setModal(true)}>Написать отзав</Button>
                <Button type="link" onClick={expandHandler}>Развернуть все отзывы</Button>
            </div>
            <Modal
                title="Выш отзыв"
                centered
                open={modal}
                onOk={() => writeFeedbackHandler()}
                onCancel={() => setModal(false)}
                cancelButtonProps={{hidden: true}}
                okText="Опубликовать"
                okButtonProps={{disabled: disableOkButton}}

            >
                <Rate value={rating} onChange={setRating}/>
                <Input.TextArea onInput={(e) => textareaHandler(e)}/>
            </Modal>
            <Modal
                open={modalError}
                okText="Написать озыв"
                cancelText="Закрыть"
                onCancel={() => setModalError(false)}>
                <Result
                    status="error"
                    title="Данные не сохранились"
                    subTitle="Что-то пошло не так. Попробуйте еще раз"/>
            </Modal>
            <Modal
                open={modalSuccess}
                okText="Отлично"
                onOk={() => setModalSuccess(false)}>
                <Result
                    status="success"
                    title="Отзыв успешно опубликован"/>
            </Modal>

        </div>
    );
};
