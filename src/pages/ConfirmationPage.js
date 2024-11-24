import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../assets/styles/ConfirmationPage.css';
import '../assets/styles/globalStyles';

const ConfirmationPage = () => {
    const { cartItems, updateCart, setBanner, clearBannerMessage  } = useCart();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [order, setOrder] = useState(null); // Store order data here
    const [isFlowChecked, setIsFlowChecked] = useState(false);

    useEffect(() => {
        const checkoutFlowStatus = localStorage.getItem('isInCheckoutFlow');
        console.log('isInCheckoutFlow on ConfirmationPage:', checkoutFlowStatus);

        if (checkoutFlowStatus !== 'true') {
            console.log('User is not in the checkout flow. Redirecting to home...');
            navigate('/'); // Redirect if not in checkout flow
        } else {
            // Set the flag after checking flow status
            setIsFlowChecked(true);
        }
    }, [navigate]);

    // After the confirmation page is loaded, remove the flow status
    useEffect(() => {
        if (isFlowChecked) {
            // Remove localStorage item after the page is confirmed
            localStorage.removeItem('isInCheckoutFlow');
            console.log('isInCheckoutFlow removed from localStorage');
            clearBannerMessage();
            setBanner({ message: t('banner.default_message'), type: 'error' });
        }
    }, [isFlowChecked, clearBannerMessage, setBanner, t]);



    const calculateTotal = useCallback(() => {
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }, [cartItems]);

    const clearCart = useCallback(() => {
        cartItems.forEach((item) => updateCart(item.id, 0));
    }, [cartItems, updateCart]);

    useEffect(() => {
        // If cart has items and order is not set, create the order and clear the cart
        if (cartItems.length > 0 && !order) {
            const orderData = {
                orderNumber: generateOrderNumber(),
                estimatedDeliveryDate: calculateDeliveryDate(),
                items: cartItems,
                total: calculateTotal(),
            };
            setOrder(orderData); // Set order details
            clearCart(); // Clear cart after storing order data
        }
    }, [cartItems, order, calculateTotal, clearCart]); // Added `calculateTotal` and `clearCart` to dependencies

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
                        {order ? <p>{order.orderNumber}</p> : <Skeleton width={200} />}
                    </div>
                </div>
                <div className="order-confirmation-section">
                    <h2>Estimated Delivery Date:</h2>
                    <div className="section-details">
                        {order ? <p>{order.estimatedDeliveryDate}</p> : <Skeleton width={200} />}
                    </div>
                </div>
                <div className="checkout-summary">
                    <h2 style={{marginBottom: 28}}>Summary</h2>
                    <div className="cart-wrapper" id="checkout-summary">
                        <div className="cart-items">
                            {order?.items ? (
                                order.items.map(item => (
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
                            ) : (
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
                            )}
                        </div>
                        <div className="order-confirmation-section">
                            <h2>Total:</h2>
                            <div className="section-details">
                                {order ? <p>${order.total.toFixed(2)}</p> : <Skeleton width={200} />}
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
