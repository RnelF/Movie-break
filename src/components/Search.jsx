
export default function Search({ movieId,setMovieId }){
    
  return <div>
    <input
              className="w-68 border border-b-slate-400 p-2"
              type="text"
              placeholder="Search"
              onChange={}
            />
            <button className="border border-slate-500 rounded-sm p-2 hover:bg-slate-700 duration-300">
              🔍
            </button>
  </div>
}