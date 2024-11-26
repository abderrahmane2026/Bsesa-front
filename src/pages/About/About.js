import ServiceSection from "../../components/service Section/ServiceSection";

export default function AboutUsPage() {
    const team = [
        {
            avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "John Smith",
            title: "Performance Coach",
            desc: "John is an expert in sports performance, helping athletes reach their full potential through personalized coaching and advanced techniques.",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
        {
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "Michael Brown",
            title: "Strength & Conditioning Specialist",
            desc: "With over 10 years of experience, Michael develops custom strength and conditioning programs tailored to athletes of all levels.",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
        {
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            name: "Sarah Lee",
            title: "Sports Nutritionist",
            desc: "Sarah specializes in sports nutrition, helping athletes optimize their diets for peak performance and recovery.",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
    ];

    return (
        <div className="bg-[#111111] text-white">
            {/* Hero Section */}
            <section className="relative bg-[#111111]">
                <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
                    <div className="space-y-5 max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl text-yellow-400 font-extrabold mx-auto md:text-5xl">
                            Empowering Athletes Through Expert Coaching and Training
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-400">
                            At Sports Academy, we are committed to providing world-class coaching, fitness training, and sports science services to athletes of all levels. Whether you're an aspiring amateur or a professional athlete, our team is here to support your journey towards excellence.
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg" style={{ background: "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)" }}></div>
            </section>

            <ServiceSection/>

            {/* Mission and Values Section */}
            <section className="mt-8 mx-auto max-w-screen-xl bg-[#111111] pb-12 px-4 items-center lg:flex md:px-8">
                <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                    <h1 className="text-yellow-400 font-bold text-4xl xl:text-5xl">
                        Our Mission & Values
                    </h1>
                    <p className="text-gray-400 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                        Our mission is to provide athletes with the tools and training they need to succeed, regardless of their skill level. We believe in the power of hard work, dedication, and science-based training to unlock an athlete’s true potential. We prioritize safety, sustainability, and results-driven programs that yield long-term success.
                    </p>
                    <div>
                        <p className="text-white py-3">
                            Interested in joining our community? Subscribe to our newsletter and stay updated on the latest trends in sports science and performance.
                        </p>
                        <form className="items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="text-gray-300 bg-[#333333] border border-gray-600 outline-none p-3 rounded-md w-full sm:w-72"
                            />
                            <button className="outline-none bg-yellow-400 text-black text-center px-4 py-3 rounded-md shadow w-full ring-offset-2 ring-yellow-400 focus:ring-2 sm:w-auto hover:bg-yellow-500 transition-colors duration-200">
                                Subscribe 
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
                    <img src="https://i.postimg.cc/kgd4WhyS/container.png" className="w-full mx-auto sm:w-10/12 lg:w-full" alt="Sports training" />
                </div>
            </section>

            {/* Services Section */}
            <section className="py-14 bg-[#111111]">
                <div className="max-w-screen-xl mx-auto  px-4 text-center md:px-8">
                    <div className="max-w-xl mx-auto">
                        <h3 className="text-yellow-400 text-3xl font-semibold sm:text-4xl">
                            Our Services
                        </h3>
                        <p className="text-gray-400 mt-3">
                            At Sports Academy, we offer a wide range of services designed to help athletes improve their physical and mental performance. Our services include:
                        </p>
                    </div>
                    <div className="mt-12">
                        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                            <li className="text-left">
                                <h4 className="text-yellow-400 font-semibold">Personalized Training</h4>
                                <p className="text-gray-400">One-on-one training sessions customized to your needs and goals.</p>
                            </li>
                            <li className="text-left">
                                <h4 className="text-yellow-400 font-semibold">Group Training</h4>
                                <p className="text-gray-400">Small group sessions focused on teamwork, strategy, and shared progress.</p>
                            </li>
                            <li className="text-left">
                                <h4 className="text-yellow-400 font-semibold">Sports Nutrition</h4>
                                <p className="text-gray-400">Nutritional plans designed to fuel your body for optimal performance.</p>
                            </li>
                            <li className="text-left">
                                <h4 className="text-yellow-400 font-semibold">Strength & Conditioning</h4>
                                <p className="text-gray-400">Develop strength, endurance, and agility through specialized conditioning programs.</p>
                            </li>
                            <li className="text-left">
                                <h4 className="text-yellow-400 font-semibold">Performance Analysis</h4>
                                <p className="text-gray-400">Comprehensive performance reviews using advanced data tracking tools.</p>
                            </li>
                            <li className="text-left">
                                <h4 className="text-yellow-400 font-semibold">Mental Coaching</h4>
                                <p className="text-gray-400">Strategies for building mental resilience, focus, and confidence.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Meet the Team Section */}
            <section className="py-14 bg-[#111111]">
                <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
                    <div className="max-w-xl mx-auto">
                        <h3 className="text-yellow-400 text-3xl font-semibold sm:text-4xl">
                            Meet Our Team
                        </h3>
                        <p className="text-gray-400 mt-3">
                            Our team consists of highly skilled professionals with years of experience in sports coaching, nutrition, and performance training. Their dedication to excellence ensures that each athlete receives the support they need to succeed.
                        </p>
                    </div>
                    <div className="mt-12">
                        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                            {
                                 team.map((item, idx) => (
                                    <li key={idx}>
                                        <div className="w-24 h-24 mx-auto">
                                            <img
                                                src={item.avatar}
                                                className="w-full h-full rounded-full"
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <h4 className="text-yellow-400 font-semibold sm:text-lg">{item.name}</h4>
                                            <p className="text-indigo-400">{item.title}</p>
                                            <p className="text-gray-400 mt-2">{item.desc}</p>
                                            <div className="mt-4 flex justify-center gap-4 text-gray-400">
                                                <a href={item.twitter}>
                                                    <svg className="w-5 h-5 duration-150 hover:text-yellow-500" fill="currentColor" viewBox="0 0 48 48"><g clipPath="url(#clip0_17_80)"><path fill="currentColor" d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z" /></g><defs><clipPath id="clip0_17_80"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </a>
                                                <a href={item.linkedin}>
                                                    <svg className="w-5 h-5 duration-150 hover:text-yellow-500" fill="none" viewBox="0 0 48 48"><g clipPath="url(#clip0_17_68)"><path fill="currentColor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z" /></g><defs><clipPath id="clip0_17_68"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
