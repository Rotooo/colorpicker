/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
import {useState} from 'react';
import { SketchPicker } from 'react-color';
import '../assets/styles/modules.css';

export default function ColorPicker() {
  const [color, setColor] = useState('#000000');
  const [image, setImage] = useState(null);

  const openEyeDropper = async () => {
    let eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    setColor(sRGBHex);
  };

  const handleFileInput = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(color);
  };

  return (
    <div className="wrapper">
      <div className="leftColumn">
        <div className='headingText'>Selecciona un color:</div>

        <div className='formSection'>
          <p>1. Selecciona una imagen</p>
          <input onChange={handleFileInput} type="file" accept='image' />
        </div>

        <div className='formSection'>
          <p>1. Pick color</p>
          <button className='openPickerButton' onClick={openEyeDropper}>
            Abrir lupa
          </button>
        </div>

        <div className='formSection'>
          <p>3. View selected</p>
          <button
            className="selectedColor"
            style={{ background: color }}
            onClick={handleCopyColor}
          >
            {color}
          </button>
        </div>

        <div className='formSection'>
          <SketchPicker
            color={color}
            width='200'
           />
        </div>
      </div>

      <div className="rightColumn">
        {image ? (
          <>
            <img src={image} alt="Working image" />
          </>
        ) : (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="4em"
            width="4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"></path>
            <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"></path>
          </svg>
        )}
      </div>
    </div>
  )
}
