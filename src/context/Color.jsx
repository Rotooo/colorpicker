import React, {useState} from 'react';
export const ColorContext = React.createContext({});

export default function GlobalColorProvider({children}){
    const [color, setColor] = useState('#ffffff');
    const [hiColor, sethiColor] = useState([]);
    return(
        <ColorContext.Provider value={{color, setColor, hiColor, sethiColor}}>
            {children}
        </ColorContext.Provider>
    )
}