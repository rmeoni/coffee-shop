import { React } from 'react';
import '../assets/styles/CheckoutPage.css';
import Header from '../components/Header/Header';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Cart from '../components/Cart/Cart'; // Import the Cart component
import Footer from '../components/Footer/Footer';

const CartPage = () => {
    const { t } = useTranslation();
    const breadcrumbs = [
        { name: t('breadcrumbs.home'), link: '/' },
        { name: t('breadcrumbs.cart'), link: '' },
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
