import type { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from 'react';

export type Themes = 'default';

export type RangeProps = {
  background?: string;
  border?: string;
};

export type ThumbProps = {
  background?: string;
  focusBackground?: string;
  width?: string;
  height?: string;
  /** defauts to translateY(-25%) in preset theme */
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

export type RangeSliderOptions = {
  theme?: Themes;
  thumb?: ThumbProps;
  track?: TrackProps;
  range?: RangeProps;
  leftInputProps?: ReactInputProps;
  rightInputProps?: ReactInputProps;
};

export type ReactInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type RangeSliderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  min: number;
  max: number;
  step?: number;
  options?: RangeSliderOptions;
};
