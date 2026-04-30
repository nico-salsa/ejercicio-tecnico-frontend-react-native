import React from 'react';
import Svg, {Rect} from 'react-native-svg';

import {colors, sizing} from './tokens';

export function BankMark(): React.JSX.Element {
  return (
    <Svg
      accessibilityRole="image"
      height={sizing.headerMarkHeight}
      viewBox="0 0 15 12"
      width={sizing.headerMarkWidth}>
      <Rect
        fill="none"
        height={5}
        rx={0.8}
        stroke={colors.accent}
        strokeWidth={1.4}
        width={7}
        x={1}
        y={2.5}
      />
      <Rect
        fill="none"
        height={5}
        rx={0.8}
        stroke={colors.accent}
        strokeWidth={1.4}
        width={7}
        x={4}
        y={0.8}
      />
      <Rect fill={colors.accent} height={1.8} rx={0.25} width={2.6} x={3.2} y={4.1} />
    </Svg>
  );
}
