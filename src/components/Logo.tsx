import classes from '../layout/MainLayout/layout.module.less';
import logo from '../assets/svg/logo.svg';
import logo_mobile from '../assets/svg/logo_mobile.svg';

export const Logo = ({ collapsed }: { collapsed: boolean }) => (
    <>
        {collapsed ? (
            <div className={classes.logo + ' ' + classes.collapsed}>
                <img src={logo_mobile} alt='logo icon' />
            </div>
        ) : (
            <div className={classes.logo}>
                <img src={logo} alt='logo icon' />
            </div>
        )}
    </>
);
