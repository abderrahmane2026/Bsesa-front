import { Link } from "react-router-dom";
import "./Footer.css";
import footerpic from "../../assets/logo/BSESA-removebg.png";

export default () => {
    const footerNavs = [
        {
            label: "Company",
            items: [
                { href: "javascript:void()", name: "Partners" },
                { href: "javascript:void()", name: "Blog" },
                { href: "javascript:void()", name: "Team" },
                { href: "javascript:void()", name: "Careers" },
            ],
        },
        {
            label: "Resources",
            items: [
                { href: "javascript:void()", name: "Contact" },
                { href: "javascript:void()", name: "Support" },
                { href: "javascript:void()", name: "Docs" },
                { href: "javascript:void()", name: "Pricing" },
            ],
        },
        {
            label: "About",
            items: [
                { href: "javascript:void()", name: "Terms" },
                { href: "javascript:void()", name: "License" },
                { href: "javascript:void()", name: "Privacy" },
                { href: "javascript:void()", name: "About Us" },
            ],
        },
    ];

    return (
        <footer className="dark-footer text-gray-200 bg-[#111111] px-4 py-5 max-w-screen-xl mx-auto md:px-8">
            <div className="gap-6 justify-between md:flex">
                <div className="flex-1">
                    <div className="max-w-xs">
                        <img src={footerpic} className="w-32" alt="Footer Logo" />
                        <p className="leading-relaxed mt-2 text-[15px] text-gray-400">
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label className="block pt-4 pb-2 text-yellow-400">Stay up to date</label>
                        <div className="max-w-sm flex items-center border border-gray-700 rounded-md p-1">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-2.5 outline-none bg-gray-800 text-gray-200"
                            />
                            <button
                                className="p-2.5 rounded-md text-black bg-yellow-400 outline-none shadow-md hover:bg-yellow-300 sm:px-5"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
                    {footerNavs.map((item, idx) => (
                        <ul className="space-y-4" key={idx}>
                            <h4 className="text-yellow-400 font-medium">{item.label}</h4>
                            {item.items.map((el, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={el.href}
                                        className="footer-link text-white hover:text-yellow-400"
                                    >
                                        {el.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
            <div className="mt-8 py-6 border-t border-gray-700 items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0 text-gray-400">
                    &copy; 2022 Float UI All rights reserved.
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                        <li className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center">
                            <a href="javascript:void()">
                                <svg
                                    className="svg-icon w-6 h-6 text-yellow-400"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="..." />
                                </svg>
                            </a>
                        </li>
                        {/* Repeat similar structure for other social icons */}
                    </ul>
                </div>
            </div>
        </footer>
    );
};
