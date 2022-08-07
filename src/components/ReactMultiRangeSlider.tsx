import React, { CSSProperties } from 'react';

export interface IInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export interface IReactMultiRangeSliderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  theme?: 'default' | 'dark';
  min: number;
  max: number;
  step?: number;
  inputLProps?: IInputProps;
  inputRProps?: IInputProps;
}

const wrapperStyles: CSSProperties = {
  display: 'grid',
  gridTemplateRows: `max-content 1em`,
  width: '100%',
  margin: '1em auto',
  position: 'relative',
  background: 'white'
};
const darkWrapperStyles: CSSProperties = {};

const inputStyles: CSSProperties = {
  gridColumn: 1,
  gridRow: 2,
  background: 'none',
  color: '#000',
  font: 'inherit',
  margin: 0,
  pointerEvents: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none'
};
const darkInputStyles: CSSProperties = {};

export const ReactMultiRangeSlider: React.FC<IReactMultiRangeSliderProps> = (props) => {
  let { style, theme, min, max, step, inputLProps, inputRProps, ...rest } = props;

  /** EXTRACT PROPS */
  let _inputLProps: IInputProps = { ...inputLProps },
    _inputRProps: IInputProps = { ...inputRProps };

  /** OVERRIDE PROPS */
  let _style: CSSProperties = { ...style, ...wrapperStyles };
  _inputLProps.style = { ..._inputLProps.style, ...inputStyles };
  _inputRProps.style = { ..._inputRProps.style, ...inputStyles };

  /** THEME STYLES */
  if (theme === 'dark') {
    _style = { ..._style, ...darkWrapperStyles };
    _inputLProps.style = { ..._inputLProps.style, ...darkInputStyles };
    _inputRProps.style = { ..._inputRProps.style, ...darkInputStyles };
  }

  return (
    <div role="group" aria-labelledby="range-selector" style={_style} {...rest}>
      <input id="l" type="range" {...{ max, min, step }} {..._inputLProps} />
      <input id="r" type="range" {...{ max, min, step }} {..._inputRProps} />
    </div>
  );
};
