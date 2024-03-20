import classes from './settings.module.less';
import { useGetTariffListQuery } from '@redux/api/catalogsApi.ts';

export const SettingsPage = () => {
    useGetTariffListQuery(undefined);

    return <section className={classes['profile-container']}></section>;
};
