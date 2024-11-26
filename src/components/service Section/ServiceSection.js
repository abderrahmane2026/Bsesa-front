import { FaChalkboardTeacher, FaDumbbell, FaTrophy, FaUsers } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { PiMedal } from "react-icons/pi";
import { FaRunning } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";

export default function ServiceSection () {

    const features = [
        {
            icon: <FaChalkboardTeacher />,
            title: "Professional Coaches",
            desc: "A team of expert coaches to help you improve your athletic performance."
        },
        {
            icon: <FaDumbbell />,
            title: "Strength & Conditioning",
            desc: "Intensive training programs to develop strength and endurance."
        },
        {
            icon: <PiMedal />,
            title: "Outstanding Performance",
            desc: "Achieve superior athletic results through customized training plans."
        },
        {
            icon: <RiTeamFill />,
            title: "Teamwork Development",
            desc: "Enhance teamwork through specialized team training strategies."
        },
        {
            icon: <FaRunning />,
            title: "Fitness Training",
            desc: "Improve physical performance and speed with tailored fitness programs."
        },
        {
            icon: <IoMdTimer />,
            title: "Flexible Training Schedules",
            desc: "Flexible training schedules that fit your time and needs."
        },
    ];

    return (
        <section className="py-10 bg-[#1A1A1A] text-white">
            <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-400 md:px-8">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-yellow-400 text-3xl font-semibold sm:text-4xl">
                        Our Specialized Services for Athletic Performance Development
                    </h3>
                    <p className="mt-3">
                        We offer a range of specialized services that help you achieve your athletic goals through professional and scientifically proven methods.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="space-y-3">
                                    <div className="w-12 h-12 mx-auto bg-[#333333] text-yellow-400 rounded-full flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-yellow-400 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}
