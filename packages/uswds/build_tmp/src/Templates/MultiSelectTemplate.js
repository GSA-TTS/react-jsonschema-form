import { jsx as _jsx } from 'react/jsx-runtime';
import { Select as UswdsSelect } from '@trussworks/react-uswds';
// Assuming this is intended to be a Widget, using WidgetProps
export default function MultiSelectTemplate(props) {
  const {
    schema,
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus = false,
    onChange,
    onBlur,
    onFocus,
    // placeholder, // Placeholder typically not used for multi-select
    // rawErrors = [],
  } = props;
  const { enumOptions, enumDisabled, emptyValue } = options;
  const _onChange = (event) => {
    const { target } = event;
    const selectedValues = Array.from(target.selectedOptions).map((option) => option.value);
    // RJSF expects array for multi-select
    onChange(selectedValues);
  };
  const _onBlur = ({ target }) => {
    const selectedValues = Array.from(target.selectedOptions).map((option) => option.value);
    onBlur(id, selectedValues);
  };
  const _onFocus = ({ target }) => {
    const selectedValues = Array.from(target.selectedOptions).map((option) => option.value);
    onFocus(id, selectedValues);
  };
  // Ensure value is an array
  const selectValue = Array.isArray(value)
    ? value
    : value !== undefined && value !== null
    ? [String(value)]
    : [];
  return _jsx(UswdsSelect, {
    id: id,
    name: id,
    value: selectValue,
    required: required,
    multiple: true,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    onBlur: !readonly ? _onBlur : undefined,
    onFocus: !readonly ? _onFocus : undefined,
    onChange: !readonly ? _onChange : undefined,
    children: enumOptions.map(({ value: optionValue, label: optionLabel }, i) => {
      const disabledOpt = enumDisabled && enumDisabled.includes(optionValue);
      return _jsx(
        'option',
        { value: optionValue, disabled: disabledOpt, children: optionLabel },
        i,
      );
    }),
  });
}
//# sourceMappingURL=MultiSelectTemplate.js.map
