import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSelectDrawerAction } from '../../../../redux/actions/POS/registerActions';
import { useEffect } from 'react';

export default function DrawerSelector() {
    const dispatch = useDispatch();
    const { drawer, registers } = useSelector((state) => state.pos);
    const registersDropdown = useMemo(
        () => registers.filter((item) => item?.registerStatus === 'OPEN').map((item) => ({ name: item.name, value: item._id })),
        [registers],
    );

    const handleChange = (e) => {
        dispatch(onSelectDrawerAction(e.target.value));
        localStorage.setItem('drawer', e.target.value);
    };

    useEffect(() => {
        if (registersDropdown.length) {
            let _drawer = localStorage.getItem('drawer');
            if (_drawer) {
                if (registersDropdown.find((item) => item.value === _drawer)) {
                    dispatch(onSelectDrawerAction(_drawer));
                } else {
                    dispatch(onSelectDrawerAction(''));
                }
            } else {
                dispatch(onSelectDrawerAction(''));
            }
        } else {
            dispatch(onSelectDrawerAction(''));
        }
    }, [registersDropdown, dispatch]);

    return (
        <select className="mx-2 drawer-select" onChange={handleChange} value={drawer}>
            <option value="">Select Drawer</option>
            {registersDropdown?.map((item) => (
                <option key={item?.value} value={item?.value}>
                    {item?.name}
                </option>
            ))}
        </select>
    );
}
