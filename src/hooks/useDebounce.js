import { useEffect, useRef } from "react"

const useDebounce = (value, callback, delay) => {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            console.log(value)
            const handler = setTimeout(() => {
                callback()
            }, delay)
            return () => {
                clearTimeout(handler)
            }
        }
    }, [value, callback, delay])
}

export default useDebounce
