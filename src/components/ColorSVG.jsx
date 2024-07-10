import React from 'react';

export const ColorSVG = ({color, width, height}) => {
  return (
    <div>
        <svg viewBox="0 0 1000 1000" width={width} height={height}>
            <defs>
                <clipPath id="_clipPath_eOddVOUb6xiQBbkngdjClAh9MTS8RpEM">
                    <rect width="1000" height="1000"/>
                </clipPath>
            </defs>
            <g clipPath="url(#_clipPath_eOddVOUb6xiQBbkngdjClAh9MTS8RpEM)">
                <path d=" M 500 31.166 C 500 31.166 174.245 425.909 174.245 643.079 C 174.245 823.076 320.002 968.834 500 968.834 C 679.998 968.834 825.755 823.076 825.755 643.079 C 825.755 425.909 500 31.166 500 31.166 Z  M 357.899 664.434 C 357.899 716.048 382.077 818.262 398.907 860.828 C 288.766 806.789 259.629 700.629 259.629 626.972 C 259.629 512.017 393.116 343.746 468.764 187.094 C 460.439 269.402 357.899 508.071 357.899 664.434 Z "
                fill={color}/>
            </g>
        </svg>
    </div>
  )
}
