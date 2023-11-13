import React from 'react';

export const ProgressBar = ({size, color, title}) => {
  return (
    <div className="progress-bar">
      <label>{title}</label>
      <p className='progress-text'>{size}</p>
      <div className="progress">
        <hr className="barr" width={size} color={color} />
      </div>
    </div>
  );
};