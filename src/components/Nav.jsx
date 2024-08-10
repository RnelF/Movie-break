export default function Nav() {
  return (
    <div className="shadow-xl flex justify-between">
      <div className=" text-5xl font-thin p-6">Movie Break 🎬</div>

      <div className="list-none mt-6 text-2xl items-center">
        <ul className="flex flex-row">
          <li className="mr-4">
            <input
              className="w-68 border border-b-slate-400 p-2"
              type="text"
              placeholder="Search"
            />
            <button className="border border-slate-500 rounded-md p-2">
              🔍
            </button>
          </li>
          <li className="mr-4 p-2 cursor-pointer">Contact</li>
          <li className="mr-4 p-2 cursor-pointer">About</li>
        </ul>
      </div>
    </div>
  );
}
