import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Select as UswdsSelect } from '@trussworks/react-uswds';
export default function SelectTemplate(props) {
  // Renamed to SelectTemplate
  const {
    schema,
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    multiple = false,
    autofocus = false,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    // rawErrors = [], // Not typically used directly in select widget
  } = props;
  const { enumOptions, enumDisabled, emptyValue } = options;
  const _onChange = (event) => {
    // Get event object
    const { target } = event; // Destructure target from event
    // Handle multiple select
    if (multiple) {
      // Use target here
      const selectedValues = Array.from(target.selectedOptions).map((option) => option.value); // Added type annotation
      onChange(selectedValues);
    } else {
      onChange(target.value === '' ? emptyValue || '' : target.value);
    }
  };
  const _onBlur = ({ target: { value: targetValue } }) =>
    onBlur(id, targetValue === '' ? emptyValue || '' : targetValue);
  const _onFocus = ({ target: { value: targetValue } }) =>
    onFocus(id, targetValue === '' ? emptyValue || '' : targetValue);
  // Ensure value is correctly formatted for multiple select
  const selectValue =
    multiple && !Array.isArray(value)
      ? value !== undefined && value !== null
        ? [String(value)]
        : []
      : value;
  return _jsxs(UswdsSelect, {
    id: id,
    name: id,
    value: selectValue !== null && selectValue !== void 0 ? selectValue : multiple ? [] : '',
    required: required,
    multiple: multiple,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    onBlur: !readonly ? _onBlur : undefined,
    onFocus: !readonly ? _onFocus : undefined,
    onChange: !readonly ? _onChange : undefined,
    children: [
      !multiple &&
        schema.default === undefined &&
        placeholder &&
        _jsx('option', { value: '', children: placeholder }),
      enumOptions.map(({ value: optionValue, label: optionLabel }, i) => {
        const disabledOpt = enumDisabled && enumDisabled.includes(optionValue);
        return _jsx(
          'option',
          { value: optionValue, disabled: disabledOpt, children: optionLabel },
          i,
        );
      }),
    ],
  });
}
//# sourceMappingURL=SelectTemplate.js.map
