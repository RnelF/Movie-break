import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-xl flex justify-between items-center p-6 text-nowrap">
      <div className="text-3xl font-semibold">Movie Break 🎬</div>

      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {!isOpen ? "☰" : "❌"}
        </button>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex flex-col lg:flex-row list-none mt-6 text-2xl items-center fixed inset-0 justify-center bg-white bg-opacity-90 lg:static lg:bg-transparent w-60 h-48 left-16 top-16`}
      >
        <ul className="flex flex-col lg:flex-row">
          <li className="mb-4 lg:mb-0 lg:mr-4 p-2 font-semibold cursor-pointer hover:text-slate-700 duration-200 shadow-lg">
            Home
          </li>
          <li className="mb-4 lg:mb-0 lg:mr-4 p-2 font-semibold cursor-pointer hover:text-slate-700 duration-200 shadow-lg">
            Contact
          </li>
          <li className="mb-4 lg:mb-0 lg:mr-4 p-2 font-semibold cursor-pointer hover:text-slate-700 duration-200 shadow-lg">
            About
          </li>
        </ul>
      </div>
    </div>
  );
}
