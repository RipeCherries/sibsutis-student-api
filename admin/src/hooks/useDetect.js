import {useEffect, useState} from "react";

export const useDetect = (ref, state) => {
    const [active, setActive] = useState(state);

    useEffect(() => {
        const onClick = () => {
            if (ref.current !== null) {
                setActive((prevState) => !prevState);
            }
        }

        if (active) {
            window.addEventListener("click", onClick);
        }

        return () => {
            window.removeEventListener("click", onClick);
        }
    }, [active, ref]);

    return [active, setActive];
}