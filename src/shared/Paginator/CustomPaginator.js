import React, { useState, useEffect } from 'react';
import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';

const CustomPaginator = ({ data, setPageNo }) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const onPageChange = (e) => {
        console.log(e);
        setPageNo(e.page);
        setFirst(e.first);
        setRows(e.rows);
    };

    useEffect(() => {
        if (data && data?.paginationAndSort?.totalPages) {
            setTotalRecords(Math.floor(data?.paginationAndSort?.totalPages * rows));
        }
    }, [data, rows]);

    console.log(totalRecords, data);

    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown ',
        PrevPageLink: (options) => {
            return (
                <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Prev</span>
                    <Ripple />
                </button>
            );
        },
        NextPageLink: (options) => {
            return (
                <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Next</span>
                    <Ripple />
                </button>
            );
        },
        PageLinks: (options) => {
            if (
                (options.view.startPage === options.page && options.view.startPage !== 0) ||
                (options.view.endPage === options.page && options.page + 1 !== options.totalPages)
            ) {
                const className = classNames(options.className, { 'p-disabled': true });

                return (
                    <span className={className} style={{ userSelect: 'none' }}>
                        ...
                    </span>
                );
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            );
        },
    };

    return (
        <div className="card">
            <Paginator template={template1} first={first} rows={rows} totalRecords={totalRecords} onPageChange={(e) => onPageChange(e)} pageLinkSize={4} />
        </div>
    );
};
export default CustomPaginator;
