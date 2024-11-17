import { React, useState } from 'react';
import { Link } from 'react-router-dom';
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
    const [failedMessage, setFailedMessage] = useState('')
    const shipping = {
        standard: { cost: 5, deliveryTime: "3-5 days" },
        free: { cost: 0, deliveryTime: "5-7 days" }
    };

    const handleChange = (e) => {
        const { couponCode, value } = e.target;
        setFormData({
            ...formData,
            [couponCode]: value
        });
    };
    const handleCouponSubmit = async (e) => {
        e.preventDefault();

        // Placeholder for the API call to send form data somewhere
        console.log('Form data submitted:', formData);

        // Show translated failed message after form submission
        setFailedMessage(t('coupon.failed'))

        // Clear the form fields after submission
        setFormData({
            couponCode: ''
        });

        // Hide the success message after a few seconds
        setTimeout(() => {
            setFailedMessage('');
        }, 5000); // 5 seconds
    };

    const handleCompleteOrder = () => {
        console.log('order completed')
    }

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
                        </div>
                    </div>
                    <div className='checkout-address'>
                        <h2>{t('checkout.address')}</h2>
                        <button className={`secondary-btn-s ${isDarkMode ? 'dark' : ''}`}>{t('checkout.new_address')}</button>
                    </div>
                    <div className='checkout-shipping'>
                        <h2>{t('shipping.title')}</h2>
                        <div className='shipping-method'>
                            <h3>{t('shipping.standard')}</h3>
                            <p>{t('shipping.standard_time')}</p>
                            <p>{t('shipping.standard_price')}</p>
                        </div>
                    </div>
                </div>
                <div className='checkout-section' id="checkout-section-right">
                    <div className='checkout-coupon'>
                        <h2>{t('checkout.coupon')}</h2>
                        <form className="coupon-form" onSubmit={handleCouponSubmit}>
                            <input
                                type="text"
                                name="Coupon Code"
                                placeholder={t('coupon.coupon_code')}
                                value={formData.couponCode}
                                onChange={handleChange}
                            />
                            <button type="submit" className={`secondary-btn-s ${isDarkMode ? 'dark' : ''}`} id="coupon-btn">
                                {t('coupon.submitButton')}
                            </button>
                        </form>
                        {failedMessage && <p className="failed-message">{failedMessage}</p>}
                    </div>
                    <div className='checkout-payment-method'>
                        <h2>{t('payment.title')}</h2>
                        <div className='payment-method'>
                            <h3>{t('payment.transfer')}</h3>
                            <p>{t('payment.transfer_description')}</p>
                        </div>
                    </div>
                    <div className='checkout-order-summary'>
                        <h2>{t('checkout.order_summary')}</h2>
                        <p>Subtotal ({cartItems.length} {t('checkout.items')}) ${total.toFixed(2)}</p>
                        <p>{t('shipping.standard')} ${shipping.standard.cost.toFixed(2)} </p>
                        <br />
                        <p><strong>Total ${total + shipping.standard.cost.toFixed(2)}</strong></p>
                    </div>
                    <div className="checkout-submit">
                        <Link to="/tienda">
                            <button className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`} style={{ marginBottom: '12px' }} id="cart-secondary-btn">
                                {t('checkout.keep_shopping')}
                            </button>
                        </Link>
                        <button onClick={handleCompleteOrder} className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`} id="cart-primary-btn">
                            {t('checkout.complete_order')}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CheckoutPage;
