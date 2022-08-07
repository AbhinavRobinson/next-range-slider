import React, { CSSProperties } from 'react';
import './styles.css';

export interface IThumbProps {
  color?: string;
  focusColor?: string;
  diameter?: string;
  yOffset?: string;
  radius?: string;
  borderRadius?: string;
}

export interface ITrackProps {
  color?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

export interface IRangeProps {
  color?: string;
}

export interface IReactMultiRangeSliderOptions {
  theme?: 'default' | 'dark';
  thumb?: IThumbProps;
  track?: ITrackProps;
  range?: IRangeProps;
  leftInputProps?: IReactInputProps;
  rightInputProps?: IReactInputProps;
}

export interface IReactInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export interface IReactMultiRangeSliderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  min: number;
  max: number;
  step?: number;
  options?: IReactMultiRangeSliderOptions;
}

const updateInputValues = (e: React.FormEvent<HTMLInputElement>) => {
  let _t: HTMLInputElement = e.target as HTMLInputElement;
  _t.parentElement?.style.setProperty(`--${_t.id}`, _t.value);
};

const minMaxTags = (min: number, max: number) => {
  return {
    '--a': min / 2,
    '--b': max / 2,
    '--min': min,
    '--max': max
  };
};

const presets = {
  default: {
    '--thc': '#333',
    '--thfc': '#444',
    '--tcol': '#ccc',
    '--rcol': '#555',
    '--thd': '2rem',
    '--thyoff': '-25%',
    '--thr': '1rem',
    '--thbr': '1rem',
    '--tw': '100%',
    '--th': '1rem',
    '--tbr': '1rem'
  },
  dark: {
    '--thc': '#eee',
    '--thfc': '#fff',
    '--tcol': '#333',
    '--rcol': '#888',
    '--thd': '2rem',
    '--thyoff': '-25%',
    '--thr': '1rem',
    '--thbr': '1rem',
    '--tw': '100%',
    '--th': '1rem',
    '--tbr': '1rem'
  }
};

export const ReactMultiRangeSlider: React.FC<IReactMultiRangeSliderProps> = (props) => {
  let { style, min, max, step, options, ...wrapperProps } = props;
  let { theme = 'default', leftInputProps, rightInputProps } = { ...options };

  /** OVERRIDE PROPS */
  let _leftInputProps: IReactInputProps = { ...leftInputProps },
    _rightInputProps: IReactInputProps = { ...rightInputProps };
  let _style: CSSProperties = {
    ...style,
    ...presets[theme],
    ...minMaxTags(min, max)
  } as CSSProperties;

  return (
    <div className="wrap" role="group" aria-labelledby="multi-lbl" style={_style} {...wrapperProps}>
      <input id="a" type="range" onInput={updateInputValues} {...{ max, min, step }} {..._leftInputProps} />
      <input id="b" type="range" onInput={updateInputValues} {...{ max, min, step }} {..._rightInputProps} />
    </div>
  );
};
