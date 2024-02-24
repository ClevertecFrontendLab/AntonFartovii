import classes from '../layout/MainLayout/layout.module.less';
import logo from '../assets/svg/logo.svg'
import logo_mobile from '../assets/svg/logo_mobile.svg'

const Logo = ({collapsed}: { collapsed: boolean }) => {


    return (
        <>
            {
                collapsed ? (
                    <div className={classes.logo + ' ' + classes.collapsed}><img src={logo_mobile}/>
                    </div>
                ) : (<div className={classes.logo}><img src={logo}/></div>)
            }
        </>
    );
};

export default Logo;
