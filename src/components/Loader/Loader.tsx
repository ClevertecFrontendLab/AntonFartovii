import Lottie from 'lottie-react';
import loaderAnimation from './loader.json';

export const Loader = ({ active }: { active: boolean | undefined }) => (
    <>
        <div className={active ? 'auth-wrapper-blur active' : 'auth-wrapper-blur'}></div>
        {active && (
            <Lottie animationData={loaderAnimation} className='loader' data-test-id='loader' />
        )}
    </>
);
