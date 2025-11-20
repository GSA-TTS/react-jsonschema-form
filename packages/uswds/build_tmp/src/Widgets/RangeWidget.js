import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { rangeSpec } from '@rjsf/utils';
// Correctly import RangeInput from the library
import { RangeInput } from '@trussworks/react-uswds';
export default function RangeWidget(props) {
  const {
    id,
    value,
    disabled,
    readonly,
    onChange,
    onBlur,
    onFocus,
    options,
    schema,
    label, // Get label for potential aria-labelledby
    hideLabel, // Check if label is hidden
  } = props;
  // Use rangeSpec to parse step, min, max from schema and options
  const sliderProps = { ...rangeSpec(schema), ...options };
  const _onChange = ({ target: { value: eventValue } }) => {
    // RJSF expects numbers for range, convert empty string to undefined
    onChange(eventValue === '' ? options.emptyValue : parseFloat(eventValue));
  };
  const _onBlur = ({ target: { value: eventValue } }) => {
    onBlur(id, eventValue === '' ? options.emptyValue : parseFloat(eventValue));
  };
  const _onFocus = ({ target: { value: eventValue } }) => {
    onFocus(id, eventValue === '' ? options.emptyValue : parseFloat(eventValue));
  };
  // Determine aria-label or aria-labelledby for accessibility
  const ariaLabel = hideLabel && label ? label : undefined;
  const ariaLabelledBy = !hideLabel && label ? `${id}__title` : undefined; // Assuming FieldTemplate renders label with id `${id}__title`
  return _jsxs('div', {
    className: 'field-range-wrapper',
    children: [
      _jsx(RangeInput, {
        id: id,
        name: id,
        value: value !== null && value !== void 0 ? value : '',
        disabled: disabled || readonly,
        onChange: !readonly ? _onChange : undefined,
        onBlur: !readonly ? _onBlur : undefined,
        onFocus: !readonly ? _onFocus : undefined,
        min: sliderProps.min,
        max: sliderProps.max,
        step: sliderProps.step,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
      }),
      _jsx('span', { className: 'range-view-value', children: value }),
      ' ',
    ],
  });
}
//# sourceMappingURL=RangeWidget.js.map
