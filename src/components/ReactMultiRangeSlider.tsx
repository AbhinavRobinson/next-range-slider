import React, { CSSProperties } from 'react';
import './styles.css';

export type ThumbProps = {
  background?: string;
  focusBackground?: string;
  diameter?: string;
  yOffset?: string;
  radius?: string;
  borderRadius?: string;
  border?: string;
};

export type TrackProps = {
  background?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  border?: string;
  margin?: string;
  padding?: string;
};

export type RangeProps = {
  background?: string;
  border?: string;
};

export type ReactMultiRangeSliderOptions = {
  theme?: 'default' | 'dark';
  thumb?: ThumbProps;
  track?: TrackProps;
  range?: RangeProps;
  leftInputProps?: ReactInputProps;
  rightInputProps?: ReactInputProps;
};

export type ReactInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type ReactMultiRangeSliderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  min: number;
  max: number;
  step?: number;
  options?: ReactMultiRangeSliderOptions;
};

const presets = {
  default: {
    '--thc': '#333',
    '--thfc': '#444',
    '--tcol': '#ccc',
    '--rcol': '#555',
    '--rb': 'none',
    '--thd': '2rem',
    '--thy': '-25%',
    '--thr': '1rem',
    '--thbr': '1rem',
    '--thb': 'none',
    '--tw': '100%',
    '--th': '1rem',
    '--tm': '1rem auto',
    '--tp': '0',
    '--tb': 'none',
    '--tbr': '1rem'
  },
  dark: {
    '--thc': '#eee',
    '--thfc': '#fff',
    '--tcol': '#333',
    '--rcol': '#888',
    '--rb': 'none',
    '--thd': '2rem',
    '--thy': '-25%',
    '--thr': '1rem',
    '--thbr': '1rem',
    '--thb': 'none',
    '--tw': '100%',
    '--th': '1rem',
    '--tm': '1rem auto',
    '--tp': '0',
    '--tb': 'none',
    '--tbr': '1rem'
  }
};

function updateInputValues(e: React.FormEvent<HTMLInputElement>) {
  let _t = e.target as HTMLInputElement;
  _t.parentElement?.style.setProperty(`--${_t.id}`, _t.value);
}

function minMaxTags(min: number, max: number) {
  return {
    '--a': min / 2,
    '--b': max / 2,
    '--min': min,
    '--max': max
  };
}

export function ReactMultiRangeSlider(props: ReactMultiRangeSliderProps): JSX.Element {
  let { style, min, max, step, options, ...wrapperProps } = props;
  let { theme = 'default', leftInputProps, rightInputProps } = { ...options };

  /** OVERRIDE PROPS */
  let _leftInputProps: ReactInputProps = { ...leftInputProps },
    _rightInputProps: ReactInputProps = { ...rightInputProps };
  let _style = {
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
}
