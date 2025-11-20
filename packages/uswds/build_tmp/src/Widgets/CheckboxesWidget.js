import { jsx as _jsx } from 'react/jsx-runtime';
import { Checkbox } from '@trussworks/react-uswds';
export default function CheckboxesWidget({
  id,
  disabled,
  options,
  value = [],
  readonly,
  onChange,
  onBlur,
  onFocus,
}) {
  const { enumOptions = [], enumDisabled, inline } = options;
  function _onChange(index) {
    return function handleChange(event) {
      const { checked } = event.target;
      const all = (enumOptions || []).map((option) => option.value);
      if (checked) {
        onChange([...value, all[index]]);
      } else {
        onChange(value.filter((v) => v !== all[index]));
      }
    };
  }
  function _onBlur(event) {
    onBlur(id, event.target.value);
  }
  function _onFocus(event) {
    onFocus(id, event.target.value);
  }
  return _jsx('div', {
    className: `usa-checkbox-group ${inline ? 'display-flex flex-wrap' : ''}`,
    id: id,
    children: enumOptions.map((option, index) => {
      const checked = value.includes(option.value);
      const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.includes(option.value);
      const checkboxId = `${id}_${index}`;
      return _jsx(
        Checkbox,
        {
          id: checkboxId,
          name: `${id}[]`,
          label: option.label,
          checked: checked,
          disabled: disabled || itemDisabled || readonly,
          onChange: !readonly ? _onChange(index) : undefined,
          onBlur: !readonly ? _onBlur : undefined,
          onFocus: !readonly ? _onFocus : undefined,
          className: inline ? 'margin-right-2 margin-bottom-1' : '',
        },
        index,
      );
    }),
  });
}
//# sourceMappingURL=CheckboxesWidget.js.map
