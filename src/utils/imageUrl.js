import GalleryImg from '../assets/icons/camera.png';
import constants from '../constants';

export const getImageURL = (path) => {
    console.log('path>>', path);
    if (path) {
        if (typeof path === 'string') {
            if (path.includes('http')) {
                return path;
            } else {
                return constants.baseUrl + path;
            }
        } else {
            return URL.createObjectURL(path);
        }
    } else {
        return;
    }
};

export const getDefaultImage = () => {
    return GalleryImg;
};
