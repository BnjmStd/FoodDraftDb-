
export default function SearchBar ({ value, onChange, handleSearch, onClearSearch }) {
    return (
        <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md gap-4">
            <input 
                type="text"
                placeholder="Search Notes"
                className="w-full text-xs bg-transparent py-[11px] outline-none"
                value={value}
                onChange={onChange}
            />

            { value && <span className="text-xl text-slate-500 cursor-pointer" onClick={onClearSearch}>x</span> }

            <span className="text-slate-400 cursor-pointer hover:text-black">??</span>
        </div>
    )
}
