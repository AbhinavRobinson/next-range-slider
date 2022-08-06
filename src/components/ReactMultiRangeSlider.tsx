import { FC } from 'react';

export interface IReactMultiRangeSliderProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const ReactMultiRangeSlider: FC<IReactMultiRangeSliderProps> = (props) => {
    let { style, ...rest } = props;
    let _style = { ...style };

    /** OVERRIDE PROPS */

    return <input type="range" style={_style} {...rest} />;
};
