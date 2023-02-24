import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useEffect, useState} from "react";

interface ImgWebpProps {
    src: string,
    alt?: string
}

const ImgWebp = ({src, alt=''}:ImgWebpProps) => {
    const [img, setImg] = useState('null');
    useEffect(() => {
        try {
            setImg(require(`./../../assets/images/${src}.webp`))
        } catch (e) {
            setImg(require(`./../../assets/images/default.webp`))
        }
    }, [])

    return (
        <LazyLoadImage
            alt={alt}
            src={img}
            // placeholderSrc={require(`./../../assets/images/${src}-ph.webp`)}
            effect="blur"
        />
    );
}

export default ImgWebp;