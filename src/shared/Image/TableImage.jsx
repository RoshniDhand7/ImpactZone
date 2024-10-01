import React from 'react';
import { Image } from 'primereact/image';
import { getImageURL } from '../../utils/imageUrl';
import productPlaceholder from '../../assets/images/productPlaceholder.png';

export default function TableImage({ image }) {
    return (
        <Image
            src={image ? getImageURL(image) : productPlaceholder}
            onError={(e) => (e.target.src = productPlaceholder)}
            alt="Image"
            preview
            width="10"
            height="10"
            className="img-width"
        />
    );
}
