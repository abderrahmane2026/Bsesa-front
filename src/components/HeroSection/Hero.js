import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import heropic1 from "../../assets/hero/1.jpg";
import heropic2 from "../../assets/hero/2.jpg";
import heropic3 from "../../assets/hero/3.jpg";
import "./Hero.css"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
      >
        <SwiperSlide className='relative h-screen'>
          <div
            className="slide w-full h-full object-cover mix-blend-overlay"
            style={{ backgroundImage: `url(${heropic1})`, position: 'relative' }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl relative z-10">
              <h1 className="text-sm text-gray-600 font-medium">
                Discover Over 200 Unique Training Programs
              </h1>
              <h2 className="text-4xl mb-5 text-gray-800 font-extrabold md:text-5xl">
                Take Your Athletic Skills <span>to the Next Level</span>
              </h2>
              <p>
                Our comprehensive training courses are designed to help athletes and coaches excel, blending science and practical experience.
              </p>
              <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <Link to="/Login">  
                  <button className=" bg-yellow-400 text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-300 transition-colors">
                    Start Your Journey
                  </button>
                </Link>
                <Link to="/Signup" className=" border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-400 hover:text-black transition-colors">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="slide"
            style={{ backgroundImage: `url(${heropic2})`, position: 'relative' }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl relative z-10">
              <h1 className="text-sm text-600 font-medium">
                Empower Yourself with Our Training Programs
              </h1>
              <h2 className="text-4xl mb-5 text-800 font-extrabold md:text-5xl">
                Unlock Your Full Athletic Potential <span>Worldwide</span>
              </h2>
              <h1 className='text-sm text-600 font-medium'>
                Experience top-tier training that integrates cutting-edge sports science and hands-on methods for optimal results.
              </h1>
              <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <Link to="/Login">  
                  <button className=" bg-yellow-400 text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-300 transition-colors">
                    Start Your Journey
                  </button>
                </Link>
                <Link to="/Signup" className=" border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-400 hover:text-black transition-colors">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="slide"
            style={{ backgroundImage: `url(${heropic3})`, position: 'relative' }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl relative z-10">
              <h1 className="text-sm text-white-600 font-medium">
                Achieve Excellence with Proven Training
              </h1>
              <h2 className="text-4xl mb-5 text-white-800 font-extrabold md:text-5xl">
                Reach New Heights in Athletic Performance <span>Globally</span>
              </h2>
              <h1 className='text-sm text-white-600 font-medium'>
                Our courses combine innovative sports techniques and dedicated coaching to help you excel in every aspect of your sport.
              </h1>
              <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <Link to="/Login">  
                  <button className=" bg-yellow-400 text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-300 transition-colors">
                    Start Your Journey
                  </button>
                </Link>
                <Link to="/Signup" className=" border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-400 hover:text-black transition-colors">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
