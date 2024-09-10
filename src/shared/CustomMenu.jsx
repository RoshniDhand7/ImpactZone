import React from 'react';
import { Menu } from 'primereact/menu';

export const CustomMenu = React.forwardRef(({ items, refid, col }, ref) => {
    return (
        <div className={`col-6 md:col-${col}`}>
            <div className={` flex justify-content-center `}>
                <Menu model={items} popup ref={ref} id={refid} />
            </div>
        </div>
    );
});
