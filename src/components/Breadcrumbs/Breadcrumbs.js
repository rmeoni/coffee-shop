import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <nav aria-label="breadcrumb" className="breadcrumbs">
            <ul>
                {isLoading
                    ? // Skeleton placeholders for loading state
                    Array.from({ length: 3 }).map((_, index) => (
                        <li key={index} id="skeleton">
                            <Skeleton width={80} className="small" />
                        </li>
                    ))
                    : // Render breadcrumbs when items are available
                    items.map((item, index) => (
                        <li key={index} className={index === items.length - 1 ? 'active-crumb' : ''}>
                            {index === items.length - 1 ? (
                                <p className="small">{item.name}</p> // Active item, no link
                            ) : (
                                <a href={item.link} className="small">
                                    {item.name}
                                </a> // Link for other items
                            )}
                        </li>
                    ))}
            </ul>
        </nav>
    );
};

Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired, // Name of the breadcrumb
            link: PropTypes.string, // URL link, optional for the last item
        })
    ).isRequired,
};

export default Breadcrumbs;
