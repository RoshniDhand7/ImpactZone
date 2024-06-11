import React, { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/icons/Navlogo.png';
// import Profile from '../assets/icons/profilepic.png';
import { Avatar } from 'primereact/avatar';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { useEffect } from 'react';
import { logout } from '../services/auth';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../redux/actions/profileAction';
import { Tooltip } from 'primereact/tooltip';
import Search from './Search';
import { getMembers } from '../redux/actions/Dashboard/Members';

export default function TopBar() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const { user } = useSelector((state) => state?.profile);
    const history = useHistory();
    const location = useLocation();
    const menuRight = useRef(null);
    const active = {
        fontWeight: '600',
    };

    // const [member, setMember] = useState('');

    useEffect(() => {
        dispatch(getMembers());
    }, []);
    // let { allMembers } = useSelector((state) => state.members);

    // useEffect(() => {
    //     if (localStorage.getItem('member')) {
    //         setMember(localStorage.getItem('member'));
    //         console.log(localStorage.getItem('member'), 'ji');
    //     } else {
    //         setMember(allMembers?.[0]?._id);
    //     }
    // }, [allMembers, localStorage.getItem('member')]);

    // console.log('member>>', member, allMembers);

    const getNavbar = () => {
        const items = [
            {
                label: 'Dashboard',
                style: location.pathname.includes('/dashboard') ? active : '',
                command: () => history.push('/dashboard'),
            },
            {
                label: 'Check-In',
                style: location.pathname.includes('/check-in') ? active : '',
                command: () => history.push('/check-in'),
            },
            {
                label: 'Members',
                style: location.pathname.includes('/member') ? active : '',
                command: () => setOpenModal(true),
            },
            {
                label: 'Calendar',
                style: location.pathname.includes('/calender') ? active : '',
                command: () => history.replace('/calender'),
            },
            {
                label: 'Point of Sale',
                style: location.pathname.includes('/pos') ? active : '',
                command: () => history.replace('/pos'),
            },
            {
                label: 'Plans',
                style: location.pathname.includes('/plans') ? active : '',
                command: () => history.replace('/plans'),
            },
            {
                label: 'Report',
                items: [
                    {
                        label: 'Link1',
                    },
                    {
                        label: 'Link2',
                    },
                    {
                        label: 'Link3',
                    },
                ],
            },
            {
                label: 'More',
                style: location.pathname.includes('/more') ? active : '',
                command: () => history.replace('/more'),
            },
        ];
        return items;
    };

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getNavbar());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const logoDiv = (
        <div className="flex justify-content-center">
            <img alt="logo" src={logo} className="w-6 mr-2" />
        </div>
    );

    const [openModal, setOpenModal] = useState(false);

    let iconItems = [
        {
            icon: 'pi pi-search',
            command: () => setOpenModal(true),
        },
        {
            icon: 'pi pi-plus-circle ',
            command: () => history.push('/members/add'),
            template: (item, options) => (
                <div className="p-menuitem-link custom-tooltip-btn" onClick={item.command}>
                    <Tooltip target=".custom-tooltip-btn" content="Add Member" position="bottom" showDelay="400" />
                    <i className={item.icon}></i>
                </div>
            ),
        },
        {
            icon: 'pi pi-calendar-plus',
        },
        {
            icon: 'pi pi-clock',
            command: () => history.push('/dashboard'),
        },
        {
            icon: 'pi pi-cog',
            command: () => history.push('/settings'),
        },
        {
            icon: 'pi pi-question-circle',
            command: () => history.push('/dashboard'),
            items: [],
        },
    ];
    const getFirstCharacter = (name = '') => {
        let words = name.split(' ');
        let firstLetters = words.map((word) => word?.charAt(0).toUpperCase());
        firstLetters = firstLetters.slice(0, 2);
        return firstLetters;
    };
    const end = (
        <div className="flex justify-content-between">
            <Search openModal={openModal} setOpenModal={setOpenModal} />

            <Menubar style={{ border: 'none' }} model={iconItems} />
            <div className="flex cursor-pointer" onClick={(event) => menuRight.current.toggle(event)}>
                <Avatar
                    // image={Profile}
                    label={getFirstCharacter(user?.firstName)}
                    size="large"
                    shape="circle"
                />
                <div className="flex">
                    <div className="flex m-2">
                        <span className="font-semibold text-base  ">{user?.firstName || 'Loading...'}</span>
                        <i className="pi pi-angle-down mt-1 px-2" />
                    </div>
                </div>
            </div>
        </div>
    );

    let userItems = [
        {
            label: 'Profile Setting',
            command: () => history.push('/profile'),
        },
        {
            label: 'Switch User',
            command: () => history.push('/dashboard'),
        },
        {
            icon: 'pi pi-power-off',
            label: 'Logout',
            command: () => {
                logout(() => history.push('/'));
            },
        },
    ];
    return (
        <>
            <div className="top-bar">
                <Menubar model={items} start={logoDiv} end={end} />
                <Menu model={userItems} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
            </div>
        </>
    );
}
