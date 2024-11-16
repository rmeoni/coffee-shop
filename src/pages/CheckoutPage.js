import { React, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import '../assets/styles/CheckoutPage.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const CheckoutPage = () => {
    const { cartItems, updateCart } = useCart();
    const { isDarkMode } = useTheme();
    const { t } = useTranslation(); // Import the t function
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleCouponSubmit = async (e) => {
        e.preventDefault();

        // Placeholder for the API call to send form data somewhere
        console.log('Form data submitted:', formData);

        // Show translated success message after form submission
        setSuccessMessage(t('newsletter.successMessage'));

        // Clear the form fields after submission
        setFormData({
            name: '',
            email: ''
        });

        // Hide the success message after a few seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 5000); // 5 seconds
    };

    return (
        <>
            <Header />
            <div className='checkout'>
                <div className='checkout-section'>
                    <h2>{t('checkout.summary')}</h2>
                    <div className="cart-wrapper" id="checkout-summary">
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-product">
                                        <p className="cart-item-header">{t('cart.item')}</p> {/* Translated "Artículo" */}
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="cart-item-quantity-selector">
                                        <p className="cart-item-header">{t('cart.qty')}</p> {/* Translated "Qty" */}
                                        <button onClick={() => updateCart(item.id, Math.max(item.quantity - 1, 0))}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <div>
                                        <p className="cart-item-header">{t('cart.price')}</p> {/* Translated "Precio" */}
                                        <span>${item.price.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <p className="cart-item-header">{t('cart.amount')}</p> {/* Translated "Monto" */}
                                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                            <h3>{t('cart.total')}: ${total.toFixed(2)}</h3> {/* Translated "Total" */}
                        </div>
                    </div>
                    <div className='checkout-address'>
                        <h2>{t('checkout.address')}</h2>
                        <button className={`secondary-btn-s ${isDarkMode ? 'dark' : ''}`}>{t('checkout.new_address')}</button>
                    </div>
                    <div className='checkout-shipping'>
                        <h2>{t('checkout.shipping_method')}</h2>
                    </div>
                </div>
                <div className='checkout-section' id="checkout-section-right">
                    <div className='checkout-coupon'>
                        <h2>{t('checkout.coupon')}</h2>
                        <form className="newsletter-form" onSubmit={handleCouponSubmit}>
                            <input
                                type="text"
                                name="Coupon Code"
                                placeholder={t('checkout.coupon_code')}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className={`secondary-btn-s ${isDarkMode ? 'dark' : ''}`} id="coupon-btn">
                                {t('newsletter.submitButton')}
                            </button>
                        </form>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>
                    <div className='checkout-payment-method'>
                        <h2>{t('checkout.payment_method')}</h2>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CheckoutPage;
