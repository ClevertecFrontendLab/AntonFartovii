import classes from '../layout/MainLayout/layout.module.less';
import logo from '../assets/svg/logo.svg';
import logo_mobile from '../assets/svg/logo_mobile.svg';
import { Link } from 'react-router-dom';

export const Logo = ({ collapsed }: { collapsed: boolean }) => (
    <div className={collapsed ? classes.logo + ' ' + classes.collapsed : classes.logo}>
        <Link to={`/`}>
            <img src={collapsed ? logo_mobile : logo} alt='logo icon' />
        </Link>
    </div>
);
