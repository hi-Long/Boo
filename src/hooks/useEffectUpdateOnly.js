import { useEffect, useRef } from "react";

const useEffectUpdateOnly = (callback, dependencies) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            callback();
        } else {
            didMount.current = true;
        }
    }, [callback, dependencies]);
};

export default useEffectUpdateOnly