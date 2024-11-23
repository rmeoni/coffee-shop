import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import '../assets/styles/ConfirmationPage.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ConfirmationPage = () => {
    return (
        <>
        <Header />
        <Footer />
    </>
    )
}

export default ConfirmationPage;
