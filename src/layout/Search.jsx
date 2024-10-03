import React, { useEffect, useState } from 'react';
import CustomDialog from '../shared/Overlays/CustomDialog';
import { AutoComplete } from 'primereact/autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../redux/actions/Dashboard/Members';
import { useHistory } from 'react-router-dom';

const Search = ({ openModal, setOpenModal }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    let { allMembers } = useSelector((state) => state.members);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const history = useHistory();

    allMembers = allMembers.map((item) => ({
        firstName: item.firstName,
        middleName: item.MI,
        lastName: item.lastName,
        id: item._id,
        path: `member/${item._id}`,
    }));

    const search = (event) => {
        let query = event.query;
        let _filteredItems = allMembers.filter((item) => {
            let _item = `${item.firstName} ${item.middleName} ${item.lastName}`.trim();
            let _query = query.trim().toLowerCase();
            return _item.toLowerCase().includes(_query);
        });
        setItems(_filteredItems);
        return _filteredItems;
    };

    useEffect(() => {
        if (value?.id) {
            history.push(`/member/${value?.id}/dashboard`);
            setValue('');
            localStorage.setItem('member', value.id);
            setOpenModal(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleOnChange = (e) => {
        const inputValue = e.value;
        const trimmedValue = typeof inputValue === 'string' ? inputValue.trimStart() : inputValue;
        setValue(trimmedValue);
    };

    return (
        <>
            <CustomDialog
                visible={openModal}
                onCancel={() => {
                    setOpenModal(false);
                    setValue('');
                }}
                position="top"
                width="50vw"
                contentclassname="pb-2"
            >
                <div>
                    <h3 className="text-bold mb-2">Search Member</h3>
                    <span className="p-input-icon-right w-full">
                        <AutoComplete
                            field="firstName"
                            value={value}
                            suggestions={items}
                            completeMethod={search}
                            onChange={handleOnChange}
                            className="w-full  "
                            inputClassName="w-full"
                            showEmptyMessage={true}
                            itemTemplate={(item) => <div>{`${item.firstName} ${item.middleName} ${item.lastName} `}</div>}
                        />
                        <i className="pi pi-search" />
                    </span>
                </div>
                <div
                    className="text-right mt-4 text-blue cursor-pointer font-normal text-xl"
                    onClick={() => {
                        history.push('/allMembers');
                        setOpenModal(false);
                    }}
                >
                    Find Member
                </div>
            </CustomDialog>
        </>
    );
};

export default Search;
