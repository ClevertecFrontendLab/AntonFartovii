import {Feedback, useGetFeedbacksQuery} from "@redux/api/feedbacksApi.ts";
import {Button} from "antd";
import classes from './feedbacks.module.less';
import {useEffect, useState} from "react";
import {useLoader} from "@hooks/useLoader.ts";
import FeedbackWelcome from "@components/FeedbackWelcome.tsx";
import FeedbackCard from "@components/FeedbackCard.tsx";
import {useFeedbackModal} from "@hooks/useFeedbackModal.ts";
import FeedbackModalProvider from "../../hoc/FeedbackModalProvider.tsx";
import {ILoader} from "../../hoc/LoaderProvider.tsx";
import FeedbackModalAdd from "@components/Result/FeedbackModalAdd.tsx";
import FeedbackModalError from "@components/FeedbackModalError.tsx";
import FeedbackModalError500 from "@components/FeedbackModalError500.tsx";
import FeedbackModalSuccess from "@components/FeedbackModalSuccess.tsx";

export const FeedbacksPage = () => {
    const {setLoader} = useLoader() as ILoader;
    const feedbackModal = useFeedbackModal() as FeedbackModalProvider;
    const [shortData, setShortData] = useState<boolean>(true);
    const {data, isLoading, isError} = useGetFeedbacksQuery(1, {
        refetchOnFocus: true, refetchOnReconnect: true,
    });

    useEffect(() => {
        setLoader(isLoading);
    }, [isLoading]);

    useEffect(() => {
        isError && feedbackModal.setModalError500(true);
    }, [isError]);


    const expandHandler = async () => {
        setShortData(!shortData);
    };

    return (
        <>
            {data ? <>
                    <div className={classes["feedbacks-wrap"]}>
                        {
                            (shortData ? data.slice(0, 4) : data).map((feedback: Feedback) =>
                                <FeedbackCard feedback={feedback}/>
                            )}
                    </div>
                    <div className={classes["tools-wrap"]}>
                        <Button type="primary" className={classes["btn-add-feedback"]}
                                data-test-id="write-review"
                                onClick={() => feedbackModal.setModalAdd(true)}>
                            Написать отзав
                        </Button>
                        <Button type="link" className={classes["btn-expand-feedbacks"]}
                                data-test-id="all-reviews-button" onClick={expandHandler}>
                            {shortData ? "Развернуть" : "Свернуть"} все отзывы
                        </Button>
                    </div>
                </> :
                <FeedbackWelcome/>
            }
            <FeedbackModalAdd/>
            <FeedbackModalError/>
            <FeedbackModalError500/>
            <FeedbackModalSuccess/>
        </>
    );
};
