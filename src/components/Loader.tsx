import Lottie from 'lottie-react';
import loaderAnimation from './loader.json';

const Loader = () => {
    return (
        <Lottie animationData={loaderAnimation} className="loader"/>
    );
}

export default Loader;
