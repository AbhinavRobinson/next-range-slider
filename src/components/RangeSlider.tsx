import type { CSSProperties, FormEvent, JSX } from 'react';
import type { RangeSliderOptions, RangeSliderProps, ReactInputProps, Themes } from './';

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
  }
};

function updateInputValues(e: FormEvent<HTMLInputElement>) {
  let _t = e.target as HTMLInputElement;
  _t.parentElement?.style.setProperty(`--${_t.id}`, _t.value);
}

function minMaxTags(min: number, max: number, lValue: number, rValue: number) {
  return {
    '--a': lValue,
    '--b': rValue,
    '--min': min,
    '--max': max
  };
}

function getTheme(theme: Themes, overrides?: Omit<RangeSliderOptions, 'leftInputProps' | 'rightInputProps'>) {
  if (!Object.keys(presets).includes(theme)) theme = 'default';
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

export function RangeSlider(props: RangeSliderProps): JSX.Element {
  let { style, min, max, step, options, ...wrapperProps } = props;
  let { theme = 'default', leftInputProps, rightInputProps } = { ...options };

  /** SANITY CHECKS */
  if (min > max) throw new Error('next-range-slider: min must be less than max in component props.');

  /** OVERRIDE PROPS */
  let _leftInputProps: ReactInputProps = { ...leftInputProps },
    _rightInputProps: ReactInputProps = { ...rightInputProps };
  let _style = {
    ...style,
    ...getTheme(theme, options),
    ...minMaxTags(min, max, Number(_leftInputProps.value ?? 0), Number(_rightInputProps.value ?? 0))
  } as CSSProperties;

  return (
    <div className="wrap" role="group" style={_style} {...wrapperProps}>
      <input id="a" type="range" onInput={updateInputValues} {...{ max, min, step }} {..._leftInputProps} />
      <input id="b" type="range" onInput={updateInputValues} {...{ max, min, step }} {..._rightInputProps} />
    </div>
  );
}
