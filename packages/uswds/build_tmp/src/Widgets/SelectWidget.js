import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { enumOptionsValueForIndex } from '@rjsf/utils';
import { Select as UswdsSelect } from '@trussworks/react-uswds';
export default function SelectWidget({
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  multiple,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  schema,
  emptyValue,
}) {
  const { enumOptions = [], enumDisabled } = options;
  function _onChange(event) {
    const { value: eventValue } = event.target;
    if (multiple) {
      const selectedValues = Array.from(event.target.selectedOptions).map((option) =>
        enumOptionsValueForIndex(option.value, enumOptions, emptyValue),
      );
      onChange(selectedValues);
    } else {
      onChange(enumOptionsValueForIndex(eventValue, enumOptions, emptyValue));
    }
  }
  function _onBlur(event) {
    onBlur(id, enumOptionsValueForIndex(event.target.value, enumOptions, emptyValue));
  }
  function _onFocus(event) {
    onFocus(id, enumOptionsValueForIndex(event.target.value, enumOptions, emptyValue));
  }
  const isDisabled = disabled || readonly;
  return _jsxs(UswdsSelect, {
    id: id,
    name: id,
    value: typeof value === 'undefined' ? '' : value,
    required: required,
    disabled: isDisabled,
    multiple: multiple,
    onChange: !isDisabled ? _onChange : undefined,
    onBlur: !isDisabled ? _onBlur : undefined,
    onFocus: !isDisabled ? _onFocus : undefined,
    children: [
      !multiple &&
        schema.default === undefined &&
        _jsx('option', { value: '', children: placeholder || 'Select an option' }),
      enumOptions.map(({ value: optionValue, label }, i) => {
        const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.includes(optionValue);
        return _jsx('option', { value: optionValue, disabled: itemDisabled, children: label }, i);
      }),
    ],
  });
}
//# sourceMappingURL=SelectWidget.js.map
