import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Sidebar from './Sidebar';
import { CustomGridLayout } from '../shared/Cards/CustomCard';
import { useDispatch } from 'react-redux';
import { types } from '../redux/types/types';

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const dispatch = useDispatch();

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': !isSidebarOpen,
        'layout-static': isSidebarOpen,
        // 'layout-mobile-sidebar-active': mobileMenuActive,
    });

    useEffect(() => {
        if (!isDesktop()) {
            setIsSidebarOpen(false);
        }

        return () => {
            dispatch({ type: types.RESET_MEMBER_DATA });
        };
    }, []);

    // const toggleSidebar = () => {
    //     if (isDesktop()) {
    //         setIsSidebarOpen((prev) => !prev);
    //     } else {
    //         if (isSidebarOpen) {
    //             setIsSidebarOpen(false);
    //             setMobileMenuActive(false);
    //             addClass(document.body, 'body-overflow-hidden');
    //         } else {
    //             setIsSidebarOpen(true);
    //             setMobileMenuActive(true);
    //             removeClass(document.body, 'body-overflow-hidden');
    //         }
    //     }
    // };
    // const addClass = (element, className) => {
    //     if (element.classList) element.classList.add(className);
    //     else element.className += ' ' + className;
    // };
    // const removeClass = (element, className) => {
    //     if (element.classList) element.classList.remove(className);
    //     else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    // };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    return (
        <CustomGridLayout>
            <div className="col-2">
                <Sidebar />
            </div>
            <div className="col-10">{children}</div>
        </CustomGridLayout>
    );
}
