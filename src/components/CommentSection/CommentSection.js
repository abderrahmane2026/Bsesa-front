import React from 'react';
import commentsData from './commentData.json';

const TestimonialsPage = () => {
  return (
    <section className="py-14 bg-[#1A1A1A] text-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl sm:text-center md:mx-auto">
          <h3 className="text-yellow-400 text-3xl font-semibold sm:text-4xl">
            See what others are saying about us
          </h3>
          <p className="mt-3 text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta nunc vitae, gravida justo. Nunc fermentum magna lorem, euismod volutpat arcu volutpat et.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commentsData.map((item, idx) => (
              <li key={idx} className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <figure>
                  <div className="flex items-center gap-x-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-900">
                        {item.author[0]}
                      </span>
                    </div>
                    <div>
                      <span className="block text-yellow-400 font-semibold">{item.author}</span>
                      <span className="block text-gray-500 text-sm mt-0.5">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <blockquote>
                    <p className="mt-6 text-gray-300">{item.content}</p>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
