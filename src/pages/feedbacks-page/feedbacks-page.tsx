import {
    Feedback,
    useCreateFeedbackMutation,
    useGetFeedbacksQuery
} from "@redux/api/feedbacksApi.ts";
import {Button} from "antd";

export const FeedbacksPage = () => {

    const {data} = useGetFeedbacksQuery(1);
    const [createFeedback] = useCreateFeedbackMutation();
    console.log(data);

    const writeFeedbackHandler = async () => {
        await createFeedback({
            "message": "Wadsasd asdfasl, cskdgv lkadf asd,lasdl mldajsdb absdakjb akjsdb ansbd amnbsd asb ahsmndba bhanbhdb",
            "rating": 1
        })
    };

    return (
        <div>
            {
                data && data.map((feedback: Feedback) => <div
                    key={feedback.createdAt}>{feedback.message}</div>)
            }
            <Button type="primary" onClick={writeFeedbackHandler}>Написать отзав</Button>
        </div>
    );
};
