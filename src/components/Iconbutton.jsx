import React from 'react';

export default function Iconbutton({text, icon, onclick}) {
  return (
    <div className="tooltip">
        <span className="tooltiptext">{text}</span>
        <button className='iconbutton' onClick={onclick}>
        <img src={icon} alt="New Icon"/>
        </button>
    </div>
  )
}
