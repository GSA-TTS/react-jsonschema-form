import { jsx as _jsx } from 'react/jsx-runtime';
import { RangeInput as UswdsRange } from '@trussworks/react-uswds';
export default function RangeInput(props) {
  const { id, value, min, max, step, disabled, readonly, onChange } = props;
  return _jsx(UswdsRange, {
    id: id,
    name: id,
    value: value,
    min: min,
    max: max,
    step: step,
    disabled: disabled || readonly,
    onChange: onChange,
  });
}
//# sourceMappingURL=RangeInputTemplate.js.map
