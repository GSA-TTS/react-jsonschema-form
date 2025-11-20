import { jsx as _jsx } from 'react/jsx-runtime';
import { enumOptionsValueForIndex } from '@rjsf/utils';
import { ComboBox as UswdsComboBox } from '@trussworks/react-uswds';
export default function ComboBoxWidget({
  id,
  options,
  value,
  disabled,
  readonly,
  onChange,
  onBlur,
  onFocus,
  placeholder,
}) {
  const { enumOptions = [], enumDisabled } = options;
  function _onChange(inputValue) {
    onChange(enumOptionsValueForIndex(inputValue || '', enumOptions));
  }
  const comboBoxOptions = (enumOptions || []).map((option) => ({
    value: String(option.value),
    label: option.label,
    disabled: Array.isArray(enumDisabled) && enumDisabled.includes(option.value),
  }));
  return _jsx(UswdsComboBox, {
    id: id,
    name: id,
    disabled: disabled || readonly,
    onChange: !readonly ? _onChange : () => {},
    // The underlying ComboBox component does not support onBlur or onFocus directly in the way RJSF expects.
    // If blur/focus handling is needed, it might require a custom implementation or wrapper.
    // onFocus={onFocus} // This prop is not supported by UswdsComboBox
    options: comboBoxOptions,
    defaultValue: String(value !== null && value !== void 0 ? value : ''),
  });
}
//# sourceMappingURL=ComboBoxWidget.js.map
