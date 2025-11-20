import { jsx as _jsx } from 'react/jsx-runtime';
import { enumOptionsValueForIndex } from '@rjsf/utils'; // Import helper
import { Radio as UswdsRadio } from '@trussworks/react-uswds';
export default function RadioWidget({
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  onChange,
  onBlur,
  onFocus,
}) {
  const { enumOptions = [], enumDisabled } = options;
  function _onChange(event) {
    onChange(enumOptionsValueForIndex(event.target.value, enumOptions));
  }
  function _onBlur(event) {
    onBlur(id, enumOptionsValueForIndex(event.target.value, enumOptions));
  }
  function _onFocus(event) {
    onFocus(id, enumOptionsValueForIndex(event.target.value, enumOptions));
  }
  // Determine if the whole widget is disabled or readonly
  const isDisabled = disabled || readonly;
  return _jsx('div', {
    className: 'usa-radio-group',
    id: id,
    children: enumOptions.map((option, i) => {
      // Check if this specific option is disabled
      const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.includes(option.value);
      const radioId = `${id}_${i}`;
      return _jsx(
        UswdsRadio,
        {
          id: radioId,
          name: id,
          value: option.value,
          checked: option.value === value,
          disabled: isDisabled || itemDisabled,
          label: option.label,
          required: required,
          onChange: !isDisabled ? _onChange : undefined,
          onBlur: !isDisabled ? _onBlur : undefined,
          onFocus: !isDisabled ? _onFocus : undefined,
        },
        i,
      );
    }),
  });
}
//# sourceMappingURL=RadioWidget.js.map
