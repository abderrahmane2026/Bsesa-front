import { Link } from "react-router-dom";

export default function ContactSection() {
  const contactMethods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      contact: "07 Edgehead Road Pathhead. Scotland. EH37 5RW",
      title: "Our Office",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      contact: "00447988817717",
      title: "Phone",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
      contact: "Edu@bsesac.co.uk",
      title: "Email",
    },
  ];

  return (
    <div className="bg-[#111111] text-white py-14">
      <main className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl space-y-3 mb-10">
          <h3 className="text-yellow-400 font-semibold">Contact</h3>
          <p className="text-3xl font-bold sm:text-4xl">Get in touch with us</p>
          <p className="text-gray-400">
            We're here to help you with any inquiries about our sports programs,
            training schedules, or other services. Feel free to reach out!
          </p>
        </div>
        <div>
          <ul className="mt-12 flex flex-wrap gap-x-12 gap-y-6 items-center lg:gap-x-24">
            {contactMethods.map((item, idx) => (
              <li key={idx}>
                <h4 className="text-lg font-medium text-yellow-400">
                  {item.title}
                </h4>
                <div className="mt-3 flex items-center gap-x-3">
                  <div className="flex-none text-gray-400">{item.icon}</div>
                  <p>{item.contact}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form className="mt-8">
          <Link to="/Contact">
            <button className="bg-yellow-400 text-black font-semibold px-4 py-3 rounded-md shadow-md hover:bg-yellow-500 transition duration-200">
              Contact Us
            </button>
          </Link>
        </form>
      </main>
    </div>
  );
}
