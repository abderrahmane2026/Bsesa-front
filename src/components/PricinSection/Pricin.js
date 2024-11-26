import { Link } from "react-router-dom";

export default function PricingSec() {
    const plans = [
        {
            name: "Basic Training",
            desc: "Ideal for beginners looking to improve their athletic skills.",
            price: "100 £ ",
            time: "6 Months",
            isMostPop: false,
            features: [
                "Access to basic training programs",
                "Personalized workout plan",
                "Weekly performance reviews",
                "Basic nutrition advice",
                "Online support",
            ],
        },
        {
            name: "Advanced Training",
            desc: "Perfect for athletes aiming to elevate their performance.",
            price: "200 £ ",
            time: "1 Year",
            isMostPop: true,
            features: [
                "Advanced training programs",
                "Personalized coaching",
                "Monthly performance tracking",
                "Customized nutrition plan",
                "Priority access to trainers",
                "Exclusive webinars",
            ],
        },
        {
            name: "Elite Training",
            desc: "Designed for professionals who want top-level coaching.",
            price: "300 £ ",
            time: "1 Year",
            isMostPop: false,
            features: [
                "Elite-level training programs",
                "One-on-one coaching",
                "Daily performance tracking",
                "Premium nutrition plans",
                "24/7 support",
                "VIP event access",
            ],
        },
    ];

    return (
        <section className="Pricing-section py-1 bg-[#111111] text-white">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="relative max-w-xl mx-auto sm:text-center">
                    <h1 className="text-yellow-400 mb-20 font-bold text-4xl xl:text-5xl">
                        Pricing for all
                        <span className="text-white"> Levels</span>
                    </h1>
                </div>
                <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
                    {plans.map((item, idx) => (
                        <div
                            key={idx}
                            className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 border-gray-700 mt-6 sm:mt-0 bg-gray-800 ${
                                item.isMostPop ? "mt-10" : ""
                            }`}
                        >
                            {item.isMostPop && (
                                <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-yellow-400 text-center text-gray-900 text-sm font-semibold">
                                    Most popular
                                </span>
                            )}
                            <div className="p-8 space-y-4 border-b border-gray-700">
                                <span className="text-yellow-400 font-medium">{item.name}</span>
                                <div className="text-white text-3xl font-semibold">
                                    {item.price} <span className="text-lg text-gray-400 font-normal">/{item.time}</span>
                                </div>
                                <p className="text-gray-300">{item.desc}</p>
                                <button className="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-gray-900 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500">
                                    <Link className="payment-link" to="payment">
                                        Get Started
                                    </Link>
                                </button>
                            </div>
                            <ul className="p-8 space-y-3">
                                <li className="pb-2 text-yellow-400 font-medium">
                                    <p>Features</p>
                                </li>
                                {item.features.map((featureItem, idx) => (
                                    <li key={idx} className="flex items-center gap-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-yellow-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="text-gray-300">{featureItem}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
