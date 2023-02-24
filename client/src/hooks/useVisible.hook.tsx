import {RefObject, useEffect, useMemo, useRef, useState} from "react";


const useVisibleHook = (ref: RefObject<HTMLElement>) => {

    const [isIntersecting, setIntersecting] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null);

    useMemo(() => {
        observerRef.current = new IntersectionObserver(([entry], observer) => {
                setIntersecting(entry.isIntersecting)
                if (entry.isIntersecting) {
                    observer.disconnect();
                }
            }
        );
    }, []);

    useEffect(() => {
        if (observerRef.current && ref.current) {
            observerRef.current.observe(ref.current)
        }
        return () => {observerRef.current && observerRef.current.disconnect() }
    }, [ref])

    return isIntersecting
}

export default useVisibleHook