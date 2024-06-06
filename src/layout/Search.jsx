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
    }, []);

    let { allMembers } = useSelector((state) => state.members);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const history = useHistory();

    allMembers = allMembers.map((item) => ({ name: item.firstName, id: item._id, path: `member/${item._id}` }));
    console.log(allMembers, 'allMembers');

    const search = (event) => {
        let query = event.query;
        let _filteredItems = [];
        for (let i = 0; i < allMembers.length; i++) {
            let item = allMembers[i];
            if (typeof item.name === 'string') {
                if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                    _filteredItems.push(item);
                }
            }
        }

        console.log(_filteredItems, 'filteredItems>>');
        setItems(_filteredItems);
        // setItems([...Array(10).keys()].map((item) => event.query + '-' + item));
    };

    useEffect(() => {
        if (value?.id) {
            history.push(`/member/${value?.id}`);
            setValue('');
            localStorage.setItem('member', value.id);
            setOpenModal(false);
        }
    }, [value]);

    console.log(value, items);
    return (
        <>
            <CustomDialog visible={openModal} onCancel={() => setOpenModal(false)} position="top" width="50vw" contentClassName="pb-2">
                <div>
                    <AutoComplete
                        field="name"
                        value={value}
                        suggestions={items}
                        completeMethod={search}
                        onChange={(e) => setValue(e.value)}
                        className="w-full  "
                        inputClassName="w-full"
                        // itemTemplate={() => {
                        //     <i className="pi pi-search" />;
                        // }}
                    />
                </div>
            </CustomDialog>
        </>
    );
};

export default Search;
