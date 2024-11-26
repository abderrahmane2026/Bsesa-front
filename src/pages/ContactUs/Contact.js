import contactpic from "../../assets/pictur/Contact us-amico.png"
import "./Contact.css"

export default function ContactUs(){
    return (
        <div className="contactus-page bg-[#1A1A1A] text-white">
            <main className="flex overflow-hidden">
                <div className="contact-img flex-1 hidden lg:block">
                    <img src={contactpic} className="object-cover" alt="Contact Us" />
                </div>
                <div className="py-12 flex-1 lg:flex lg:justify-center lg:h-screen">
                    <div className="max-w-lg flex-1 mx-auto px-4 text-gray-400">
                        <div>
                            <h2 className="text-yellow-400 text-3xl font-semibold sm:text-4xl">
                                Contact Us
                            </h2>
                            <p className="mt-3">
                                We’d love to hear from you! Please fill out the form below.
                            </p>
                        </div>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="space-y-5 mt-12 lg:pb-12"
                        >
                            <div>
                                <label className="font-medium text-white">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-300 bg-[#333333] outline-none border border-gray-600 focus:border-yellow-400 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-300 bg-[#333333] outline-none border border-gray-600 focus:border-yellow-400 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium text-white">
                                    Phone number
                                </label>
                                <div className="relative mt-2">
                                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r border-gray-600 pr-2 text-gray-300">
                                        +213
                                    </div>
                                    <input
                                        type="number"
                                        placeholder=" 000-000"
                                        required
                                        className="w-full pl-[4.5rem] pr-3 py-2 text-gray-300 bg-[#333333] outline-none border border-gray-600 focus:border-yellow-400 shadow-sm rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="font-medium text-white">
                                    Message
                                </label>
                                <textarea required className="w-full mt-2 h-36 px-3 py-2 text-gray-300 bg-[#333333] resize-none outline-none border border-gray-600 focus:border-yellow-400 shadow-sm rounded-lg"></textarea>
                            </div>
                            <button
                                className="w-full px-4 py-2 text-white font-medium bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg duration-150"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
