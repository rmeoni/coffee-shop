import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../assets/styles/ConfirmationPage.css';
import '../assets/styles/globalStyles';

const ConfirmationPage = () => {
    const { cartItems, updateCart, setBanner, clearBannerMessage } = useCart();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [order, setOrder] = useState(null);
    const [isFlowChecked, setIsFlowChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading for skeleton
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Check if the user is in the checkout flow and if the cart is not empty
    useEffect(() => {
        const checkoutFlowStatus = localStorage.getItem('isInCheckoutFlow');
        const confirmedOrderStatus = localStorage.getItem('confirmedOrder');

        // Redirect to home if:
        // 1. The cart is empty AND no order is confirmed
        // 2. The user is not in the checkout flow
        if ((cartItems.length === 0 && confirmedOrderStatus !== 'true') || checkoutFlowStatus !== 'true') {
            navigate('/');
        } else {
            setIsFlowChecked(true);
        }
    }, [cartItems, navigate]);

    // Clear the checkout flow and set a default banner message
    useEffect(() => {
        if (isFlowChecked) {
            localStorage.removeItem('isInCheckoutFlow');
            clearBannerMessage();
            setBanner({ message: t('banner.default_message'), type: 'error' });

            // Clear the banner message after 5 seconds
            const timer = setTimeout(() => {
                clearBannerMessage();
            }, 5000);

            return () => clearTimeout(timer); // Clean up timer on unmount
        }
    }, [isFlowChecked, clearBannerMessage, setBanner, t]);

    const calculateTotal = useCallback(() => {
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }, [cartItems]);

    const clearCart = useCallback(() => {
        cartItems.forEach((item) => updateCart(item.id, 0));
    }, [cartItems, updateCart]);

    useEffect(() => {
        if (cartItems.length > 0 && !order) {
            const orderData = {
                orderNumber: generateOrderNumber(),
                estimatedDeliveryDate: calculateDeliveryDate(),
                items: cartItems,
                total: calculateTotal(),
            };
            setOrder(orderData);
            clearCart();
            localStorage.setItem('confirmedOrder', 'true'); // Mark the order as confirmed
        }
    }, [cartItems, order, calculateTotal, clearCart]);

    const generateOrderNumber = () => {
        const randomNum = Math.floor(Math.random() * 999) + 1;
        return `SO-${String(randomNum).padStart(3, '0')}`;
    };

    const calculateDeliveryDate = () => {
        const currentDate = new Date();
        let businessDaysAdded = 0;
        while (businessDaysAdded < 5) {
            currentDate.setDate(currentDate.getDate() + 1);
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                businessDaysAdded++;
            }
        }
        return currentDate.toLocaleDateString();
    };

    return (
        <>
            <Header />
            <div className='order-confirmation'>
                <div className="order-confirmation-section">
                    <h2>Order #:</h2>
                    <div className="section-details">
                        {isLoading ? <Skeleton width={200} /> : <p>{order?.orderNumber}</p>}
                    </div>
                </div>
                <div className="order-confirmation-section">
                    <h2>Estimated Delivery Date:</h2>
                    <div className="section-details">
                        {isLoading ? <Skeleton width={200} /> : <p>{order?.estimatedDeliveryDate}</p>}
                    </div>
                </div>
                <div className="checkout-summary">
                    <h2 style={{ marginBottom: 28 }}>Summary</h2>
                    <div className="cart-wrapper" id="checkout-summary">
                        <div className="cart-items">
                            {isLoading ? (
                                [...Array(cartItems.length)].map((_, index) => (
                                    <div key={index} className="cart-item">
                                        <div className="cart-item-product">
                                            <p className="cart-item-header"><Skeleton width={80} /></p>
                                            <p><Skeleton width={300} /></p>
                                        </div>
                                        <div className="loading-cart-item-quantity-selector">
                                            <p className="cart-item-header"><Skeleton width={80} /></p>
                                            <Skeleton width={80} height={32} style={{ marginRight: '10px' }} />
                                        </div>
                                        <div>
                                            <p className="cart-item-header"><Skeleton width={80} /></p>
                                            <span><Skeleton width={50} /></span>
                                        </div>
                                        <div>
                                            <p className="cart-item-header"><Skeleton width={80} /></p>
                                            <span><Skeleton width={50} /></span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                order?.items.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-product">
                                            <p className="cart-item-header">{t('cart.item')}</p>
                                            <p>{item.title}</p>
                                        </div>
                                        <div className="cart-item-quantity-selector">
                                            <p className="cart-item-header">{t('cart.qty')}</p>
                                            <span>{item.quantity}</span>
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
                        <div className="order-confirmation-section">
                            <h2>Total:</h2>
                            <div className="section-details">
                                {isLoading ? <Skeleton width={200} /> : <p>${order?.total.toFixed(2)}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button className='primary-btn-l' onClick={() => navigate('/')}>Continue Shopping</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ConfirmationPage;
