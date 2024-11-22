import { Avatar } from 'primereact/avatar';

const CustomAvatar = ({ ...props }) => {
    const getFirstCharacter = (name = '') => {
        let words = name.split(' ');
        let firstLetters = words.map((word) => word?.charAt(0).toUpperCase());
        firstLetters = firstLetters.slice(0, 2);
        return firstLetters;
    };

    return (
        <Avatar {...props} label={props.label && getFirstCharacter(props.label)} size={props.size || 'large'} shape="circle">
            {props.children}
        </Avatar>
    );
};

export default CustomAvatar;
