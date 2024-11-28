import React from 'react';

export default function Sidebar({ active, setActive, categories }) {
    return (
        <div className="px-1 h-full">
            <div className="div-shadow mt-2 pb-2 h-full">
                <div className="text-xl font-semibold p-2">Categories</div>
                <div className={`py-2 px-3 sidebar-item ${!active && 'active'}`} onClick={() => setActive('')}>
                    <i className="pi pi-history mr-1"></i> Most Recent
                </div>
                {categories.map((item) => (
                    <div key={item?._id} className={`py-2 px-3 sidebar-item ${item?._id === active && 'active'}`} onClick={() => setActive(item?._id)}>
                        <i className="pi pi-th-large mr-1"></i> {item?.posButtonLabel || item?.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
