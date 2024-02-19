import Lottie from 'lottie-react';
import loaderAnimation from './loader.json';

const Loader = () => {
    return (
        <Lottie animationData={loaderAnimation} className="loader" data-test-id="loader"/>
    );
}

export default Loader;
