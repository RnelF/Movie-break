import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-xl flex justify-between items-center p-6 text-nowrap w-full h-32">
      <div className="relative">
        <div
          className="text-3xl font-semibold 375:text-4xl 615:text-5xl relative z-10 text-white"
          style={{
            textShadow:
              "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
          }}
        >
          MoFlix
        </div>
        <div className="text-3xl font-semibold 375:text-5xl 615:text-6xl absolute 375:left-24 615:left-32 lg:left-32 -top-5 375:-top-1 p-1 rotate-45 z-0">
          <p>🎬</p>
        </div>
      </div>

      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl 500:text-3xl 615:text-4xl focus:outline-none"
        >
          {!isOpen ? "☰" : "❌"}
        </button>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex flex-col lg:flex-row list-none text-3xl items-center fixed inset-0 justify-center bg-white bg-opacity-90 lg:static lg:bg-transparent ml-auto 1:text-lg 500:text-xl 615:text-2xl 1:w-40 500:w-48 615:w-52 1:h-44 500:h-48 615:h-52 lg:w-auto lg:h-auto 1:rounded-md  top-24 right-16`}
      >
        <ul className="flex flex-col lg:flex-row ">
          <li className="mb-4 lg:mb-0 lg:mr-4 p-2 font-semibold cursor-pointer hover:text-slate-200 duration-200 shadow-lg">
            Home
          </li>
          <li className="mb-4 lg:mb-0 lg:mr-4 p-2 font-semibold cursor-pointer hover:text-slate-200 duration-200 shadow-lg">
            Contact
          </li>
          <li className="mb-4 lg:mb-0 lg:mr-4 p-2 font-semibold cursor-pointer hover:text-slate-200 duration-200 shadow-lg">
            About
          </li>
        </ul>
      </div>
    </div>
  );
}
