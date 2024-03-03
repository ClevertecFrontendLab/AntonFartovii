import Lottie from 'lottie-react';
import loaderAnimation from './loader.json';

const Loader = ({active}: { active: boolean | undefined }) => {
    return (
        <>
            <div className={active ? "auth-wrapper-blur active" : "auth-wrapper-blur"}></div>
            {active &&
                <Lottie animationData={loaderAnimation} className="loader" data-test-id="loader"/>}
        </>
    );
}

export default Loader;
