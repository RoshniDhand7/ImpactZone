import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/actions/Settings/InventorySetup/categoriesAction';

export default function Categories({ active, setActive }) {
    const { allCategory } = useSelector((state) => state.category);
    let categories = allCategory.filter((item) => item?.hasCatalog && item?.displayInPos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

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
                <div className={`py-2 px-3 sidebar-item ${active === 'PRE_PAY' && 'active'}`} onClick={() => setActive('PRE_PAY')}>
                    <i className="pi pi-money-bill mr-1"></i> Pre Pay
                </div>
            </div>
        </div>
    );
}
