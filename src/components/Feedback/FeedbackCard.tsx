import {Avatar, Card, Rate} from "antd";
import {StarFilled, StarOutlined, UserOutlined} from "@ant-design/icons";
import classes from "@pages/feedbacks-page/feedbacks.module.less";
import {Feedback} from "@redux/api/feedbacksApi.ts";
import {formatDate} from "../../utils.ts";

const {Meta} = Card;

const printFullName = (fullName: string) => {
    if (!fullName) return "Пользователь";
    const arr = fullName.split(' ');
    if (arr.length === 2) return <>{arr[0]}<br/>{arr[1]}</>;
    return fullName;

}

const FeedbackCard = ({feedback}: { feedback: Feedback }) => {
    return (
        <Card key={feedback.id}>
            <Meta avatar={
                <>
                    <Avatar
                        size={42}
                        icon={feedback.imageSrc ? <img src={feedback.imageSrc}/> :
                            <UserOutlined/>}/>
                    <span>{printFullName(feedback.fullName)}</span>
                </>}
                  title={
                      <>
                          <Rate character={({value, index}) => {
                              return value && index! < value ? <StarFilled/> :
                                  <StarOutlined/>
                          }}
                                style={{height: "16px"}}
                                defaultValue={feedback.rating}/>
                          <span
                              className={classes["feedback-date"]}>{formatDate(feedback.createdAt)}</span>
                      </>}
                  description={feedback.message}/>
        </Card>
    );
};

export default FeedbackCard;
