import { React } from 'react';
import '../assets/styles/CheckoutPage.css';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Cart from '../components/Cart/Cart'; // Import the Cart component
import Footer from '../components/Footer/Footer';

const CartPage = () => {
    const breadcrumbs = [
        { name: 'Home', link: '/' },
        { name: 'Cart', link: '' },
    ];
    return (
        <>
            <Header />
            <Breadcrumbs items={breadcrumbs} />
            <div className='checkout'>
                <div className='checkout-section'>
                    <Cart />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CartPage;
