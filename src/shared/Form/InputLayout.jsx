import React from 'react';
import { capitalizeCamelCase } from '../../utils/commonFunctions';

export default function InputLayout({ label, name, required, col, extraClassName, errorMessage, data, maxLength, children, showLabel = true }) {
    col = parseInt(col);
    if (col > 12) {
        col = 12;
    }

    return (
        <div className={`col-12  md:col-${col} ${extraClassName}`}>
            {showLabel && (
                <label htmlFor={name} className="text-sm font-semibold">
                    <div className="mb-1">
                        {label ? label : capitalizeCamelCase(name)}
                        {required ? <span className="text-red-500">*</span> : null}
                        {maxLength && (
                            <span>
                                &nbsp; ({data?.[name]?.length ?? 0}/{maxLength})
                            </span>
                        )}
                    </div>
                </label>
            )}
            {children}
            {errorMessage || data?.formErrors?.[name] ? (
                <small className="p-error" id="error-element">
                    {errorMessage || data?.formErrors?.[name]}
                </small>
            ) : null}
        </div>
    );
}
