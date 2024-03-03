import {
    Feedback,
    useCreateFeedbackMutation,
    useGetFeedbacksQuery
} from "@redux/api/feedbacksApi.ts";
import {Avatar, Button, ButtonProps, Card, Input, Modal, Rate, Result} from "antd";
import classes from './feedbacks.module.less';
import {StarFilled, StarOutlined, UserOutlined} from "@ant-design/icons";
import {FormEvent, useEffect, useState} from "react";
import {useLoader} from "@hooks/useLoader.ts";
import {push} from "redux-first-history";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {useWindowSize} from "@uidotdev/usehooks";
import {Typography} from "antd/";

const {Meta} = Card;

export const FeedbacksPage = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [modalError, setModalError] = useState<boolean>(false);
    const [modalError500, setModalError500] = useState<boolean>(false);
    const [modalSuccess, setModalSuccess] = useState<boolean>(false);
    const [shortData, setShortData] = useState<boolean>(true);
    const {data, isLoading, isError} = useGetFeedbacksQuery(1, {
        refetchOnFocus: true, refetchOnReconnect: true,
    });
    const [createFeedback, createFeedbackEvents] = useCreateFeedbackMutation();
    const {setLoader} = useLoader();
    const [message, setMessage] = useState<string>();
    const [rating, setRating] = useState<number>(1);
    const dispatch = useAppDispatch();
    const size = useWindowSize();

    const writeFeedbackHandler = async () => {
        await createFeedback({
            message,
            rating,
        })
    };

    useEffect(() => {
        if (isLoading) {
            setLoader && setLoader(true);
        } else {
            setLoader && setLoader(false);
        }
    }, [isLoading]);

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
            setModalError500(true);
        }
    }, [isError]);


    const expandHandler = async () => {
        setShortData(!shortData);
    };

    const textareaHandler = (e: FormEvent<HTMLTextAreaElement>) => {
        setMessage((e.target as HTMLTextAreaElement).value);
    };

    const formatDate = (value: string) => {
        const date = new Date(value);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    }

    return (
        <>
            {data ? <>
                    <div className={classes["feedbacks-wrap"]}>
                        {
                            (shortData ? data.slice(0, 4) : data).map((feedback: Feedback) =>

                                <Card key={feedback.id}>
                                    <Meta avatar={
                                        <>
                                            <Avatar size={42} icon={feedback.imageSrc ?
                                                <img src={feedback.imageSrc}/> : <UserOutlined/>}/>
                                            <span>{feedback.fullName || "Пользователь"}</span>
                                        </>}
                                          title={<>
                                              <Rate character={({value, index}) => {
                                                  return value && index! < value ? <StarFilled/> :
                                                      <StarOutlined/>
                                              }}
                                                    style={{height: "16px"}}
                                                    defaultValue={feedback.rating}/>
                                              <span className={classes["feedback-date"]}>
                                                    {formatDate(feedback.createdAt)}
                                                </span>
                                          </>}
                                          description={feedback.message}/>
                                </Card>
                            )}
                    </div>
                    <div className={classes["tools-wrap"]}>
                        <Button type="primary" className={classes["btn-add-feedback"]}
                                data-test-id="write-review" onClick={() => setModal(true)}>Написать
                            отзав</Button>
                        <Button type="link" className={classes["btn-expand-feedbacks"]}
                                data-test-id="all-reviews-button" onClick={expandHandler}>Развернуть
                            все отзывы</Button>
                    </div>
                </> :
                <div className={classes["welcome-container"]}>
                    <div className={classes["welcome-card"]}>
                        <Typography.Title level={4} className={classes["welcome-title"]}>Оставьте
                            свой отзыв первым</Typography.Title>
                        <Typography.Text className={classes["welcome-text"]}>
                            Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                            Поделитесь&nbsp;своим мнением и опытом&nbsp;с другими пользователями, и
                            помогите
                            им сделать правильный выбор.
                        </Typography.Text>
                    </div>
                    <Button type="primary" className={classes["btn-add-feedback"]}
                            data-test-id="write-review" onClick={() => setModal(true)}>Написать
                        отзав</Button>
                </div>
            }
            <Modal
                width={size.width! > 800 ? 539 : 328}
                wrapClassName="add-feedback-blur"
                maskStyle={{background: "unset"}}
                title="Выш отзыв"
                centered
                open={modal}
                onOk={() => writeFeedbackHandler()}
                onCancel={() => setModal(false)}
                cancelButtonProps={{hidden: true}}
                okText="Опубликовать"
                okButtonProps={{"data-test-id": "new-review-submit-button"} as ButtonProps}
                bodyStyle={size.width! > 800 ? {
                    display: "block",
                    padding: "24px"
                } : {display: "block", padding: "16px"}}
            >
                <Rate value={rating} character={({value, index}) => {
                    return value && index! < value ? <StarFilled/> :
                        <StarOutlined/>
                }} onChange={setRating}
                />
                <Input.TextArea onInput={(e) => textareaHandler(e)}/>
            </Modal>
            <Modal
                centered
                width={size.width! > 800 ? 539 : "auto"}
                wrapClassName="main-wrapper-blur"
                maskStyle={{background: "unset"}}
                open={modalError}
                okButtonProps={{hidden: true}}
                cancelButtonProps={{hidden: true}}
            >
                <Result
                    status="error"
                    title="Данные не сохранились"
                    subTitle="Что-то пошло не так. Попробуйте еще раз"
                    extra={
                        [<Button type="primary" onClick={() => setModalSuccess(false)}>
                            Написать отзыв
                        </Button>,
                            <Button className={classes["btn-close-error"]}
                                    onClick={() => setModalError(false)}
                                    data-test-id="write-review-not-saved-modal">
                                Закрыть
                            </Button>]
                    }
                />
            </Modal>
            <Modal
                centered
                width={size.width! > 800 ? 539 : 328}
                cancelButtonProps={{hidden: true}}
                okButtonProps={{hidden: true}}
                wrapClassName="main-wrapper-blur"
                maskStyle={{background: "unset"}}
                open={modalSuccess}>
                <Result
                    status="success"
                    title="Отзыв успешно опубликован"
                    extra={
                        <Button type="primary" onClick={() => setModalSuccess(false)}>
                            Отлично
                        </Button>
                    }/>
            </Modal>
            <Modal
                width={size.width! > 800 ? 539 : 328}
                wrapClassName="main-wrapper-blur"
                maskStyle={{background: "unset"}}
                centered
                open={modalError500}
                okButtonProps={{hidden: true}}
                cancelButtonProps={{hidden: true}}
            >
                <Result
                    status="500"
                    title="Что-то пошло не так"
                    subTitle="Произошла ошибка, попробуйте ещё раз."
                    extra={
                        [<Button type="primary" onClick={() => dispatch(push('/main'))}>
                            Назад
                        </Button>]
                    }/>
            </Modal>
        </>
    );
};
