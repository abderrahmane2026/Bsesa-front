import { useEffect, useState } from "react";






// Search Box component
const SearchBox = ({ ...props }) => (
    <div className='relative w-full'>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5 text-gray-400 absolute left-3 inset-y-0 my-auto'>
            <path
                fillRule='evenodd'
                d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                clipRule='evenodd'
            />
        </svg>

        <input
            {...props}
            type='email'
            className='w-full pl-12 pr-3 py-2 bg-white text-sm text-gray-500 bg-transparent outline-none border ring-blue-600 focus:ring-2 shadow-sm rounded-lg duration-200'
        />
    </div>
);


export default function ServerSidebar  () {
   

    return (
        <>
            <nav
                className=" fixed z-40   h-full border-r bg-white space-y-8 overflow-auto ">
                <div className="sticky top-0 space-y-8 bg-white">
                   
                    <div className='px-4 md:px-8'>
                        <SearchBox placeholder='Search...' />
                    </div>
                </div>
                <div className='text-[0.9rem] px-2'>
                    <>
                    <div>
                    <h3 className=' px-4 font-medium text-gray-800 '>
                   Select your Stats
                   </h3>

                   {/* wilaya */}

                   <div className=" relative w-72 max-w-full mx-auto mt-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
          placeholder="stats"
        />
      </svg>
      <select className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
        <option>ALL</option>
        <option>Mila</option>
        <option>Constantine</option>
        <option>Alger</option>
      </select>
    </div>
    
    <div className="relative w-72 max-w-full mx-auto mt-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <select className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
        <option>ALL</option>
        <option>200</option>
        <option>500</option>
        <option>1000</option>
        <option>2000</option>
      </select>
    </div>
                  
                           
                           
                        </div>
                       
                    </>
                </div>
            </nav>
        </>
    );
};

