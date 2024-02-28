import classes from './layout.module.less';
import {AndroidFilled, AppleFilled} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Paths} from "../../routes/Paths.ts";

const Footer = ({collapsed}: { collapsed: boolean }) => {
    const classOff = (className: string) => className + ' ' + classes["collapsed"];

    return (
        <footer className={collapsed ? classOff(classes.footer) : classes.footer}>
            <div className={classes["footer-container"]}>
                <div className={classes["left"]}><Link to={Paths.MAIN + Paths.FEEDBACKS}>Смотреть
                    отзывы</Link></div>
                <div className={classes["right"]}>
                    <div className={classes["top"]}>
                        <div className={classes["download-link"]}><a>Скачать на телефон</a></div>
                        <div className={classes["notification"]}>Доступно в PRO-тарифе</div>
                    </div>
                    <div className={classes["bottom"]}>
                        <div><a><AndroidFilled/>Android OS</a></div>
                        <div><a><AppleFilled/>Apple iOS</a></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
