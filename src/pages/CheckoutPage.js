import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import '../assets/styles/CheckoutPage.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CheckoutPage = () => {
    const { cartItems, updateCart, clearBannerMessage } = useCart();
    const { isDarkMode } = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const [formData, setFormData] = useState({ name: '', email: '', couponCode: '' });
    const [failedMessage, setFailedMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            clearBannerMessage();
        }, 5000);

        return () => clearTimeout(timer);
    }, [clearBannerMessage]);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
    }, [cartItems, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCouponSubmit = (e) => {
        e.preventDefault();
        setFailedMessage(t('coupon.failed'));
        setFormData({ ...formData, couponCode: '' });
        setTimeout(() => setFailedMessage(''), 5000);
    };

    const handleCompleteOrder = () => {
        localStorage.setItem('isInCheckoutFlow', 'true');
        clearBannerMessage();
        setTimeout(() => {
            navigate('/order-confirmation');
        }, 100);
    };

    return (
        <>
            <Header />
            <div className="checkout">
                <div className="checkout-section">
                    <div className="checkout-summary">
                        {isLoading ? (
                            <Skeleton width={200} height={36} style={{ marginBottom: '28px' }} />
                        ) : (
                            <h2>{t('checkout.summary')}</h2>
                        )}
                        <div className="cart-wrapper" id="checkout-summary">
                            <div className="cart-items">
                                {isLoading ? (
                                    [...Array(cartItems.length)].map((_, index) => (
                                        <div key={index} className="cart-item">
                                            <div className="cart-item-product">
                                                <p className="cart-item-header">
                                                    <Skeleton width={80} />
                                                </p>
                                                <p>
                                                    <Skeleton width={300} />
                                                </p>
                                            </div>
                                            <div className="loading-cart-item-quantity-selector">
                                                <p className="cart-item-header">
                                                    <Skeleton width={80} />
                                                </p>
                                                <Skeleton width={80} height={32} style={{ marginRight: '10px' }} />
                                            </div>
                                            <div>
                                                <p className="cart-item-header">
                                                    <Skeleton width={80} />
                                                </p>
                                                <span>
                                                    <Skeleton width={50} />
                                                </span>
                                            </div>
                                            <div>
                                                <p className="cart-item-header">
                                                    <Skeleton width={80} />
                                                </p>
                                                <span>
                                                    <Skeleton width={50} />
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-product">
                                                <p className="cart-item-header">{t('cart.item')}</p>
                                                <p>{item.title}</p>
                                            </div>
                                            <div className="cart-item-quantity-selector">
                                                <p className="cart-item-header">{t('cart.qty')}</p>
                                                <button onClick={() => updateCart(item.id, Math.max(item.quantity - 1, 0))}>
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <div>
                                                <p className="cart-item-header">{t('cart.price')}</p>
                                                <span>${item.price.toFixed(2)}</span>
                                            </div>
                                            <div>
                                                <p className="cart-item-header">{t('cart.amount')}</p>
                                                <span>${(item.quantity * item.price).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="checkout-address">
                        {isLoading ? (
                            <Skeleton width={200} height={36} style={{ marginBottom: '28px' }} />
                        ) : (
                            <h2>{t('checkout.address')}</h2>
                        )}
                        {isLoading ? (
                            <Skeleton width={200} height={32} style={{ borderRadius: '48px' }} />
                        ) : (
                            <button className={`secondary-btn-s ${isDarkMode ? 'dark' : ''}`}>
                                {t('checkout.new_address')}
                            </button>
                        )}
                    </div>
                    <div className="checkout-shipping">
                        {isLoading ? (
                            <Skeleton width={200} height={36} style={{ marginBottom: '28px' }} />
                        ) : (
                            <h2>{t('shipping.title')}</h2>
                        )}
                        <div className="shipping-method">
                            {isLoading ? (
                                <Skeleton count={3} width={200} />
                            ) : (
                                <>
                                    <h3>{t('shipping.standard')}</h3>
                                    <p>{t('shipping.standard_time')}</p>
                                    <p>{t('shipping.standard_price')}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="checkout-section" id="checkout-section-right">
                    <div className="checkout-coupon">
                        {isLoading ? (
                            <Skeleton width={200} height={36} style={{ marginBottom: '28px' }} />
                        ) : (
                            <h2>{t('checkout.coupon')}</h2>
                        )}
                        {isLoading ? (
                            <Skeleton width={200} height={40} />
                        ) : (
                            <form className="coupon-form" onSubmit={handleCouponSubmit}>
                                <input
                                    type="text"
                                    name="couponCode"
                                    placeholder={t('coupon.coupon_code')}
                                    value={formData.couponCode}
                                    onChange={handleChange}
                                />
                                <button
                                    type="submit"
                                    className={`secondary-btn-s ${isDarkMode ? 'dark' : ''}`}
                                    id="coupon-btn"
                                >
                                    {t('coupon.submitButton')}
                                </button>
                            </form>
                        )}
                        {failedMessage && <p className="failed-message">{failedMessage}</p>}
                    </div>
                    <div className="checkout-payment-method">
                        {isLoading ? (
                            <Skeleton width={300} height={36} style={{ marginBottom: '28px' }} />
                        ) : (
                            <h2>{t('payment.title')}</h2>
                        )}
                        <div className="payment-method">
                            {isLoading ? (
                                <>
                                    <Skeleton width={200} height={48} />
                                    <Skeleton count={2} width={200} height={20} />
                                </>
                            ) : (
                                <>
                                    <h3>{t('payment.transfer')}</h3>
                                    <p>{t('payment.transfer_description')}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="checkout-order-summary">
                        {isLoading ? (
                            <>
                                <Skeleton width={200} height={20} />
                                <Skeleton width={200} height={20} />
                                <Skeleton width={100} height={20} />
                            </>
                        ) : (
                            <>
                                <p>
                                    Subtotal ({cartItems.length} {t('checkout.items')}) ${total.toFixed(2)}
                                </p>
                                <p>
                                    {t('shipping.standard')} ${5.0.toFixed(2)}
                                </p>
                                <br />
                                <p>
                                    <strong>Total ${total + 5.0}</strong>
                                </p>
                            </>
                        )}
                    </div>
                    <div className="checkout-submit">
                        {isLoading ? (
                            <Skeleton count={2} height={64} borderRadius={40} />
                        ) : (
                            <>
                                <Link to="/carrito">
                                    <button
                                        className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`}
                                        style={{ marginBottom: '12px' }}
                                        id="cart-secondary-btn"
                                    >
                                        {t('checkout.keep_shopping')}
                                    </button>
                                </Link>
                                <button
                                    onClick={handleCompleteOrder}
                                    className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}
                                >
                                    {t('checkout.complete_order')}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CheckoutPage;
