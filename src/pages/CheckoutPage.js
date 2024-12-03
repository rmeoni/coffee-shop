import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import '../assets/styles/CheckoutPage.css';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CheckoutPage = () => {
    const { cartItems, updateCart, setBanner, clearBannerMessage } = useCart();
    const { isDarkMode } = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const [formData, setFormData] = useState({ name: '', email: '', couponCode: '' });
    const [addressData, setAddressData] = useState({ address: '', city: '', postalCode: '' });
    const [failedMessage, setFailedMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isCartEmpty, setIsCartEmpty] = useState(false);

    const breadcrumbs = [
        { name: t('breadcrumbs.home'), link: '/' },
        { name: t('breadcrumbs.cart'), link: '/carrito' },
        { name: t('breadcrumbs.checkout'), link: '' },
    ];


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
            setIsCartEmpty(true);
        } else {
            setIsCartEmpty(false);
        }
    }, [cartItems]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        if (!addressData.address || !addressData.city || !addressData.postalCode) {
            setBanner({ message: t('checkout.address_error'), type: 'error' });
            return;
        }
        setBanner({ message: t('checkout.address_added'), type: 'success' });
    };

    const handleCouponSubmit = (e) => {
        e.preventDefault();
        setFailedMessage(t('coupon.failed'));
        setFormData({ ...formData, couponCode: '' });
        setTimeout(() => setFailedMessage(''), 5000);
    };

    const handleCompleteOrder = () => {
        if (isCartEmpty) {
            setBanner({ message: t('cart.cart_empty_error'), type: 'error' });
            return;
        }

        // Check if the address fields are complete
        if (!addressData.address || !addressData.city || !addressData.postalCode) {
            setBanner({ message: t('checkout.address_error'), type: 'error' });
            return;
        }

        const orderDetails = {
            items: cartItems,
            total: total + 5.0,
            address: addressData,
            user: { name: formData.name, email: formData.email },
        };

        // Placeholder for API call
        console.log('Order Submitted:', orderDetails);

        localStorage.setItem('isInCheckoutFlow', 'true');
        clearBannerMessage();
        setTimeout(() => {
            navigate('/order-confirmation');
        }, 100);
    };

    return (
        <>
            <Header />
            <Breadcrumbs items={breadcrumbs} />
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
                                    !isCartEmpty ? (
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
                                    ) : (
                                        <div>
                                            <p>{t('cart.cart_empty')}</p>
                                        </div>
                                    )
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
                            <>
                                <form className="address-form" onSubmit={handleAddressSubmit}>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder={t('checkout.address_placeholder')}
                                        value={addressData.address}
                                        onChange={handleAddressChange}
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder={t('checkout.city_placeholder')}
                                        value={addressData.city}
                                        onChange={handleAddressChange}
                                    />
                                    <input
                                        type="text"
                                        name="postalCode"
                                        placeholder={t('checkout.postal_code_placeholder')}
                                        value={addressData.postalCode}
                                        onChange={handleAddressChange}
                                    />
                                </form>
                                <button
                                    type="submit"
                                    className={`secondary-btn-s ${isDarkMode ? 'dark' : ''}`}
                                >
                                    {t('checkout.new_address')}
                                </button>
                            </>
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
                            <>
                                <form className="coupon-form" onSubmit={handleCouponSubmit}>
                                    <input
                                        type="text"
                                        name="couponCode"
                                        placeholder={t('coupon.coupon_code')}
                                        value={formData.couponCode}
                                        onChange={handleChange}
                                    />
                                </form>
                                <button
                                    type="submit"
                                    className={`secondary-btn-s ${isDarkMode ? 'dark' : ''}`}
                                    id="coupon-btn"
                                >
                                    {t('coupon.submitButton')}
                                </button>
                            </>
                        )}
                        {failedMessage && <p className="failed-message">{failedMessage}</p>}
                    </div>
                    <div className="checkout-payment-method checkout-section">
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
                    <div className="checkout-section">
                        {isLoading ? (
                            <Skeleton width={300} height={36} style={{ marginBottom: '28px' }} />
                        ) : (
                            <>
                                <h2>{t('checkout.notes_title')}</h2>
                                <form className="form" onSubmit={handleCouponSubmit}>
                                    <input
                                        type="text"
                                        name="orderNote"
                                        placeholder={t('checkout.notes_placeholder')}
                                        value={formData.notes}
                                        onChange={handleChange}
                                    />
                                </form>
                            </>
                        )}

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
                                <Link to="/tienda">
                                    <button
                                        className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`}
                                        style={{ marginBottom: '12px' }}
                                        id="cart-secondary-btn"
                                    >
                                        {t('cart.close_cart')}
                                    </button>
                                </Link>
                                <button
                                    onClick={handleCompleteOrder}
                                    className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}
                                    id="cart-primary-btn"
                                >
                                    {t('checkout.complete_order')}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
};

export default CheckoutPage;
