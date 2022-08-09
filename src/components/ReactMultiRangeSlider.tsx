import React, { CSSProperties } from 'react';
import './styles.css';

export type Themes = 'default' | 'dark';

export type RangeProps = {
  background?: string;
  border?: string;
};

export type ThumbProps = {
  background?: string;
  focusBackground?: string;
  width?: string;
  height?: string;
  transform?: string;
  borderRadius?: string;
  border?: string;
};

export type TrackProps = {
  background?: string;
  width?: string;
  height?: string;
  transform?: string;
  borderRadius?: string;
  border?: string;
  margin?: string;
  padding?: string;
};

export type ReactMultiRangeSliderOptions = {
  theme?: Themes;
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
    '--thw': '2rem',
    '--thh': '2rem',
    '--tht': 'translateY(-25%)',
    '--thbr': '1rem',
    '--thb': 'none',
    '--tt': 'none',
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
    '--thw': '2rem',
    '--thh': '2rem',
    '--tht': 'translateY(-25%)',
    '--thbr': '1rem',
    '--thb': 'none',
    '--tt': 'none',
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
    '--a': min,
    '--b': max,
    '--min': min,
    '--max': max
  };
}

function getTheme(theme: Themes, overrides?: Omit<ReactMultiRangeSliderOptions, 'leftInputProps' | 'rightInputProps'>) {
  return {
    '--thc': overrides?.thumb?.background ?? presets[theme]['--thc'],
    '--thfc': overrides?.thumb?.focusBackground ?? presets[theme]['--thfc'],
    '--tcol': overrides?.track?.background ?? presets[theme]['--tcol'],
    '--rcol': overrides?.range?.background ?? presets[theme]['--rcol'],
    '--rb': overrides?.range?.border ?? presets[theme]['--rb'],
    '--thw': overrides?.thumb?.width ?? presets[theme]['--thw'],
    '--thh': overrides?.thumb?.height ?? presets[theme]['--thh'],
    '--tht': overrides?.thumb?.transform ?? presets[theme]['--tht'],
    '--thbr': overrides?.thumb?.borderRadius ?? presets[theme]['--thbr'],
    '--thb': overrides?.thumb?.border ?? presets[theme]['--thb'],
    '--tt': overrides?.track?.transform ?? presets[theme]['--tt'],
    '--tw': overrides?.track?.width ?? presets[theme]['--tw'],
    '--th': overrides?.track?.height ?? presets[theme]['--th'],
    '--tm': overrides?.track?.margin ?? presets[theme]['--tm'],
    '--tp': overrides?.track?.padding ?? presets[theme]['--tp'],
    '--tb': overrides?.track?.border ?? presets[theme]['--tb'],
    '--tbr': overrides?.track?.borderRadius ?? presets[theme]['--tbr']
  };
}

export function ReactMultiRangeSlider(props: ReactMultiRangeSliderProps): JSX.Element {
  let { style, min, max, step, options, ...wrapperProps } = props;
  let { theme = 'default', leftInputProps, rightInputProps } = { ...options };

  /** SANITY CHECKS */
  if (min > max) return <div style={{ color: 'red', backgroundColor: 'white', fontWeight: 'bold' }}>Min &gt; Max, misconsfigured props</div>;
  if (step === undefined || step < 1) step = 1;

  /** OVERRIDE PROPS */
  let _leftInputProps: ReactInputProps = { ...leftInputProps },
    _rightInputProps: ReactInputProps = { ...rightInputProps };
  let _style = {
    ...style,
    ...getTheme(theme, options),
    ...minMaxTags(min, max)
  } as CSSProperties;

  return (
    <div className="wrap" role="group" style={_style} {...wrapperProps}>
      <input id="a" type="range" onInput={updateInputValues} {...{ max, min, step }} {..._leftInputProps} />
      <input id="b" type="range" onInput={updateInputValues} {...{ max, min, step }} {..._rightInputProps} />
    </div>
  );
}
