import "./LoadingStyle.css"

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="spinner loading"></div>
        </div>
    )
}