import './UsersCard.css'

const CryptoCard = ({ image }) => {
    return (
        <div className='card'>
            <div className='card_info'>
                <h2>{image}</h2>
            </div>
        </div>
    )
}

export default CryptoCard