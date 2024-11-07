"use client";

import animationData from '../public/Animation - 1727201525747 (1).json'; // Adjust the path if necessary
import Lottie from 'lottie-react';

const LottieAnimation = () => {
  return (
    <div className="">
      <Lottie
        animationData={animationData} // Use animationData instead of src
        style={{ height: '500px', width: '500px' }} // Customize the size
        loop={true} // Make the animation loop continuously
        autoplay={true}
        // Start playing the animation automatically
      />
    </div>
  );
};

export default LottieAnimation;
