import React from 'react';
import { capitalizeCamelCase } from '../../utils/commonFunctions';

export default function InputLayout({ label, name, required, col, extraClassName, errorMessage, data, maxLength, children }) {
    col = parseInt(col);
    if (col > 12) {
        col = 12;
    }
    return (
        <div className={`my-1 col-12  md:col-${col} ${extraClassName}`}>
            <label htmlFor={name} className="text-sm font-semibold">
                <div>
                    {label ? capitalizeCamelCase(label) : label}
                    {required ? <span className="text-red-500">*</span> : null}
                </div>
            </label>
            {maxLength && (
                <div className="">
                    {data?.[name].length}/{maxLength}
                </div>
            )}

            {/* <span style={{ width: '100%', display: 'inline-block' }} className={'p-input-icon-right'}> */}
            {children}
            {/* </span> */}
            {errorMessage || data?.formErrors?.[name] ? <small className="p-error">{errorMessage || data?.formErrors?.[name]}</small> : null}
        </div>
    );
}
