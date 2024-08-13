export default function Nav() {
  return (
    <div className="shadow-xl flex justify-between text-nowrap">
      <div className=" text-5xl font-thin p-6">Movie Break 🎬</div>

      <div className="list-none mt-6 text-2xl items-center">
        <ul className="flex flex-row">
          <li className="mr-4 p-2 font-semibold cursor-pointer hover:text-slate-700 duration-200">
            Contact
          </li>
          <li className="mr-4 p-2 font-semibold cursor-pointer hover:text-slate-700 duration-200">
            About
          </li>
        </ul>
      </div>
    </div>
  );
}
