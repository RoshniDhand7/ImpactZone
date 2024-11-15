import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import CustomAnimatedCard from '../Transitions/CustomAnimatedCard';

export default function GridNavigation({ items, title, backable, backText = 'Go Back' }) {
    const history = useHistory();
    return (
        <div className="bg-color">
            {backable && (
                <div className="mb-2 flex cursor-pointer w-2" onClick={() => history.goBack()}>
                    <span className="pi pi-angle-left text-xl my-auto" />
                    <h3>{backText}</h3>
                </div>
            )}
            {title && <h3 className="mb-2">{title}</h3>}
            <div className="flex justify-content-center">
                <div className="p-3 border-round-xl btn-lightblue w-full">
                    <div className="grid col-12">
                        {items.map((box, i) => {
                            return (
                                <div key={i} className="lg:col-3 md:col-4 sm:col-6 col-12  p-3">
                                    <CustomAnimatedCard index={i}>
                                        <Link to={box.link}>
                                            <div className="bg-style bg-white cursor-pointer  border-round flex flex-column justify-content-center  align-items-center py-5 ">
                                                <div className="" style={{ width: '60px', height: '60px' }}>
                                                    <img src={box.img} alt="" />
                                                </div>

                                                <div className="mt-3 text-base">{box.title}</div>
                                            </div>
                                        </Link>
                                    </CustomAnimatedCard>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
