"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LottieAnimation from '@components/Animation';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const images = [
  { src: '/Images/Ui.png', alt: 'Home Page', caption: 'Discover a modern and intuitive user interface' },
  { src: '/Images/visionVault.png', alt: 'Vision Vault', caption: "Secure your savings with Vision Vault - your path to future financial goals!" },
  { src: '/Images/visuals.png', alt: 'Data Visualization', caption: 'Visualize your history effortlessly' },
  { src: '/Images/deposit.png', alt: 'Secure & Reliable', caption: 'Experience secure and reliable deposits' },
];

export default function LandingPage() {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const staticText = "This brings ";
  const highlightWords = ["Secure Banking", "Instant Transfers", "Smart Savings", "Financial Insights"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animateClass, setAnimateClass] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimateClass("fade-in");
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % highlightWords.length);
      setTimeout(() => {
        setAnimateClass("");
      }, 500);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      {/* Header */}
      <header className="py-6 bg-gray-800 border-b border-gray-800 sticky top-0 z-10 shadow-lg">
        <nav className="container mx-auto flex justify-center items-center px-4 lg:px-8">
          <div className="text-2xl font-bold text-white tracking-wide cursor-pointer">tapNgo</div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20 px-6 md:px-12">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Manage Your Finances, <span className="text-blue-400">Effortlessly</span>
          </h1>
          <section className="py-6">
            <div className="text-xl md:text-2xl">
              {staticText}
              <span className={`text-[#F4B6C2] font-bold ${animateClass}`}>{highlightWords[currentWordIndex]}</span>
              <span> in a single app.</span>
            </div>
            <style jsx>{`
              @keyframes fadeIn {
                0% { opacity: 0; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1); }
              }
              .fade-in { animation: fadeIn 0.5s ease-in-out forwards; }
            `}</style>
          </section>
          <div className="flex justify-center lg:justify-start space-x-4 mt-8">
            <button 
              className="px-6 lg:px-8 py-3 bg-white text-black rounded-full font-semibold transition-transform transform hover:scale-105 shadow-lg"
              onClick={() => router.push("/signUp")}
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Get Started
            </button>
            <button 
              className="px-6 lg:px-8 py-3 bg-transparent border border-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-transform transform hover:scale-105 shadow-lg"
              onClick={() => router.push("/signIn")}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Log In
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <LottieAnimation />
        </div>
      </section>

      {/* Carousel Section */}
      <section id="features" className="py-12 lg:py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 lg:mb-10 text-white">Why Choose TapNGo?</h2>
          <div className="border-t border-gray-600 mb-6"></div>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <Slider {...settings} className="w-full">
                {images.map((image, index) => (
                  <div key={index} className="p-4">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      layout="responsive" 
                      width={1200} 
                      height={800} 
                      className="rounded-lg shadow-lg transition-transform transform hover:scale-105" 
                    />
                    <p className="text-lg lg:text-xl mt-4 lg:mt-6 text-white font-medium">{image.caption}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 lg:py-10">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 TapNGo. All rights reserved.</p>
          <div className="mt-4 grid grid-cols-2 gap-4 justify-center">
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-blue-400 transition duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition duration-200">Terms of Service</a>
            </div>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-blue-400 transition duration-200">Docs</a>
              <a href="#" className="hover:text-blue-400 transition duration-200">Source Code</a>
              <a href="#" className="hover:text-blue-400 transition duration-200">Hemanth R</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
