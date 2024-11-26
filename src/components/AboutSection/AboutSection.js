import "./AboutSection.css";
import aboutpic from "../../assets/pictur/sports-academy-about.png"; // صورة تعبر عن الأكاديمية الرياضية
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <div className="About-section bg-[#1A1A1A] text-white py-24 px-6 lg:px-16">
      <section className="mt-1 mx-auto max-w-screen-xl bg-[#1A1A1A] pb-4 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-4xl xl:text-5xl">
            About <span className="text-yellow-400">Us</span>
          </h1>
          <p className="text-gray-400 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            At Sports Academy, we are dedicated to providing world-class
            training and development programs in sports performance, strength
            and conditioning, and nutrition. Our goal is to help athletes and
            sports professionals reach their full potential through
            scientifically proven methods and expert coaching.
          </p>
          <div>
            <p className="text-white py-3">
              Join Sports Academy today and elevate your athletic performance to
              the next level!
            </p>
            <form className="items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
              <Link to="/About">
                <button className="outline-none bg-yellow-400 text-black text-center px-4 py-3 rounded-md shadow w-full ring-offset-2 ring-yellow-400 focus:ring-2 sm:w-auto hover:bg-yellow-500 transition-colors duration-200">
                  Learn More
                </button>
              </Link>
            </form>
          </div>
        </div>
        <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
          <img
            src={aboutpic}
            className="w-full mx-auto sm:w-10/12 lg:w-full rounded-md border border-gray-700"
            alt="About Sports Academy"
          />
        </div>
      </section>
    </div>
  );
}
