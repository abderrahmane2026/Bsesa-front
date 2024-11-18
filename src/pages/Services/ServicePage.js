import servpic from "../../assets/pictur/Motherhood-cuate (1).png"
import ServerSidebar from "./Sidebar"
import "./ServicePage.css"
import { Button } from "react-bootstrap"



const posts = [
    {
        title: "What is SaaS? Software as a Service Explained",
        desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people.",
        img: {servpic}
        ,        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "A Quick Guide to WordPress Hosting",
        desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations.",
        img: {servpic},
        date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "7 Promising VS Code Extensions Introduced in 2022",
        desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks.",
        img: {servpic},
                date: "Jan 4 2022",
        href: "javascript:void(0)"
    },
    {
        title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
        desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational.",
        img: {servpic},
                date: "Jan 4 2022",
        href: "javascript:void(0)"
    }
]

export default function ServicePage () {
    return (
        <div className="Service-page">
            <div className="sidebar">
           <ServerSidebar/>
            </div>
        <section className=" service-items py-10">
           
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">

                    <h1 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">Our Service</h1>

                    <p className="text-gray-600">Are you looking for a trusted nanny to care for your child? Or a safe and enjoyable daycare to start their educational journey?</p>

                </div>
            </div>

            <div className="service-button">

            <Button variant="outline-danger">Nanny</Button>
            <Button variant="outline-danger">House Keeper</Button>
            <Button variant="outline-danger">kindergartens</Button>

            </div>
            <div className="service-container">
                <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        posts.map((items, key) => (
                            <li className="w-full mx-auto group sm:max-w-sm" key={key}>
                                <div href={items.href}>
                                    <img src={servpic} loading="lazy" alt={items.title} className="w-full rounded-lg" />
                                    <div className="mt-3 space-y-2">
                                        <span className="block text-red-600 text-sm">{items.date}</span>
                                        <h3 className="text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold ">
                                            {items.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">{items.desc}</p>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
           
        </section>
        </div>
    )
}