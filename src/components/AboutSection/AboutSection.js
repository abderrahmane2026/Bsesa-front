import "./AboutSection.css";
import aboutpic from "../../assets/pictur/sports-academy-about.png"; // صورة تعبر عن الأكاديمية الرياضية
import { Link } from "react-router-dom";

export default function AboutSection () {
    return (
        <div className='About-section'>
            <section className="mt-1 mx-auto max-w-screen-xl pb-4 px-4 items-center lg:flex md:px-8">
                <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                    <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
                        About 
                        <span className="text-indigo-600"> Us</span>
                    </h1>
                    <p className="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                    At Sports Academy, we are dedicated to providing world-class training and development programs in sports performance, strength and conditioning, and nutrition.
                    Our goal is to help athletes and sports professionals reach their full potential through scientifically proven methods and expert coaching.
                    </p>
                    <div>
                        <p className="text-gray-800 py-3">
                        Join Sports Academy today and elevate your athletic performance to the next level!
                        </p>
                        <form className="items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
                           <Link to="/About">
                            <button className="outline-none bg-gray-700 text-white text-center px-4 py-3 rounded-md shadow w-full ring-offset-2 ring-gray-700 focus:ring-2 sm:w-auto">
                              Learn More
                            </button>
                            </Link>
                        </form>
                    </div>
                </div>
                <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
                    <img src={aboutpic} className="w-full mx-auto sm:w-10/12 lg:w-full" alt="About Sports Academy" />
                </div>
            </section>
        </div>
    )
}
