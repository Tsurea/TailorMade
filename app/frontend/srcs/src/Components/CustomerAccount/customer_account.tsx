import './customer_account.css'

export function CustomerAccount() {

    return (
        <main id="customer_account_main">
            <h1>CUSTOMER ACCOUNT</h1>
            <div id="customer_account_name">
                <h2>Madame Clémentine Figaro</h2>
                <button>LOGOUT</button>
            </div>
            <div className="customer_account_category">
                <div className='customer_account_category_title'>
                    <img src="../../../assets/heart.png" alt="Favorites" />
                    <h3>FAVORITES</h3>
                </div>
                <a href="">Favorites</a>
                <a href="">Newsletter</a>
                <br/>
            </div>
            <div className="customer_account_category">
                <div className='customer_account_category_title'>
                    <img src="../../../assets/profile.png" alt="Favorites" />
                    <h3>PROFILE</h3>
                </div>
                <a href="">Personal data</a>
                <a href="">Address book</a>
                <div id="customer_account_avatar">
                    <a href="/uncomplete_customer_account">Avatar</a>
                    <div id="customer_account_avatar_progress">
                        <img id="success" src="../../../assets/success.png" alt="Avatar" />
                        <p>Complete, 100%</p>
                    </div>
                </ div>
                <br/>
            </div>
            <div className="customer_account_category">
                <div className='customer_account_category_title'>
                    <img src="../../../assets/orders.png" alt="Favorites" />
                    <h3>ORDERS</h3>
                </div>
                <a href="">Orders Fashion and accessories</a>
                <a href="">Take an order</a>
                <br/>
            </div>
        </ main>
    )
}
