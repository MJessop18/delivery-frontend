import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function useLocalStorage(key, firstValue = null){
    const initialValue = localStorage.getItem(key) || firstValue;
    const [item, setItem] = useState(initialValue);
    console.log('localstorage', localStorage.Storage)
    useEffect(
        function setKeyInLocalStorage(){
            if(item === null){
                localStorage.removeItem(key);
            }else{
                localStorage.setItem(key, item)
            }
        },
        [key, item]
    );
    return[item, setItem];
}

export default useLocalStorage;