import { useState } from "react"

export default function TagInput({ tags, setTags }) {


    const [inputValue, setInputValue] = useState('')

    const addNewTag = () => {

        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()])
            setInputValue('')
        }
    }

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            addNewTag()
        }

    }


    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }
    console.log(tags) 
    return (

        <div>
            {tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-2">
                {tags.map((tag, index) => (
                <span
                    key={index}
                    className="flex items-center gap-2 text-sm text-slate-900 bg-slate-50 px-3 py-1 rounded"
                >
                    # {tag}
                    <button onClick={() => handleRemoveTag(tag)}>
                    X
                    </button>
                </span>
                ))}
            </div>
            )}

            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    className="text-sm bg-transparent border px-3 py-2 rounded"
                    placeholder="Add tags"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-blue-700 hover:bg-blue-700"
                    onClick={addNewTag}
                >
                    <span className="text-2xl text-blue-700 hover:text-white">+</span>
                </button>
            </div>
        </div>
    )
}