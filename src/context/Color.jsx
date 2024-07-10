import React, {useState} from 'react';
export const ColorContext = React.createContext({});

export default function GlobalColorProvider({children}){
    const [color, setColor] = useState('#FFFFFF');
    const [imageURL, setImageURL] = useState('');
    const [hiColor, sethiColor] = useState([]);
    const [contrastValue, setContrastValue] = useState(100);
    const [brightness, setBrightness] = useState(100);
    const [opacity, setOpacity] = useState(100);
    const [saturate, setSaturate] = useState(100);
    const [grayscale, setGrayscale] = useState(0);
    const [invert, setInvert] = useState(0);
    const [hue, setHue] = useState(0);
    const [sepia, setSepia] = useState(0);
    return(
        <ColorContext.Provider 
            value={{
                color, setColor, 
                hiColor, sethiColor, 
                contrastValue, setContrastValue,
                grayscale, setGrayscale,
                brightness, setBrightness,
                invert, setInvert,
                opacity, setOpacity,
                saturate, setSaturate,
                hue, setHue,
                sepia, setSepia,
                imageURL, setImageURL
            }}>
            {children}
        </ColorContext.Provider>
    )
}