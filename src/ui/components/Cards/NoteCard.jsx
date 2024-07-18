
export default function NoteCard({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete, 
    onPinNote
}) {
    return (
        <div className="border rounded p-4  bg-while hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium">{title}</h6>
                    <span className="text-xs text-slate-500">{date}</span>
                </div>

                <span className={`icon-btn: ${isPinned ? 'text-primary' : 'text-slate-300'}`}>💀</span>

            </div>
            <p className="text-xs text-slate-600 mt-2"> {content?.slice(0, 60)} </p>
            
            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-slate-500"></div>
                <div className="flex items-center gap-2">
                    <span className="icon-btn hover:text-green-600" onClick={onEdit}>edit</span>
                    <span className="icon-btn hover:text-red-500" onClick={onDelete}>delete</span>
                </div>
            </div>

        </div>
    )
}