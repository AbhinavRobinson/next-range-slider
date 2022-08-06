import React, { CSSProperties } from 'react';

export interface IReactMultiRangeSliderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    theme?: 'default' | 'dark';
    min: number;
    max: number;
    step?: number;
    inputLProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    inputRProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

export const ReactMultiRangeSlider: React.FC<IReactMultiRangeSliderProps> = (props) => {
    let { style, theme, min, max, step, inputLProps, inputRProps, ...rest } = props;
    let _inputLProps = { ...inputLProps },
        _inputRProps = { ...inputRProps };

    /** OVERRIDE PROPS */
    let _style: CSSProperties = { ...style, display: 'grid', gridTemplateRows: `max-content 1em`, width: '100%', margin: '1em auto', position: 'relative' };
    _inputLProps.style = { ..._inputLProps.style, gridColumn: 1, gridRow: 2 };
    _inputRProps.style = { ..._inputRProps.style, gridColumn: 1, gridRow: 2 };

    /** THEME */
    if (theme === 'dark') {
    } else {
    }

    return (
        <div
            role="group"
            aria-labelledby="multi-lbl"
            style={_style}
            // style=
            {...rest}
        >
            <input id="a" type="range" min={min} value={min / 2} max={max} step={step} {..._inputLProps} />
            <input id="b" type="range" min={min} value={max / 2} max={max} step={step} {..._inputRProps} />
        </div>
    );
};
