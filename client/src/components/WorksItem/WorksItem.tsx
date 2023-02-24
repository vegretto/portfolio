import styles from "../Works/works.module.css";
import ImgWebp from "../ImgWebp/ImgWebp";
import {useRef} from "react";
import useVisibleHook from "../../hooks/useVisible.hook";
import classNames from "classnames/bind";

interface worksItemProps {
    item: {
        _id: number,
        type: string,
        link: string,
        imgSrc: string,
        name: string
    }
}

const WorksItem = ({item}: worksItemProps) => {
    const ref = useRef(null);
    const isOnScreen = useVisibleHook(ref);
    const cx = classNames.bind(styles);
    const itemClass = cx({
        item,
        'itemSm': item.type === 'sm',
        'itemLg': item.type === 'lg',
        'visible': isOnScreen
    });

    return (
        <a href={item.link} className={itemClass} key={item._id} ref={ref}>
            <div className={styles.imgBox}>
                <ImgWebp src={item.imgSrc} />
            </div>
            <div className={styles.content}>
                <div className={styles.name}>
                    {item.name}
                </div>
            </div>
        </a>
    )
}

export default WorksItem