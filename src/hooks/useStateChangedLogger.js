import { useEffect } from "react"

const useStateChangedLogger = (state) => {
    useEffect(() => {
        console.log(state)
    }, [state])
}

export default useStateChangedLogger