import "./pagination.css"
import { 
    FaRegArrowAltCircleRight, 
    FaRegArrowAltCircleLeft 
} from "react-icons/fa";

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage
}: {
    totalPosts: number
    postsPerPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
}) => {

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className="pagination">
            <div onClick={() => setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)} className="arrow"><FaRegArrowAltCircleLeft /></div>
            {
                pages.map((page, index) => {
                    return <button
                        className={page == currentPage ? 'active' : ''}
                        key={index}
                        onClick={() => setCurrentPage(page)}>{page}</button>
                })
            }
            <div onClick={() => setCurrentPage(currentPage == pages.length ? currentPage : currentPage + 1)}
                className="arrow"><FaRegArrowAltCircleRight /></div>
        </div>
    )
}

export default Pagination