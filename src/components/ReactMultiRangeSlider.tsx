import React, { CSSProperties } from 'react';
import './styles.css';

export interface IReactInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export interface IReactMultiRangeSliderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  theme?: 'default' | 'dark';
  min: number;
  max: number;
  step?: number;
  inputLProps?: IReactInputProps;
  inputRProps?: IReactInputProps;
}

const updateInputValues = (e: React.FormEvent<HTMLInputElement>) => {
  let _t: any = e.target; // don't know type of this, but it works. :P
  _t.parentNode.style.setProperty(`--${_t.id}`, +_t.value);
};

const minMaxTags = (min: number, max: number) => {
  return {
    '--a': min / 2,
    '--b': max / 2,
    '--min': min,
    '--max': max
  };
};

export const ReactMultiRangeSlider: React.FC<IReactMultiRangeSliderProps> = (props) => {
  let { style, theme, min, max, step, inputLProps, inputRProps, ...rest } = props;

  /** EXTRACT PROPS */
  let _inputLProps: IReactInputProps = { ...inputLProps },
    _inputRProps: IReactInputProps = { ...inputRProps };

  /** OVERRIDE PROPS */
  let _style: CSSProperties = {
    ...style,
    ...minMaxTags(min, max)
  } as CSSProperties;

  /** THEME STYLES */
  if (theme === 'dark') {
  }

  return (
    <div className="wrap" role="group" aria-labelledby="multi-lbl" style={_style} {...rest}>
      <input id="a" type="range" onInput={updateInputValues} {...{ max, min, step }} {..._inputLProps} />
      <input id="b" type="range" onInput={updateInputValues} {...{ max, min, step }} {..._inputRProps} />
    </div>
  );
};
