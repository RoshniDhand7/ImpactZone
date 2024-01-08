import Constants from '../services/endPoints';
import GalleryImg from '../assets/icons/camera.png';

export const getImageURL = (path) => {
    if (path.includes('http')) {
        return path;
    } else {
        return Constants.HOST + path;
    }
};

export const getDefaultImage = () => {
    return GalleryImg;
};
