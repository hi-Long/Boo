import { useEffect, useState } from "react"

const useScroll = () => {
    const [y, setY] = useState()

    useEffect(() => {
        const onScroll = setY(window.pageYOffset)
        window.addEventListener("scroll", onScroll);
        console.log(y);

        return () => window.removeEventListener("scroll", onScroll);
    }, [y])

    return { pageYOffset: y }
}

export default useScroll