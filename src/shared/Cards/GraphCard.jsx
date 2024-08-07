import React from 'react';

const Graphcard = ({ title, children, col = 'col-6' }) => {
    return (
        <div className={`lg:${col} md:${col} col-12`}>
            <div className={`graphcard p-2`}>
                <div className="mx-5 font-bold text-lg mt-3">{title}</div>
                <div id="chart">{children}</div>
            </div>
        </div>
    );
};

export default Graphcard;
