import GalleryImg from '../assets/icons/camera.png';
import constants from '../constants';

export const getImageURL = (path) => {
    if (path.includes('http')) {
        return path;
    } else {
        return constants.baseUrl + path;
    }
};

export const getDefaultImage = () => {
    return GalleryImg;
};
