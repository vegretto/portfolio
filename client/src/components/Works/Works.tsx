import styles from './works.module.css';
import {useEffect, useState} from "react";
import WorksItem from "../WorksItem/WorksItem";
import InfiniteScroll from "react-infinite-scroll-component";
import useHttp from "../../hooks/useHttp.hook";


let sliceFrom = 0;
let sliceTo = 5;

const incSlice = () => {
    sliceFrom = sliceTo;
    sliceTo = sliceTo + 3;
}

const Works = () => {
    const [worksState, setWorksState] = useState([
        {
            _id: 0,
            type: 'sm',
            link: '#',
            imgSrc: '',
            name: ''
        },
    ]);
    const [worksChunk, setWorksChunk] = useState(worksState.slice(sliceFrom, sliceTo))
    const [hasMore, setHasMore] = useState(true);
    const {request} = useHttp()

    useEffect(() => {
        sliceFrom = 0;
        sliceTo = 5;
        setWorksChunk(worksState.slice(sliceFrom, sliceTo));
    }, [worksState])

    useEffect(() => {
        (async function () {
            try {
                const data = await request('/api/works/get-works')
                setWorksState(data)
            } catch (e) {
                console.log(e)
            }
        })()

    }, [request])

    const fetchScrollData = () => {
        incSlice();
        if (sliceFrom <= worksState.length) {
            setWorksChunk(prevState => {
                const newChunk = worksState.slice(sliceFrom, sliceTo);
                return (
                    [...prevState, ...newChunk]
                )
            })
        } else {
            setHasMore(false);
        }
    }

    return (
        <section id='works' className={styles.section}>
            <div className={styles.container}>
                <h2 className='h2'>Работы</h2>

                <InfiniteScroll
                    dataLength={worksChunk.length}
                    next={fetchScrollData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <div className={styles.boxesWrapper}>
                        {worksChunk.map(item => <WorksItem item={item} key={item._id}/>)}
                    </div>
                </InfiniteScroll>

            </div>
        </section>
    );
}

export default Works;