import UsersCard from './UsersCard'
import "./UsersList.css"

const UsersList = ({ coinsData }) => {
    return (
        <div className='crypto_list'>
            {
                coinsData.map((coin, index) => {
                    return (
                        <UsersCard 
                            key={index}
                            image={coin.email}
                        />
                    )
                })
            }
        </div>
    )
}

export default UsersList