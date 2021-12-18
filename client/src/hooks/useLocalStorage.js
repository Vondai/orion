import { useState } from "react";

const useLocalStorage = (key, initialValue) => {

    const [state, setState] = useState(() => {
        try {
            let item = localStorage.getItem(key);

            return item 
                ? JSON.parse(item) 
                : initialValue;
        } catch(error) {
            return initialValue;
        }
    });
    
    const setItem = (value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setState(value);
        } catch (e) {

        }
    };
    
    return [
        state,
        setItem
    ];
};

export default useLocalStorage;