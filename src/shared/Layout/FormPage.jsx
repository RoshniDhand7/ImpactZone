import React from 'react';
import { useHistory } from 'react-router-dom';
import CustomTransition from '../Transitions/CustomTransition';

export default function FormPage({ children, backText, backTo = '/' }) {
    const history = useHistory();
    return (
        <CustomTransition>
            {backText ? (
                <div className="flex mb-3 text-dark-gray">
                    <i className="pi pi-angle-left text-2xl"></i>
                    <div className=" my-auto font-semibold text-lg cursor-pointer" onClick={() => history.replace(backTo)}>
                        Back to {backText}
                    </div>
                </div>
            ) : null}
            <>{children}</>
        </CustomTransition>
    );
}
