import React from 'react';
import { useSelector } from 'react-redux';

export default function Loader() {
    const isLoading = useSelector((state) => state.loader.isLoading);

    return (
        <div className="loader-overlay" style={{ display: isLoading ? 'flex' : 'none' }}>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '4rem' }}></i>
        </div>
    );
}
